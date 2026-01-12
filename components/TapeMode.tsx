import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { BossData, LotteryProps } from '../types';

export const TapeMode: React.FC<LotteryProps> = ({
  bosses,
  onComplete,
  isSpinning,
  setIsSpinning,
  resetTrigger
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [tapeItems, setTapeItems] = useState<BossData[]>([]);
  
  const CARD_WIDTH = 160;
  const GAP = 16;

  // Initialize tape items
  useEffect(() => {
    const pool = [];
    for (let i = 0; i < 100; i++) {
      pool.push(bosses[Math.floor(Math.random() * bosses.length)]);
    }
    setTapeItems(pool);
    
    // Reset position
    if (scrollRef.current) {
       gsap.set(scrollRef.current, { x: 0 });
    }
  }, [bosses, resetTrigger]);

  useEffect(() => {
    if (isSpinning && scrollRef.current && tapeItems.length > 0) {
      // 1. Determine winner - Randomize instead of hardcoded
      // Pick a winner from the middle-end of the tape to ensure enough scroll time
      const minIndex = 50;
      const maxIndex = tapeItems.length - 10;
      const winnerIndex = Math.floor(Math.random() * (maxIndex - minIndex + 1)) + minIndex; 
      const actualWinner = tapeItems[winnerIndex];

      // 2. Calculate Distance
      // The container centers the content via `pl-[50%]`.
      // To center a specific item, we need to move the tape such that the item's center 
      // aligns with the container's zero-point (which is visually the center due to padding).
      //
      // Initial State: Tape starts at x=0. The visual center (marker) is at CONTAINER_WIDTH/2.
      // Item Position relative to Tape Start: winnerIndex * (ITEM_WIDTH)
      // Item Center relative to Tape Start: winnerIndex * (ITEM_WIDTH) + ITEM_WIDTH/2
      //
      // We want: TapeStart + TranslateX + ItemCenter = CONTAINER_WIDTH/2
      // However, because we have `pl-[50%]`, the "Tape Start" is visually at CONTAINER_WIDTH/2.
      // So: (CONTAINER_WIDTH/2) + TranslateX + ItemCenter = CONTAINER_WIDTH/2
      // Therefore: TranslateX = -ItemCenter
      
      const itemCenterOffset = (winnerIndex * (CARD_WIDTH + GAP)) + (CARD_WIDTH / 2);
      const targetX = -itemCenterOffset;
      
      // Random offset: small variance within the card boundaries
      const randomOffset = (Math.random() - 0.5) * (CARD_WIDTH * 0.3); 

      // 3. Animate
      const tl = gsap.timeline({
        onComplete: () => {
          setIsSpinning(false);
          onComplete(actualWinner);
        }
      });

      tl.to(scrollRef.current, {
        x: targetX + randomOffset,
        duration: 7,
        ease: "expo.out" 
      });
      
      tl.to(scrollRef.current, { filter: 'blur(4px)', duration: 0.5, ease: 'power2.in' }, 0);
      tl.to(scrollRef.current, { filter: 'blur(0px)', duration: 2, ease: 'power2.out' }, 3);
    }
  }, [isSpinning, tapeItems, bosses, onComplete, setIsSpinning]);

  return (
    <div className="relative w-full max-w-5xl mx-auto h-64 overflow-hidden bg-slate-900/60 border-y-2 border-[#67E8F9]/50 flex items-center shadow-inner">
      {/* Center Marker - Changed to White/Ice */}
      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-[#ffffff] z-20 transform -translate-x-1/2 shadow-[0_0_10px_#ffffff]" />
      <div className="absolute left-1/2 top-4 -translate-x-1/2 z-20 text-[#ffffff] drop-shadow-lg">▼</div>
      <div className="absolute left-1/2 bottom-4 -translate-x-1/2 z-20 text-[#ffffff] drop-shadow-lg">▲</div>

      {/* Tape Track */}
      <div 
        ref={scrollRef}
        className="flex items-center pl-[50%]"
        style={{ gap: GAP }}
      >
        {tapeItems.map((item, index) => (
          <div 
            key={`${item.id}-${index}`}
            className="relative flex-shrink-0 bg-[#0f172a] border border-slate-700"
            style={{ 
              width: CARD_WIDTH, 
              height: CARD_WIDTH,
              // Highlight winner briefly or cheat visual? No, just keep border
              borderColor: index === 75 && isSpinning ? '#ffffff' : 'rgba(103,232,249,0.1)' 
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />
            <img 
              src={item.img} 
              alt={item.name} 
              className="w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${item.id}/200`; }}
            />
            <div className="absolute bottom-2 left-0 right-0 text-center z-20">
               <span 
                 className="text-white text-sm font-bold uppercase truncate px-2 block"
                 style={{ color: item.color }}
               >
                 {item.name}
               </span>
            </div>
            
            {/* Rarity Color Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: item.color }} />
          </div>
        ))}
      </div>
      
      {/* Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-transparent to-[#0f172a] pointer-events-none z-10" />
    </div>
  );
};