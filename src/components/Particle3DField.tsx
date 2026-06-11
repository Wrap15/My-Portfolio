import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number; // Depth factor [0.1, 1.0] for parallax calculation
  size: number;
  color: string;
  speedX: number;
  speedY: number;
}

export const Particle3DField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = 45;

    // Handle Resize
    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect() || { width: window.innerWidth, height: window.innerHeight };
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resizeCanvas();

    // Resize observer for parent container fluid sizing
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    // Initialize particles with randomized coordinates, speeds, and 3D depth factors
    const initParticles = () => {
      particles = [];
      const colors = [
        'rgba(16, 185, 129, 0.4)',  // emerald
        'rgba(20, 184, 166, 0.3)',  // teal
        'rgba(14, 165, 233, 0.3)',  // sky
        'rgba(168, 85, 247, 0.25)', // purple
        'rgba(244, 63, 94, 0.2)'    // rose
      ];

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 0.9 + 0.1, // 0.1 (far) to 1.0 (near)
          size: Math.random() * 2 + 0.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          speedX: (Math.random() - 0.5) * 0.2,
          speedY: (Math.random() - 0.5) * 0.15
        });
      }
    };
    initParticles();

    // Mouse Move listener
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      // Coordinates normalized from -0.5 to 0.5
      mouseRef.current.targetX = (e.clientX / innerWidth) - 0.5;
      mouseRef.current.targetY = (e.clientY / innerHeight) - 0.5;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smoothly interpolate mouse coordinates (linear interpolation for cinematic trailing/inertia)
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      const mouseFactorX = mouseRef.current.x * 65; // Max 65px shift
      const mouseFactorY = mouseRef.current.y * 65;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Frame update
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around borders
        if (p.x < -20) p.x = canvas.width + 20;
        if (p.x > canvas.width + 20) p.x = -20;
        if (p.y < -20) p.y = canvas.height + 20;
        if (p.y > canvas.height + 20) p.y = -20;

        // Visual Parallax calculations based on particle depth (z)
        // Deeper z = further away = moves less with mouse
        const drawX = p.x + mouseFactorX * p.z;
        const drawY = p.y + mouseFactorY * p.z;
        const drawSize = p.size * (p.z * 1.4);

        ctx.beginPath();
        // Create a subtle radial glow for the coordinates of each particle
        const gradient = ctx.createRadialGradient(drawX, drawY, 0, drawX, drawY, drawSize * 1.8);
        gradient.addColorStop(0, p.color);
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.arc(drawX, drawY, drawSize * 1.8, 0, Math.PI * 2);
        ctx.fill();

        // Core speck
        ctx.beginPath();
        ctx.fillStyle = p.z > 0.6 ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0.3)';
        ctx.arc(drawX, drawY, drawSize * 0.4, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    // Clean up
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};
