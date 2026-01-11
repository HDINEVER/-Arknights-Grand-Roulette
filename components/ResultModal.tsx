import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { BossData } from '../types';
import { AKButton } from './UIComponents';

interface ResultModalProps {
  result: BossData | null;
  onClose: () => void;
  isVip?: boolean;
}

// VIP阶段枚举
enum VIPStage {
  BOSS_PREVIEW = 'boss_preview',    // 第一阶段：展示boss头像
  CHARACTER_REVEAL = 'character_reveal' // 第二阶段：炫酷展示角色卡
}

export const ResultModal: React.FC<ResultModalProps> = ({ result, onClose, isVip = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const characterCardRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // VIP模式阶段状态
  const [vipStage, setVipStage] = useState<VIPStage>(VIPStage.BOSS_PREVIEW);
  const [showCharacterCard, setShowCharacterCard] = useState(false);

  // 重置VIP阶段
  useEffect(() => {
    if (result && isVip) {
      setVipStage(VIPStage.BOSS_PREVIEW);
      setShowCharacterCard(false);
    }
  }, [result, isVip]);

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
      if (textRef.current) {
        tl.fromTo(textRef.current,
          { x: 100, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.4 },
          "-=0.2"
        );
      }
    }
  }, [result, isVip, vipStage]);

  // VIP角色卡片展示动画
  useEffect(() => {
    if (showCharacterCard && characterCardRef.current) {
      // 播放语音
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(e => console.log('Audio play failed:', e));
      }

      // 炫酷入场动画
      const tl = gsap.timeline();
      
      // 先闪光效果
      tl.fromTo(characterCardRef.current,
        { 
          scale: 0.1, 
          opacity: 0, 
          rotateY: 180,
          filter: 'brightness(3) blur(20px)'
        },
        { 
          scale: 1, 
          opacity: 1, 
          rotateY: 0,
          filter: 'brightness(1) blur(0px)',
          duration: 1.2, 
          ease: "elastic.out(1, 0.5)" 
        }
      );
      
      // 添加持续发光效果
      tl.to(characterCardRef.current, {
        boxShadow: '0 0 60px rgba(255, 215, 0, 0.8), 0 0 120px rgba(255, 179, 71, 0.6)',
        duration: 0.5,
        yoyo: true,
        repeat: 2
      });
    }
  }, [showCharacterCard]);

  // VIP确认Boss后进入角色展示
  const handleConfirmBoss = () => {
    setVipStage(VIPStage.CHARACTER_REVEAL);
    setShowCharacterCard(true);
  };

  if (!result) return null;

  // VIP Mode
  if (isVip) {
    return (
      <div 
        ref={containerRef}
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(26,26,46,0.97) 0%, rgba(10,10,25,0.99) 100%)'
        }}
      >
        {/* 语音播放器 */}
        <audio ref={audioRef} src="/images/作战中4.wav" preload="auto" />
        
        {/* Golden ambient particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-[#ffd700] rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0.2 + Math.random() * 0.3,
                animation: `floatUp ${4 + Math.random() * 6}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 4}s`,
                boxShadow: '0 0 10px #ffd700'
              }}
            />
          ))}
        </div>

        {/* 第一阶段：Boss头像预览 */}
        {vipStage === VIPStage.BOSS_PREVIEW && (
          <div 
            ref={cardRef}
            className="relative flex flex-col items-center"
            onClick={e => e.stopPropagation()}
          >
            {/* VIP徽章 */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#ffd700] via-[#ffea00] to-[#ffd700] text-black px-6 py-2 rounded-full text-lg font-black shadow-[0_0_30px_rgba(255,215,0,0.6)] z-20">
              👑 VIP 专属寻访 👑
            </div>
            
            {/* Boss头像卡片 */}
            <div className="mt-8 relative">
              <div className="w-72 h-72 rounded-3xl overflow-hidden border-4 border-[#ffd700] shadow-[0_0_50px_rgba(255,215,0,0.5),inset_0_0_30px_rgba(255,215,0,0.2)]">
                <img 
                  src={result.img} 
                  alt={result.name}
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://picsum.photos/300/300?random'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              </div>
              
              {/* 光环装饰 */}
              <div className="absolute -inset-4 rounded-3xl border-2 border-[#ffd700]/30 animate-pulse" />
              <div className="absolute -inset-8 rounded-3xl border border-[#ffd700]/15" />
            </div>
            
            {/* Boss信息 */}
            <div className="mt-8 text-center">
              <p className="text-[#ffd700] text-sm font-bold tracking-[0.3em] mb-2">✦ 目标锁定 ✦</p>
              <h2 className="text-5xl font-black text-white mb-2 drop-shadow-[0_0_20px_rgba(255,215,0,0.5)]">
                {result.name}
              </h2>
              <p className="text-gray-400 text-sm">尊贵的博士，是否确认此目标？</p>
            </div>
            
            {/* 确认按钮 */}
            <button 
              onClick={handleConfirmBoss}
              className="mt-8 px-12 py-4 bg-gradient-to-r from-[#ffd700] via-[#ffea00] to-[#ffd700] text-black font-black text-xl rounded-2xl transform hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_30px_rgba(255,215,0,0.5)] hover:shadow-[0_0_50px_rgba(255,215,0,0.8)]"
            >
              ✨ 确认此BOSS ✨
            </button>
          </div>
        )}

        {/* 第二阶段：角色卡片展示 */}
        {vipStage === VIPStage.CHARACTER_REVEAL && (
          <div 
            className="relative flex flex-col items-center"
            onClick={e => e.stopPropagation()}
          >
            {/* 闪光背景效果 */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-radial from-[#ffd700]/30 via-[#ffd700]/10 to-transparent animate-pulse" />
              {/* 光芒射线 */}
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-1 h-80 bg-gradient-to-t from-transparent via-[#ffd700]/40 to-transparent origin-bottom"
                  style={{
                    transform: `translate(-50%, -100%) rotate(${i * 30}deg)`,
                    animation: 'pulse 2s ease-in-out infinite',
                    animationDelay: `${i * 0.1}s`
                  }}
                />
              ))}
            </div>

            {/* 角色卡片 */}
            <div 
              ref={characterCardRef}
              className="relative"
              style={{ perspective: '1000px' }}
            >
              {/* 主卡片 */}
              <div className="relative w-80 h-[500px] rounded-3xl overflow-hidden border-4 border-[#ffd700] shadow-[0_0_80px_rgba(255,215,0,0.6)]">
                <img 
                  src="/images/vip-role.png" 
                  alt="VIP Character"
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).src = result.img; }}
                />
                
                {/* 流光效果 */}
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  style={{
                    animation: 'shineAcross 3s ease-in-out infinite'
                  }}
                />
                
                {/* 底部信息栏 */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[#ffd700] text-xs font-bold tracking-widest">✦ VIP 专属 ✦</p>
                      <h3 className="text-3xl font-black text-white">{result.name}</h3>
                    </div>
                    <div className="text-right">
                      <div className="text-[#ffd700] text-4xl">👑</div>
                    </div>
                  </div>
                </div>
                
                {/* 角标 */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-[#ff6b6b] to-[#ee5a24] text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-bounce">
                  限定
                </div>
              </div>
              
              {/* 装饰框 */}
              <div className="absolute -inset-2 rounded-3xl border-2 border-[#ffd700]/50" />
              <div className="absolute -inset-4 rounded-3xl border border-[#ffd700]/25" />
            </div>

            {/* 文字信息 */}
            <div className="mt-8 text-center">
              <p className="text-[#ffd700] text-lg font-bold tracking-widest animate-pulse">
                🎉 恭喜获得稀有干员！🎉
              </p>
              <p className="text-gray-400 text-sm mt-2">
                已加入您的作战序列
              </p>
            </div>

            {/* 关闭按钮 */}
            <button 
              onClick={onClose}
              className="mt-6 px-10 py-3 bg-gradient-to-r from-[#ffd700] to-[#ffb347] text-black font-bold text-lg rounded-xl transform hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(255,215,0,0.5)]"
            >
              确认招募
            </button>
          </div>
        )}

        {/* Golden glow effect */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(255,215,0,0.08) 0%, transparent 60%)'
          }}
        />
      </div>
    );
  }

  // Normal Mode
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