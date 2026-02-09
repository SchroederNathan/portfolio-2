"use client";

import { useCallback, useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
}

const COLORS = ["#e94560", "#0f3460", "#533483", "#16213e", "#e94560"];

const ParticleEffects = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const animFrameRef = useRef<number>(0);

  const spawnParticles = useCallback((x: number, y: number, count: number) => {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 3 + 1;
      const maxLife = Math.random() * 60 + 40;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: Math.random() * 3 + 1,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        alpha: 1,
        life: 0,
        maxLife,
      });
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * devicePixelRatio;
      canvas.height = rect.height * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    // Ambient particles that drift around
    const spawnAmbient = () => {
      const rect = canvas.getBoundingClientRect();
      const x = Math.random() * rect.width;
      const y = Math.random() * rect.height;
      const maxLife = Math.random() * 120 + 80;
      particlesRef.current.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 0.5,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        alpha: 1,
        life: 0,
        maxLife,
      });
    };

    // Seed some initial ambient particles
    for (let i = 0; i < 40; i++) spawnAmbient();

    let ambientTimer = 0;

    const loop = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      // Spawn ambient particles slowly
      ambientTimer++;
      if (ambientTimer % 4 === 0 && particlesRef.current.length < 300) {
        spawnAmbient();
      }

      // Spawn particles at mouse position
      const m = mouseRef.current;
      if (m.active) {
        spawnParticles(m.x, m.y, 3);
      }

      const particles = particlesRef.current;

      // Draw connections between nearby particles
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 80) {
            const lineAlpha =
              (1 - dist / 80) *
              Math.min(particles[i].alpha, particles[j].alpha) *
              0.15;
            ctx.strokeStyle = `rgba(233, 69, 96, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.alpha = 1 - p.life / p.maxLife;

        // Mouse attraction
        if (m.active) {
          const dx = m.x - p.x;
          const dy = m.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150 && dist > 1) {
            p.vx += (dx / dist) * 0.15;
            p.vy += (dy / dist) * 0.15;
          }
        }

        p.vx *= 0.98;
        p.vy *= 0.98;
        p.x += p.vx;
        p.y += p.vy;

        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [spawnParticles]);

  const handlePointerMove = (e: React.PointerEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  };

  const handlePointerLeave = () => {
    mouseRef.current.active = false;
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full rounded-xl bg-foreground/5 shadow-[inset_0_1px_0.25px_0.25px_rgba(255,255,255,0.1)] drop-shadow-lg overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full cursor-crosshair"
          style={{ height: 450 }}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        />
      </div>
      <p className="text-muted text-xs text-center">
        Move your cursor over the canvas to attract and spawn particles
      </p>
    </div>
  );
};

export default ParticleEffects;
