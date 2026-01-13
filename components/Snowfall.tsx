import React, { useEffect, useRef } from 'react';

export const Snowfall: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // Handle high-DPI
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    // ACCUMULATION SYSTEM
    const resolution = 4; 
    let buckets = Math.ceil(width / resolution);
    let snowHeightMap = new Float32Array(buckets).fill(0);

    // Increased particle count for better visibility
    const particleCount = 200; 

    class Particle {
      x: number;
      y: number;
      radius: number;
      density: number;
      opacity: number;
      rotation: number;
      rotationSpeed: number;
      speedY: number;
      speedX: number;
      isSnowflake: boolean;

      constructor(resetY = false) {
        this.x = Math.random() * width;
        this.y = resetY ? -20 : Math.random() * height;
        
        // Increased size for better visibility: 2px to 6px
        this.radius = Math.random() * 4 + 2; 
        this.isSnowflake = this.radius > 3.5; 

        this.density = Math.random() * particleCount;
        // Increased base opacity: 0.6 to 1.0
        this.opacity = Math.random() * 0.4 + 0.6;
        
        // Physics
        this.speedY = (Math.random() * 0.5 + 0.2) * (this.radius / 3); 
        this.speedX = Math.random() * 0.5 - 0.25; 

        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
      }

      update(time: number) {
        this.y += this.speedY;
        this.x += Math.sin(time + this.density) * 0.3 + this.speedX + 0.2; 

        if (this.x > width + 10) this.x = -10;
        if (this.x < -10) this.x = width + 10;

        // Ground Collision
        const bucketIdx = Math.floor(Math.max(0, Math.min(width, this.x)) / resolution);
        const currentGroundHeight = snowHeightMap[bucketIdx];
        
        if (this.y >= height - currentGroundHeight) {
           const impact = this.radius * 0.8; 
           if (bucketIdx > 0) snowHeightMap[bucketIdx - 1] += impact * 0.5;
           snowHeightMap[bucketIdx] += impact;
           if (bucketIdx < buckets - 1) snowHeightMap[bucketIdx + 1] += impact * 0.5;
           this.reset();
        }
      }

      reset() {
        this.y = -20;
        this.x = Math.random() * width;
        this.speedY = (Math.random() * 0.5 + 0.2) * (this.radius / 3);
        this.rotation = Math.random() * Math.PI * 2;
      }

      draw() {
        if (!ctx) return;
        
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;
        
        // Add soft shadow to make snow pop against light background
        ctx.shadowColor = "rgba(148, 163, 184, 0.4)"; // Slate-400
        ctx.shadowBlur = 3;
        ctx.shadowOffsetY = 1;

        ctx.fillStyle = "white";

        if (this.isSnowflake) {
            ctx.strokeStyle = "white";
            ctx.lineWidth = 2; // Thicker lines
            ctx.beginPath();
            for(let i=0; i<3; i++) {
                ctx.moveTo(0, -this.radius);
                ctx.lineTo(0, this.radius);
                ctx.rotate(Math.PI / 3);
            }
            ctx.stroke();
        } else {
            ctx.beginPath();
            ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();
      }
    }

    const particles: Particle[] = [];
    // Initialize
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let time = 0;
    
    const drawSnowPile = () => {
        // Melting
        for(let i=0; i<buckets; i++) {
            if (snowHeightMap[i] > 0) {
                snowHeightMap[i] -= 0.05; 
                if (snowHeightMap[i] < 0) snowHeightMap[i] = 0;
            }
        }

        // Smoothing
        const smoothedMap = new Float32Array(buckets);
        for(let i=0; i<buckets; i++) {
            let sum = snowHeightMap[i];
            let count = 1;
            if (i > 0) { sum += snowHeightMap[i-1]; count++; }
            if (i < buckets - 1) { sum += snowHeightMap[i+1]; count++; }
            smoothedMap[i] = sum / count;
        }
        snowHeightMap = smoothedMap;

        if (!ctx) return;
        
        // Enhanced Gradient for Pile visibility
        const pileGradient = ctx.createLinearGradient(0, height - 150, 0, height);
        pileGradient.addColorStop(0, "rgba(255, 255, 255, 0.0)");
        pileGradient.addColorStop(0.3, "rgba(255, 255, 255, 0.95)");
        pileGradient.addColorStop(1, "rgba(224, 242, 254, 1.0)"); // Sky-100 tint at bottom

        ctx.fillStyle = pileGradient;
        
        // Pile shadow
        ctx.save();
        ctx.shadowColor = "rgba(148, 163, 184, 0.2)";
        ctx.shadowBlur = 10;
        ctx.shadowOffsetY = -5;

        ctx.beginPath();
        ctx.moveTo(0, height);
        
        for(let i=0; i<buckets; i++) {
            const x = i * resolution;
            const texture = Math.sin(i * 0.5 + time) * 3; // Enhanced texture
            const y = height - snowHeightMap[i] + texture;
            ctx.lineTo(x, y);
        }
        
        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.01;

      particles.forEach(p => {
        p.rotation += p.rotationSpeed;
        p.update(time);
        p.draw();
      });

      drawSnowPile();

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      buckets = Math.ceil(width / resolution);
      snowHeightMap = new Float32Array(buckets).fill(0);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[5]" />;
};
