
import React, { useRef, useEffect } from 'react';

const RedStarfieldBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: any[] = [];
    
    const setup = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        particles = [];

        const isDesktop = window.innerWidth > 768;
        const redParticleCount = isDesktop ? 200000 : 80000;
        const whiteParticleCount = isDesktop ? 1500 : 600;

        // Create red particles
        for (let i = 0; i < redParticleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height, // Start anywhere for a fuller effect
                size: 2 + Math.random() * 6,
                speed: 0.2 + Math.random() * 0.6, // Speed: 0.2 to 0.8
                color: `rgba(255, 10, 10, ${0.15 + Math.random() * 0.45})`,
                isRed: true,
            });
        }
        
        // Create white particles (ambient)
        for (let i = 0; i < whiteParticleCount; i++) {
             particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: 1 + Math.random() * 1.5,
                speed: 0.1 + Math.random() * 0.4,
                color: `rgba(255, 255, 255, ${0.2 + Math.random() * 0.5})`,
                isRed: false,
            });
        }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.y += p.speed;
        p.x += (Math.random() - 0.5) * 0.4; // Add horizontal drift for "smoke" effect
        
        // Reset particle if it goes off screen
        if (p.y > canvas.height + p.size) {
            p.y = -p.size;
            p.x = Math.random() * canvas.width;
        }
        if (p.x > canvas.width + p.size) {
            p.x = -p.size;
        } else if (p.x < -p.size) {
            p.x = canvas.width + p.size;
        }

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    const handleResize = () => {
        if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
        }
        setup();
        animate();
    };
    
    const handleVisibilityChange = () => {
        if (document.hidden) {
            if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
        } else {
            // Re-initialize animation to avoid a jump
            animate();
        }
    };

    setup();
    animate();

    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-black"
      aria-hidden="true"
    />
  );
};

export default RedStarfieldBackground;