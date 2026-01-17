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
      // 2. Calculate rotations
      const extraSpins = 360 * 8; // 8 full spins
      
      // Calculate target angle to align the CENTER of the winning sector to the top (0 degrees)
      // The pointer is at 0 degrees (12 o'clock).
      // If sector starts at `angle`, center is at `angle + SECTOR_ANGLE/2`.
      // To bring that center to 0, we rotate backwards by that amount.
      const sectorCenterAngle = winnerIndex * SECTOR_ANGLE + (SECTOR_ANGLE / 2);
      const stopAngle = -sectorCenterAngle; 
      
      // Random offset: stay within ±40% of the sector to avoid edge cases
      const maxOffset = SECTOR_ANGLE * 0.4;
      const randomOffset = (Math.random() - 0.5) * 2 * maxOffset;
      
      const finalRotation = currentRotation + extraSpins + stopAngle + randomOffset;

      // 3. Animate
      gsap.to(wheelRef.current, {
        rotation: finalRotation,
        duration: 6,
        ease: "expo.inOut",
        onComplete: () => {
          setIsSpinning(false);
          // Normalize rotation to 0-360 for cleaner state, keying off the final value
          setCurrentRotation(finalRotation % 360);
          onComplete(winner);
        }
      });
    }
  }, [isSpinning, bosses, onComplete, setIsSpinning]);

  return (
    <div className="relative flex justify-center items-center py-2" ref={containerRef}>
      {/* Pointer - Dark blue for light theme */}
      {/* Pointer - Enhanced Mechanical Style */}
      <div className="absolute top-0 z-20 w-12 h-16 pointer-events-none drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)] transform -translate-y-[40%]">
        <svg viewBox="0 0 40 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 60L5 15H35L20 60Z" fill="#ff4d4f" stroke="#fff" strokeWidth="2"/>
          <path d="M5 15L5 0H35L35 15L20 25L5 15Z" fill="#2a3f5f" stroke="#4a6a9a" strokeWidth="1"/>
          <circle cx="20" cy="10" r="4" fill="#67e8f9" className="animate-pulse"/>
        </svg>
      </div>

      {/* Outer Ring Decoration */}
      <div className="absolute w-[520px] h-[520px] rounded-full border-4 border-dashed border-[#4a6a9a]/25 animate-spin-slow pointer-events-none" />
      <div className="absolute w-[560px] h-[560px] rounded-full border border-[#7ab3d9]/30 pointer-events-none" />

      {/* Wheel */}
      <div 
        ref={wheelRef}
        className="w-[480px] h-[480px] rounded-full relative overflow-hidden shadow-[0_0_50px_rgba(74,106,154,0.4)] border-4 border-[#4a6a9a] bg-[#e8f4fc] ring-4 ring-[#7ab3d9]/30"
      >
        {bosses.map((boss, index) => {
          const angle = index * SECTOR_ANGLE;
          const midAngle = angle + SECTOR_ANGLE / 2;
          // 计算文字位置（外边缘）- 按比例缩放 (480/380 = 1.26)
          const textRadius = 192; // 文字到中心的距离
          const textX = Math.sin(midAngle * Math.PI / 180) * textRadius;
          const textY = -Math.cos(midAngle * Math.PI / 180) * textRadius;
          // 计算头像位置（内部）
          const imgRadius = 115; // 头像到中心的距离
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
                  className="font-bold text-xs whitespace-nowrap"
                  style={{
                    color: '#2a3f5f',
                    textShadow: '0 1px 2px rgba(255,255,255,0.8), 0 0 8px rgba(255,255,255,0.6)',
                    letterSpacing: '1px'
                  }}
                >
                  {boss.id} {boss.name}
                </span>
              </div>
              
              {/* 奖品文字卡片 - 内部 - 圆角矩形 */}
              <div
                className="absolute left-1/2 top-1/2 pointer-events-none"
                style={{
                  transform: `translate(-50%, -50%) rotate(${midAngle}deg) translateY(-${imgRadius}px)`,
                  zIndex: 4
                }}
              >
                <div 
                  className="w-14 h-14 rounded-lg border-2 border-white flex items-center justify-center p-1"
                  style={{
                    background: `linear-gradient(135deg, ${boss.color}dd, ${boss.color}88)`,
                    boxShadow: '0 2px 8px rgba(74,106,154,0.3), 0 0 12px rgba(122,179,217,0.2)'
                  }}
                >
                  <span 
                    className="text-white text-[8px] font-bold text-center leading-tight"
                    style={{
                      textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                      wordBreak: 'break-all'
                    }}
                  >
                    {boss.name}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Center Hub */}
      {/* Center Hub - High Tech Bearing Look */}
      <div className="absolute z-10 w-24 h-24 bg-[#2a3f5f] rounded-full border-4 border-[#a8d4f0] flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.4)]">
         {/* Inner detail rings */}
        <div className="absolute inset-2 border border-dashed border-[#67e8f9]/50 rounded-full animate-spin-slow" style={{ animationDuration: '10s' }} />
        <div className="w-16 h-16 bg-[#1e293b] rounded-full flex items-center justify-center border border-[#4a6a9a]">
           <div className="w-12 h-12 bg-gradient-to-br from-[#4a6a9a] to-[#2a3f5f] rounded-full shadow-inner flex items-center justify-center">
              <span className="text-[#67e8f9] font-bold text-[10px] tracking-widest">RHODES</span>
           </div>
        </div>
      </div>
    </div>
  );
};