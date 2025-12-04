import { NextRequest, NextResponse } from "next/server";

interface SpotifyTrack {
  id: string;
  name: string;
  artists: Array<{ name: string }>;
  preview_url: string | null;
}

interface SpotifyTrackResponse {
  name: string;
  artists: string;
  preview_url: string | null;
}

async function getAccessToken(): Promise<string> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Spotify credentials not configured");
  }

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
    },
    body: "grant_type=client_credentials",
  });

  if (!response.ok) {
    throw new Error("Failed to get access token");
  }

  const data = await response.json();
  return data.access_token;
}

async function getTrack(trackId: string, accessToken: string): Promise<SpotifyTrack> {
  const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Track not found");
    }
    throw new Error("Failed to fetch track");
  }

  return response.json();
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const trackId = searchParams.get("id");

    if (!trackId) {
      return NextResponse.json(
        { error: "Track ID is required" },
        { status: 400 }
      );
    }

    const accessToken = await getAccessToken();
    const track = await getTrack(trackId, accessToken);

    const response: SpotifyTrackResponse = {
      name: track.name,
      artists: track.artists.map((artist) => artist.name).join(", "),
      preview_url: track.preview_url,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Spotify API error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch track" },
      { status: 500 }
    );
  }
}


