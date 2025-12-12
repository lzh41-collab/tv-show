import React, { useEffect, useRef } from 'react';

interface NoiseCanvasProps {
  opacity?: number;
}

export const NoiseCanvas: React.FC<NoiseCanvasProps> = ({ opacity = 0.1 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resize = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth / 2; // Low res for performance & retro feel
        canvas.height = canvas.parentElement.clientHeight / 2;
      }
    };

    const loop = () => {
      const w = canvas.width;
      const h = canvas.height;
      
      // Clear
      ctx.clearRect(0, 0, w, h);
      
      // Generate noise
      const idata = ctx.createImageData(w, h);
      const buffer32 = new Uint32Array(idata.data.buffer);
      const len = buffer32.length;

      for (let i = 0; i < len; i++) {
        if (Math.random() < 0.5) {
          buffer32[i] = 0xff000000; // Black (with full alpha, handled by css opacity)
        } else {
           buffer32[i] = 0xffffffff; // White
        }
      }

      ctx.putImageData(idata, 0, 0);
      animationFrameId = requestAnimationFrame(loop);
    };

    window.addEventListener('resize', resize);
    resize();
    loop();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none mix-blend-overlay"
      style={{ opacity }}
    />
  );
};