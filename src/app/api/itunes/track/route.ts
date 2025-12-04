import { NextRequest, NextResponse } from "next/server";

interface iTunesTrack {
  trackId: number;
  trackName: string;
  artistName: string;
  collectionName: string;
  artworkUrl100: string;
  previewUrl: string;
  trackViewUrl: string;
}

interface iTunesResponse {
  resultCount: number;
  results: iTunesTrack[];
}

interface TrackResponse {
  id: number;
  name: string;
  artist: string;
  album: string;
  artwork: string;
  preview_url: string;
  itunes_url: string;
}

async function lookupTrack(trackId: string): Promise<iTunesTrack | null> {
  const response = await fetch(
    `https://itunes.apple.com/lookup?id=${trackId}&entity=song`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch from iTunes");
  }

  const data: iTunesResponse = await response.json();
  
  if (data.resultCount === 0 || !data.results[0]) {
    return null;
  }

  return data.results[0];
}

async function searchTrack(query: string): Promise<iTunesTrack | null> {
  const response = await fetch(
    `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=musicTrack&limit=1`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch from iTunes");
  }

  const data: iTunesResponse = await response.json();
  
  if (data.resultCount === 0 || !data.results[0]) {
    return null;
  }

  return data.results[0];
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const trackId = searchParams.get("id");
    const searchQuery = searchParams.get("search");

    if (!trackId && !searchQuery) {
      return NextResponse.json(
        { error: "Track ID or search query is required" },
        { status: 400 }
      );
    }

    let track: iTunesTrack | null = null;

    if (trackId) {
      track = await lookupTrack(trackId);
    } else if (searchQuery) {
      track = await searchTrack(searchQuery);
    }

    if (!track) {
      return NextResponse.json(
        { error: "Track not found" },
        { status: 404 }
      );
    }

    // Get higher resolution artwork (replace 100x100 with 600x600)
    const highResArtwork = track.artworkUrl100.replace("100x100", "600x600");

    const response: TrackResponse = {
      id: track.trackId,
      name: track.trackName,
      artist: track.artistName,
      album: track.collectionName,
      artwork: highResArtwork,
      preview_url: track.previewUrl,
      itunes_url: track.trackViewUrl,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("iTunes API error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch track" },
      { status: 500 }
    );
  }
}

