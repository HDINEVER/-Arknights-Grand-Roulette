import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { BossData, LotteryProps } from '../types';

export const WheelMode: React.FC<LotteryProps> = ({ 
  bosses, 
  onComplete, 
  isSpinning, 
  setIsSpinning,
  resetTrigger
}) => {
  const wheelRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentRotation, setCurrentRotation] = useState(0);

  // Constants
  const SECTOR_ANGLE = 360 / bosses.length;

  useEffect(() => {
    // Reset wheel visually if resetTrigger changes
    if (!isSpinning && wheelRef.current) {
      gsap.to(wheelRef.current, { rotation: 0, duration: 1, ease: 'power2.inOut' });
      setCurrentRotation(0);
    }
  }, [resetTrigger]);

  useEffect(() => {
    if (isSpinning && wheelRef.current) {
      // 1. Determine winner
      const winnerIndex = Math.floor(Math.random() * bosses.length);
      const winner = bosses[winnerIndex];

      // 2. Calculate rotations
      const extraSpins = 360 * 8; // 8 full spins
      const targetSectorAngle = winnerIndex * SECTOR_ANGLE;
      const stopAngle = -(targetSectorAngle); 
      const randomOffset = (Math.random() - 0.5) * (SECTOR_ANGLE * 0.8);
      
      const finalRotation = currentRotation + extraSpins + stopAngle + randomOffset;

      // 3. Animate
      gsap.to(wheelRef.current, {
        rotation: finalRotation,
        duration: 5,
        ease: "power4.inOut",
        onComplete: () => {
          setIsSpinning(false);
          setCurrentRotation(finalRotation % 360);
          onComplete(winner);
        }
      });
    }
  }, [isSpinning, bosses, onComplete, setIsSpinning]);

  return (
    <div className="relative flex justify-center items-center py-10" ref={containerRef}>
      {/* Pointer - White for high contrast on Ice theme */}
      <div className="absolute top-0 z-20 w-12 h-16 pointer-events-none drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] transform -translate-y-1/2">
        <svg viewBox="0 0 100 100" fill="#FFFFFF">
          <path d="M50 100 L0 0 L100 0 Z" />
        </svg>
      </div>

      {/* Outer Ring Decoration - Ice Blue */}
      <div className="absolute w-[540px] h-[540px] rounded-full border-4 border-dashed border-[#67E8F9]/30 animate-spin-slow pointer-events-none" />
      <div className="absolute w-[580px] h-[580px] rounded-full border border-[#67E8F9]/20 pointer-events-none" />

      {/* Wheel */}
      <div 
        ref={wheelRef}
        className="w-[500px] h-[500px] rounded-full relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border-8 border-slate-800 bg-slate-900"
      >
        {bosses.map((boss, index) => {
          return (
            <div
              key={boss.id}
              className="absolute top-0 left-1/2 w-1/2 h-1/2 origin-bottom-left"
              style={{
                transform: `rotate(${index * SECTOR_ANGLE}deg) skewY(-${90 - SECTOR_ANGLE}deg)`,
                // Alternate colors for cartoon block style. 
                // Using boss color and a dark slate for contrast
                background: index % 2 === 0 ? boss.color : '#1e293b', 
                borderLeft: '2px solid rgba(255,255,255,0.1)'
              }}
            >
              {/* Content Container - Unskew text/image */}
              <div 
                className="absolute flex flex-col items-center justify-end w-full h-full pb-8 pr-8 text-center"
                style={{
                  transform: `skewY(${90 - SECTOR_ANGLE}deg) rotate(${SECTOR_ANGLE / 2}deg) translate(20px, 40px)`
                }}
              >
                <span className="text-white font-black text-sm uppercase drop-shadow-md tracking-wider transform rotate-90 truncate w-32">
                  {boss.name}
                </span>
                <img 
                   src={boss.img} 
                   alt={boss.name}
                   className="w-12 h-12 rounded-full border-2 border-white object-cover mt-2 transform rotate-90"
                   onError={(e) => {
                     (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${boss.id}/100`;
                   }}
                />
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Center Hub */}
      <div className="absolute z-10 w-24 h-24 bg-slate-800 rounded-full border-4 border-[#67E8F9] flex items-center justify-center shadow-lg">
        <div className="w-16 h-16 bg-[#67E8F9] rounded-full animate-pulse shadow-[0_0_20px_#67E8F9]" />
        <span className="absolute text-slate-900 font-bold text-xs tracking-widest">RHODES</span>
      </div>
    </div>
  );
};