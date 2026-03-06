import { NextResponse } from "next/server";

async function getAccessToken(): Promise<string> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Spotify credentials not configured");
  }

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to refresh access token");
  }

  const data = await response.json();
  return data.access_token;
}

export async function GET() {
  try {
    const accessToken = await getAccessToken();

    // Get top track from short_term (last ~4 weeks)
    const topTracksRes = await fetch(
      "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=1",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        next: { revalidate: 3600 }, // cache for 1 hour
      }
    );

    if (!topTracksRes.ok) {
      throw new Error("Failed to fetch top tracks");
    }

    const topTracks = await topTracksRes.json();

    if (!topTracks.items || topTracks.items.length === 0) {
      throw new Error("No top tracks found");
    }

    const track = topTracks.items[0];
    const trackName = track.name;
    const artistName = track.artists.map((a: { name: string }) => a.name).join(", ");
    const searchQuery = `${trackName} ${artistName}`;

    // Search iTunes for this track
    const itunesRes = await fetch(
      `https://itunes.apple.com/search?term=${encodeURIComponent(searchQuery)}&entity=musicTrack&limit=1`
    );

    if (!itunesRes.ok) {
      throw new Error("Failed to search iTunes");
    }

    const itunesData = await itunesRes.json();

    if (itunesData.resultCount === 0 || !itunesData.results[0]) {
      // Fallback: return Spotify data without iTunes match
      return NextResponse.json({
        name: trackName,
        artist: artistName,
        album: track.album.name,
        artwork: track.album.images[0]?.url || "",
        preview_url: track.preview_url,
        itunes_url: null,
        source: "spotify",
      });
    }

    const itunesTrack = itunesData.results[0];
    const highResArtwork = itunesTrack.artworkUrl100.replace("100x100", "600x600");

    return NextResponse.json({
      id: itunesTrack.trackId,
      name: itunesTrack.trackName,
      artist: itunesTrack.artistName,
      album: itunesTrack.collectionName,
      artwork: highResArtwork,
      preview_url: itunesTrack.previewUrl,
      itunes_url: itunesTrack.trackViewUrl,
      source: "spotify-top",
    });
  } catch (error) {
    console.error("Top track API error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch top track" },
      { status: 500 }
    );
  }
}
