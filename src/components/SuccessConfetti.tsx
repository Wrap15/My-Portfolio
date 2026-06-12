import React, { useEffect, useRef } from 'react';

interface ConfettiParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  shape: 'circle' | 'square' | 'triangle';
}

interface SuccessConfettiProps {
  active: boolean;
}

export const SuccessConfetti: React.FC<SuccessConfettiProps> = ({ active }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: ConfettiParticle[] = [];

    const colors = [
      '#10b981', // emerald
      '#059669', // dark emerald
      '#6366f1', // indigo
      '#8b5cf6', // violet
      '#06b6d4', // cyan
      '#3b82f6', // blue
      '#f43f5e', // rose
    ];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const spawnParticle = (x: number, y: number, angleRange: [number, number]) => {
      const angle = (angleRange[0] + Math.random() * (angleRange[1] - angleRange[0])) * (Math.PI / 180);
      const velocity = 10 + Math.random() * 12;
      const size = 6 + Math.random() * 6;
      const shapes: Array<'circle' | 'square' | 'triangle'> = ['circle', 'square', 'triangle'];
      
      return {
        x,
        y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        size,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 8,
        opacity: 1,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
      };
    };

    const initBurst = () => {
      const h = canvas.height;
      const w = canvas.width;
      
      // Left cannon (firing up and to the right)
      for (let i = 0; i < 60; i++) {
        particles.push(spawnParticle(0, h * 0.9, [-70, -20]));
      }
      // Right cannon (firing up and to the left)
      for (let i = 0; i < 60; i++) {
        particles.push(spawnParticle(w, h * 0.9, [-160, -110]));
      }
    };

    initBurst();

    let frameCount = 0;
    const maxFrames = 240; // 4 seconds of processing limit

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frameCount++;

      particles.forEach((p) => {
        // Physics update
        p.vy += 0.26; // subtle gravity acceleration
        p.vx *= 0.985; // drag/air resistance
        p.vy *= 0.985;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        
        // Gentle fadeout towards completion
        if (frameCount > 80) {
          p.opacity -= 0.008;
        }

        if (p.opacity <= 0) return;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;

        if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === 'triangle') {
          ctx.beginPath();
          ctx.moveTo(0, -p.size / 2);
          ctx.lineTo(p.size / 2, p.size / 2);
          ctx.lineTo(-p.size / 2, p.size / 2);
          ctx.closePath();
          ctx.fill();
        } else {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        }

        ctx.restore();
      });

      if (frameCount < maxFrames && particles.some((p) => p.opacity > 0)) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-screen h-screen pointer-events-none z-[100]"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};
