import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { BossData } from '../types';
import { AKButton } from './UIComponents';

interface ResultModalProps {
  result: BossData | null;
  onClose: () => void;
}

export const ResultModal: React.FC<ResultModalProps> = ({ result, onClose }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (result && containerRef.current) {
      const tl = gsap.timeline();
      
      // 1. Fade in Background
      tl.fromTo(containerRef.current, 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.3 }
      );

      // 2. Slash effect or Card scale up
      tl.fromTo(cardRef.current,
        { scale: 3, opacity: 0, rotate: -10 },
        { scale: 1, opacity: 1, rotate: 0, duration: 0.5, ease: "back.out(1.7)" }
      );

      // 3. Text slide in
      tl.fromTo(textRef.current,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4 },
        "-=0.2"
      );
    }
  }, [result]);

  if (!result) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-sm"
      onClick={onClose} 
    >
      <div 
        className="relative max-w-4xl w-full flex flex-col md:flex-row items-center p-8 gap-8"
        onClick={e => e.stopPropagation()} 
      >
        {/* Background diagonal lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
           <div className="absolute top-0 right-0 w-[200%] h-full bg-[#67E8F9]/10 transform -skew-x-12 translate-x-1/2" />
        </div>

        {/* Boss Image Card */}
        <div ref={cardRef} className="relative w-64 h-96 md:w-80 md:h-[500px] shrink-0">
          <div className="absolute inset-0 border-4 border-white/20 transform translate-x-4 translate-y-4" />
          <div className="absolute inset-0 bg-slate-800 border border-[#67E8F9] overflow-hidden shadow-[0_0_30px_rgba(103,232,249,0.3)]">
            <img 
              src={result.img} 
              alt={result.name} 
              className="w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${result.id}/400/600`; }}
            />
            {/* Overlay Gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black to-transparent" />
          </div>
          {/* Rarity Marker */}
          <div className="absolute top-4 -left-2 bg-[#67E8F9] text-black font-black px-4 py-1 text-xl shadow-lg transform -skew-x-12">
            BOSS
          </div>
        </div>

        {/* Text Info */}
        <div ref={textRef} className="flex flex-col items-start space-y-4 z-10">
          <div className="flex items-center gap-2 text-[#67E8F9] font-bold tracking-[0.2em] uppercase">
            <div className="w-8 h-[2px] bg-[#67E8F9]" />
            寻访成功
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase italic leading-tight drop-shadow-lg">
            {result.name}
          </h1>
          
          <div className="w-full h-[1px] bg-gradient-to-r from-white/50 to-transparent my-4" />

          <p className="text-gray-300 max-w-md">
            目标已确认。干员已响应寻访信号。
            <br/>
            分配协议已启动。
          </p>

          <div className="mt-8">
            <AKButton onClick={onClose} variant="primary">
              确认聘用
            </AKButton>
          </div>
        </div>
      </div>
    </div>
  );
};