"use client";

import { motion, useMotionValue, useTransform } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PauseIcon, PlayIcon, SpotifyIcon } from "./ui/svg-icons";

interface MusicCardProps {
  trackId?: string;
  search?: string;
  spotifyTopTrack?: boolean;
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

const formatTime = (seconds: number): string => {
  if (isNaN(seconds) || !isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const MusicCard = ({ trackId, search, spotifyTopTrack }: MusicCardProps) => {
  const [trackData, setTrackData] = useState<TrackData | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progressWidth, setProgressWidth] = useState("0%");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const progressContainerRef = useRef<HTMLDivElement | null>(null);
  const isScrubbingRef = useRef(false);
  const wasPlayingBeforeScrubRef = useRef(false);
  const scale = useMotionValue(1);
  const progressHeight = useTransform(scale, [1, 1.2], [2, 4]);
  const progressScale = useTransform(scale, [1, 1.2], [1, 1]);

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        setIsLoading(true);
        setError(null);

        let url: string;
        if (spotifyTopTrack) {
          url = "/api/spotify/top-track";
        } else if (trackId) {
          url = `/api/itunes/track?id=${trackId}`;
        } else if (search) {
          url = `/api/itunes/track?search=${encodeURIComponent(search)}`;
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
  }, [trackId, search, spotifyTopTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Reset progress when track changes
    setCurrentTime(0);
    setDuration(0);
    setProgressWidth("0%");

    const updateProgress = () => {
      const audio = audioRef.current;
      const progressBar = progressBarRef.current;

      if (!audio || !progressBar) return;

      // Don't update if scrubbing (user is controlling it)
      if (isScrubbingRef.current) {
        animationFrameRef.current = requestAnimationFrame(updateProgress);
        return;
      }

      if (!audio.paused && !audio.ended) {
        const current = audio.currentTime;
        const dur = audio.duration;

        // Update state for time display (throttled)
        setCurrentTime(current);

        // Directly update progress bar width for smooth 60fps animation
        if (dur > 0 && !isNaN(dur) && isFinite(dur)) {
          const percentage = (current / dur) * 100;
          const widthStr = `${percentage}%`;
          progressBar.style.width = widthStr;
          setProgressWidth(widthStr);
        }

        animationFrameRef.current = requestAnimationFrame(updateProgress);
      }
    };

    const stopAnimation = () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      setProgressWidth("0%");
      if (progressBarRef.current) {
        progressBarRef.current.style.width = "0%";
      }
      stopAnimation();
    };

    const handlePlay = () => {
      setIsPlaying(true);
      updateProgress();
    };

    const handlePause = () => {
      setIsPlaying(false);
      stopAnimation();
      // Sync progress bar to current position when paused (unless scrubbing)
      if (
        progressBarRef.current &&
        !isScrubbingRef.current &&
        audio.duration > 0
      ) {
        const percentage = (audio.currentTime / audio.duration) * 100;
        const widthStr = `${percentage}%`;
        progressBarRef.current.style.width = widthStr;
        setProgressWidth(widthStr);
      }
    };

    const handleError = () => {
      setIsPlaying(false);
      stopAnimation();
    };

    const handleLoadedMetadata = () => {
      const dur = audio.duration;
      setDuration(dur);
      // Only reset progress bar if at start and not scrubbing
      if (
        progressBarRef.current &&
        audio.currentTime === 0 &&
        !isScrubbingRef.current
      ) {
        setProgressWidth("0%");
        progressBarRef.current.style.width = "0%";
      }
    };

    const handleCanPlay = () => {
      // Fallback to ensure duration is set
      if (
        audio.duration &&
        !isNaN(audio.duration) &&
        isFinite(audio.duration)
      ) {
        setDuration(audio.duration);
        // Only reset if at start and not scrubbing
        if (
          progressBarRef.current &&
          audio.currentTime === 0 &&
          !isScrubbingRef.current
        ) {
          setProgressWidth("0%");
          progressBarRef.current.style.width = "0%";
        }
      }
    };

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("error", handleError);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("canplay", handleCanPlay);

    // Load metadata when audio element is ready
    if (audio.readyState >= 1) {
      // Metadata already loaded
      if (
        audio.duration &&
        !isNaN(audio.duration) &&
        isFinite(audio.duration)
      ) {
        setDuration(audio.duration);
      }
    }

    return () => {
      stopAnimation();
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("canplay", handleCanPlay);
    };
  }, [trackData]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    const container = progressContainerRef.current;

    if (!audio || !container || !trackData?.preview_url || duration === 0)
      return;

    if (e.buttons > 0 || isScrubbingRef.current) {
      const { left, width } = container.getBoundingClientRect();
      const clickX = e.clientX - left;
      const percentage = Math.max(0, Math.min(100, (clickX / width) * 100));
      const newTime = (percentage / 100) * duration;
      const widthStr = `${percentage}%`;

      // Update audio position
      audio.currentTime = newTime;

      // Update visual progress
      setCurrentTime(newTime);
      setProgressWidth(widthStr);
      if (progressBarRef.current) {
        progressBarRef.current.style.width = widthStr;
      }
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    const container = progressContainerRef.current;
    if (!audio || !container || !trackData?.preview_url || duration === 0)
      return;

    // Set scrubbing flag FIRST before any other operations
    isScrubbingRef.current = true;

    // Calculate and set progress bar position immediately
    const { left, width } = container.getBoundingClientRect();
    const clickX = e.clientX - left;
    const percentage = Math.max(0, Math.min(100, (clickX / width) * 100));
    const newTime = (percentage / 100) * duration;
    const widthStr = `${percentage}%`;

    // Update visual progress FIRST (using state so React doesn't reset it)
    setCurrentTime(newTime);
    setProgressWidth(widthStr);
    if (progressBarRef.current) {
      progressBarRef.current.style.width = widthStr;
    }

    // Save playing state before scrubbing
    wasPlayingBeforeScrubRef.current = !audio.paused;

    // Update audio position
    audio.currentTime = newTime;

    // Pause playback while scrubbing (this might trigger handlePause, but isScrubbingRef is already true)
    if (wasPlayingBeforeScrubRef.current) {
      audio.pause();
    }

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerUp = () => {
    const audio = audioRef.current;
    const progressBar = progressBarRef.current;
    if (!audio) return;

    // Sync progress bar to current audio position before resuming
    if (progressBar && duration > 0) {
      const percentage = (audio.currentTime / duration) * 100;
      const widthStr = `${percentage}%`;
      setProgressWidth(widthStr);
      progressBar.style.width = widthStr;
    }

    isScrubbingRef.current = false;

    // Resume playback if it was playing before scrubbing
    if (wasPlayingBeforeScrubRef.current) {
      audio.play().catch((err) => {
        console.error("Playback error:", err);
      });
    }
  };

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
    <div className="group/music mb-8" id="music-card">
      {spotifyTopTrack && (
        <div className="flex items-center gap-2 mb-3 text-muted">
          <SpotifyIcon size={16} />
          <span className="text-sm mb-1">what i'm playing</span>
        </div>
      )}
      <div className="flex flex-row items-center gap-4 relative pb-1 transition-all ">
        {/* Album Art with Play Button Overlay */}
        <div className="relative">
          <div className="w-24 h-24 rounded-md overflow-hidden">
            <Image
              width={96}
              height={96}
              src={trackData.artwork}
              alt={trackData.album}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        {/* Track Info */}
        <div className="flex-1 min-w-0 flex flex-col gap-4 ">
          <div className="">
            <p className="text-lg text-foreground font-medium truncate  -mt-2 -mb-1">
              {trackData.name}
            </p>
            <p className="text-muted truncate">{trackData.artist}</p>
          </div>
          <div className="flex flex-row items-center gap-3">
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05, cursor: "pointer" }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              onClick={togglePlayback}
              className="bg-foreground rounded-full p-2 w-8 h-8 flex items-center justify-center shrink-0 transition-colors duration-200"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {" "}
              {isPlaying ? (
                <PauseIcon size={24} className="text-background" />
              ) : (
                <PlayIcon size={24} className="text-background" />
              )}
            </motion.button>
            {/* Progress Bar */}
            {trackData.preview_url && (
              <motion.div
                className="flex-1 flex flex-col gap-1 -mb-2"
                onHoverStart={() => scale.set(1.2)}
                onHoverEnd={() => scale.set(1)}
                style={{
                  scale: progressScale,
                }}
              >
                <div
                  ref={progressContainerRef}
                  className="relative w-full cursor-pointer touch-none select-none py-2 -my-2"
                  onPointerMove={handlePointerMove}
                  onPointerDown={handlePointerDown}
                  onPointerUp={handlePointerUp}
                >
                  <motion.div
                    className="w-full bg-muted/20 rounded-full overflow-hidden"
                    style={{
                      height: progressHeight,
                    }}
                  >
                    <div
                      ref={progressBarRef}
                      className="h-full bg-foreground"
                      style={{ width: progressWidth, willChange: "width" }}
                    />
                  </motion.div>
                </div>
                <div className="flex flex-row items-center justify-between text-xs text-muted">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Hidden audio element */}
        {trackData.preview_url && (
          <audio
            ref={audioRef}
            src={trackData.preview_url}
            preload="metadata"
          />
        )}
      </div>
    </div>
  );
};

export default MusicCard;
