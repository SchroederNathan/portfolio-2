"use client";

export default function ExposureFontLoader() {
  // All optical size variants from -100 to +100 in steps of 10
  const variants = [
    -100, -90, -80, -70, -60, -50, -40, -30, -20, -10,
    0,
    10, 20, 30, 40, 50, 60, 70, 80, 90, 100
  ];

  return (
    <div 
      aria-hidden="true" 
      style={{ 
        position: 'absolute', 
        width: 0, 
        height: 0, 
        overflow: 'hidden', 
        pointerEvents: 'none', 
        opacity: 0,
        visibility: 'hidden'
      }}
    >
      {variants.map(v => (
        <span key={v} style={{ fontFamily: v === 0 ? 'Exposure0' : `Exposure${v}` }}>
          .
        </span>
      ))}
    </div>
  );
}

