"use client";

import { motion } from "motion/react";
import { Play, Pause } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface MusicCardProps {
  trackId?: string;
  search?: string;
}

interface TrackData {
  id: number;
  name: string;
  artist: string;
  album: string;
  artwork: string;
  preview_url: string;
  itunes_url: string;
}

const MusicCard = ({ trackId, search }: MusicCardProps) => {
  const [trackData, setTrackData] = useState<TrackData | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        let url = "/api/itunes/track?";
        if (trackId) {
          url += `id=${trackId}`;
        } else if (search) {
          url += `search=${encodeURIComponent(search)}`;
        } else {
          throw new Error("Track ID or search query required");
        }

        const response = await fetch(url);
        
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Failed to fetch track");
        }
        
        const data = await response.json();
        setTrackData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load track");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrack();
  }, [trackId, search]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleError = () => {
      setIsPlaying(false);
    };

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("error", handleError);
    };
  }, [trackData]);

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio || !trackData?.preview_url) {
      if (trackData?.itunes_url) {
        window.open(trackData.itunes_url, "_blank");
      }
      return;
    }

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((err) => {
        console.error("Playback error:", err);
      });
    }
  };

  if (isLoading) {
    return (
      <div className="mb-8">
        <div className="flex flex-row items-center gap-4">
          <div className="w-16 h-16 rounded-md bg-muted/20 animate-pulse" />
          <div className="flex-1">
            <div className="h-5 w-32 bg-muted/20 rounded animate-pulse mb-2" />
            <div className="h-4 w-24 bg-muted/20 rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !trackData) {
    return (
      <div className="mb-8 p-4 rounded-md">
        <p className="text-muted">{error || "Failed to load track"}</p>
      </div>
    );
  }

  return (
    <div className="group/music mb-8">
      <div className="flex flex-row items-center gap-4 relative pb-1 transition-all">
        {/* Album Art with Play Button Overlay */}
        <div className="relative flex-shrink-0">
          <div className="w-16 h-16 rounded-md overflow-hidden">
            <img
              src={trackData.artwork}
              alt={trackData.album}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Play/Pause Button Overlay */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            onClick={togglePlayback}
            className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover/music:opacity-100 transition-opacity rounded-md"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause size={24} className="text-white" />
            ) : (
              <Play size={24} className="text-white ml-1" />
            )}
          </motion.button>
        </div>

        {/* Track Info */}
        <div className="flex-1 min-w-0">
          <p className="text-lg text-foreground font-medium truncate">
            {trackData.name}
          </p>
          <p className="text-muted truncate">{trackData.artist}</p>
        </div>

        {/* Mobile Play Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          onClick={togglePlayback}
          className="md:hidden flex-shrink-0 w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause size={18} />
          ) : (
            <Play size={18} className="ml-0.5" />
          )}
        </motion.button>

        {/* Hidden audio element */}
        {trackData.preview_url && (
          <audio
            ref={audioRef}
            src={trackData.preview_url}
            preload="none"
          />
        )}
      </div>
    </div>
  );
};

export default MusicCard;

