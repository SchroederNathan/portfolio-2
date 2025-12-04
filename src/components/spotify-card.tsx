"use client";

interface SpotifyCardProps {
  trackId: string;
}

const SpotifyCard = ({ trackId }: SpotifyCardProps) => {
  return (
    <div className="mb-8">
      <iframe
        src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`}
        width="100%"
        height="152"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="rounded-2xl"

      />
    </div>
  );
};

export default SpotifyCard;

