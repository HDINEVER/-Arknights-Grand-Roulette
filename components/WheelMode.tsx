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
      {/* Pointer - Dark blue for light theme */}
      <div className="absolute top-0 z-20 w-12 h-16 pointer-events-none drop-shadow-[0_0_10px_rgba(74,106,154,0.5)] transform -translate-y-1/2">
        <svg viewBox="0 0 100 100" fill="#2a3f5f">
          <path d="M50 100 L0 0 L100 0 Z" />
        </svg>
      </div>

      {/* Outer Ring Decoration */}
      <div className="absolute w-[540px] h-[540px] rounded-full border-4 border-dashed border-[#4a6a9a]/25 animate-spin-slow pointer-events-none" />
      <div className="absolute w-[580px] h-[580px] rounded-full border border-[#7ab3d9]/30 pointer-events-none" />

      {/* Wheel */}
      <div 
        ref={wheelRef}
        className="w-[500px] h-[500px] rounded-full relative overflow-hidden shadow-[0_0_40px_rgba(74,106,154,0.25)] border-8 border-[#4a6a9a] bg-[#e8f4fc]"
      >
        {bosses.map((boss, index) => {
          const angle = index * SECTOR_ANGLE;
          const midAngle = angle + SECTOR_ANGLE / 2;
          // 计算文字位置（外边缘）
          const textRadius = 200; // 文字到中心的距离
          const textX = Math.sin(midAngle * Math.PI / 180) * textRadius;
          const textY = -Math.cos(midAngle * Math.PI / 180) * textRadius;
          // 计算头像位置（内部）
          const imgRadius = 120; // 头像到中心的距离
          const imgX = Math.sin(midAngle * Math.PI / 180) * imgRadius;
          const imgY = -Math.cos(midAngle * Math.PI / 180) * imgRadius;
          
          return (
            <div key={boss.id}>
              {/* 扇形背景 */}
              <div
                className="absolute top-0 left-1/2 w-1/2 h-1/2 origin-bottom-left"
                style={{
                  transform: `rotate(${angle}deg) skewY(-${90 - SECTOR_ANGLE}deg)`,
                  background: index % 2 === 0 ? '#7ab3d9' : '#a8d4f0',
                  borderLeft: '2px solid rgba(74,106,154,0.3)'
                }}
              />
              
              {/* 文字标签 - 外边缘 - 简洁样式 */}
              <div
                className="absolute left-1/2 top-1/2 pointer-events-none"
                style={{
                  transform: `translate(-50%, -50%) rotate(${midAngle}deg) translateY(-${textRadius}px)`,
                  zIndex: 5
                }}
              >
                <span 
                  className="font-bold text-sm whitespace-nowrap"
                  style={{
                    color: '#2a3f5f',
                    textShadow: '0 1px 2px rgba(255,255,255,0.8), 0 0 8px rgba(255,255,255,0.6)',
                    letterSpacing: '1px'
                  }}
                >
                  {boss.id} {boss.name}
                </span>
              </div>
              
              {/* Boss头像 - 内部 - 圆角矩形 */}
              <div
                className="absolute left-1/2 top-1/2 pointer-events-none"
                style={{
                  transform: `translate(-50%, -50%) rotate(${midAngle}deg) translateY(-${imgRadius}px)`,
                  zIndex: 4
                }}
              >
                <img 
                  src={boss.img} 
                  alt={boss.name}
                  className="w-14 h-14 rounded-lg border-2 border-white object-cover"
                  style={{
                    boxShadow: '0 2px 8px rgba(74,106,154,0.3), 0 0 12px rgba(122,179,217,0.2)'
                  }}
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
      <div className="absolute z-10 w-24 h-24 bg-[#4a6a9a] rounded-full border-4 border-white flex items-center justify-center shadow-lg">
        <div className="w-16 h-16 bg-[#7ab3d9] rounded-full animate-pulse shadow-[0_0_20px_rgba(122,179,217,0.5)]" />
        <span className="absolute text-white font-bold text-xs tracking-widest">RHODES</span>
      </div>
    </div>
  );
};