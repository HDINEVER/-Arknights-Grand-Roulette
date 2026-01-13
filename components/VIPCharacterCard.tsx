import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface VIPCharacterCardProps {
  onClose: () => void;
}

// VIP角色图片池
const VIP_IMAGES = [
  '/images/vip-role一阶段.png',
  '/images/vip-role二阶段.png',
  '/images/vip-role三阶段.png'
];

export const VIPCharacterCard: React.FC<VIPCharacterCardProps> = ({ onClose }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [selectedImage] = useState(() => VIP_IMAGES[Math.floor(Math.random() * VIP_IMAGES.length)]);

  useEffect(() => {
    // 播放语音
    if (audioRef.current) {
      audioRef.current.volume = 0.7;
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.log('Audio play failed:', e));
    }

    // 入场动画
    if (containerRef.current && cardRef.current) {
      const tl = gsap.timeline();
      
      // 背景淡入
      tl.fromTo(containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 }
      );

      // 卡片从中心爆发出现
      tl.fromTo(cardRef.current,
        { 
          scale: 0.1, 
          opacity: 0, 
          rotateY: 180,
          filter: 'brightness(5) blur(30px)'
        },
        { 
          scale: 1, 
          opacity: 1, 
          rotateY: 0,
          filter: 'brightness(1) blur(0px)',
          duration: 1.5, 
          ease: "elastic.out(1, 0.6)" 
        },
        "-=0.3"
      );

      // 持续发光脉冲
      tl.to(cardRef.current, {
        boxShadow: '0 0 100px rgba(255, 215, 0, 1), 0 0 200px rgba(255, 179, 71, 0.8)',
        duration: 0.8,
        yoyo: true,
        repeat: 2,
        ease: "power2.inOut"
      });
    }
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[60] flex items-center justify-center overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, rgba(20,10,30,0.98) 0%, rgba(5,0,15,0.99) 100%)'
      }}
    >
      {/* 语音播放器 */}
      <audio ref={audioRef} src="/images/作战中4.wav" preload="auto" />
      
      {/* 样式定义 */}
      <style>{`
        @keyframes card-float {
          0%, 100% {
            transform: rotateY(0deg) rotateX(0deg) translateZ(0px);
          }
          25% {
            transform: rotateY(3deg) rotateX(2deg) translateZ(10px);
          }
          50% {
            transform: rotateY(-2deg) rotateX(-1deg) translateZ(15px);
          }
          75% {
            transform: rotateY(2deg) rotateX(1deg) translateZ(8px);
          }
        }

        @keyframes shine-sweep {
          0% { 
            left: -150%;
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          85% {
            opacity: 1;
          }
          100% { 
            left: 150%;
            opacity: 0;
          }
        }

        @keyframes glow-pulse {
          0%, 100% { 
            box-shadow: 0 0 60px rgba(255, 215, 0, 0.5), 0 0 120px rgba(255, 179, 71, 0.3);
          }
          50% { 
            box-shadow: 0 0 100px rgba(255, 215, 0, 0.8), 0 0 200px rgba(255, 179, 71, 0.6);
          }
        }

        @keyframes particle-rise {
          0% {
            transform: translateY(100%) scale(0);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) scale(1.2);
            opacity: 0;
          }
        }

        @keyframes ray-pulse {
          0%, 100% {
            opacity: 0.2;
            transform: scaleY(0.8);
          }
          50% {
            opacity: 0.5;
            transform: scaleY(1.2);
          }
        }

        .vip-full-card {
          perspective: 2000px;
          transform-style: preserve-3d;
        }

        .vip-card-inner {
          animation: card-float 10s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite,
                     glow-pulse 4s ease-in-out infinite;
        }

        .shine-layer {
          position: absolute;
          top: -50%;
          left: -150%;
          width: 80%;
          height: 200%;
          background: linear-gradient(
            105deg, 
            rgba(255,255,255,0) 0%,
            rgba(255,255,255,0) 35%,
            rgba(255,255,255,0.05) 40%,
            rgba(255,255,255,0.2) 45%,
            rgba(255,255,255,0.4) 50%, 
            rgba(255,255,255,0.2) 55%,
            rgba(255,255,255,0.05) 60%,
            rgba(255,255,255,0) 65%,
            rgba(255,255,255,0) 100%
          );
          transform: skewX(-25deg);
          animation: shine-sweep 6s ease-in-out infinite;
          pointer-events: none;
        }
      `}</style>

      {/* 背景光芒射线 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 w-1 origin-bottom"
            style={{
              height: '120vh',
              background: 'linear-gradient(to top, rgba(255,215,0,0.3) 0%, rgba(255,215,0,0.05) 40%, transparent 70%)',
              transform: `translate(-50%, -100%) rotate(${i * 18}deg)`,
              animation: 'ray-pulse 4s ease-in-out infinite',
              animationDelay: `${i * 0.2}s`
            }}
          />
        ))}
      </div>

      {/* 金色粒子效果 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(60)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${3 + Math.random() * 6}px`,
              height: `${3 + Math.random() * 6}px`,
              left: `${Math.random() * 100}%`,
              bottom: '-5%',
              background: `radial-gradient(circle, ${Math.random() > 0.5 ? '#ffd700' : '#ffb347'}, transparent)`,
              boxShadow: `0 0 ${8 + Math.random() * 12}px ${Math.random() > 0.5 ? '#ffd700' : '#ff8c00'}`,
              animation: `particle-rise ${4 + Math.random() * 4}s ease-out infinite`,
              animationDelay: `${Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* 全屏卡片容器 */}
      <div className="vip-full-card w-full h-full flex items-center justify-center p-8">
        <div 
          ref={cardRef}
          className="vip-card-inner relative w-full max-w-[1400px] h-[85vh] rounded-[32px] overflow-hidden border-4 border-[#ffd700]"
          style={{
            background: 'linear-gradient(145deg, #1a1a2e 0%, #0d0d1a 100%)'
          }}
        >
          {/* 角色立绘作为全屏背景 */}
          <div className="absolute inset-0">
            <img 
              src={selectedImage}
              alt="VIP Character"
              className="absolute h-full w-auto max-w-none object-contain"
              style={{
                left: '0',
                bottom: '0',
                transform: 'translateX(-5%)',
                filter: 'drop-shadow(0 0 50px rgba(255, 215, 0, 0.4))',
                maxHeight: '110%'
              }}
              onError={(e) => { 
                (e.target as HTMLImageElement).src = '/images/vip-role头像.png'; 
              }}
            />
            {/* 右侧渐变遮罩 - 用于放置文字 */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0d0d1a]/95" 
                 style={{ left: '40%' }} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d1a]/80 via-transparent to-[#0d0d1a]/60" />
          </div>

          {/* 流光效果层 */}
          <div className="shine-layer absolute inset-0 pointer-events-none" />

          {/* VIP徽章 - 左上角 */}
          <div className="absolute top-6 left-6 z-20">
            <div className="bg-gradient-to-r from-[#ffd700] via-[#ffea00] to-[#ffd700] text-black px-5 py-2 rounded-full text-sm font-black shadow-[0_0_25px_rgba(255,215,0,0.7)] flex items-center gap-2">
              <span>👑</span>
              <span>VIP 限定</span>
            </div>
          </div>

          {/* 右侧信息区域 */}
          <div className="absolute right-0 top-0 bottom-0 w-[45%] flex flex-col justify-center p-12 z-10">
            {/* 头像和名字 */}
            <div className="flex items-center gap-6 mb-8">
              <img 
                src="/images/vip-role头像.png"
                alt="VIP Avatar"
                className="w-28 h-28 rounded-full border-4 border-[#ffd700] shadow-[0_0_40px_rgba(255,215,0,0.6)] object-cover"
                onError={(e) => { 
                  (e.target as HTMLImageElement).style.display = 'none'; 
                }}
              />
              <div>
                <h1 className="text-6xl font-black text-white mb-2 drop-shadow-[0_0_30px_rgba(255,215,0,0.6)]">
                  维什戴尔
                </h1>
                <p className="text-[#ffd700] text-2xl font-bold tracking-[0.4em]">Wiš'adel</p>
              </div>
            </div>

            {/* 分隔线 */}
            <div className="w-full h-[3px] bg-gradient-to-r from-[#ffd700] via-[#ffd700]/60 to-transparent mb-8" />

            {/* 信息文字 */}
            <div className="space-y-5 mb-10">
              <div className="flex items-center gap-4">
                <span className="text-[#ffd700] text-3xl">👑</span>
                <p className="text-white text-xl">
                  <span className="text-[#ffd700] font-bold">尊贵的VIP博士</span>，您已获得专属干员！
                </p>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed">
                她是来自萨卡兹的神秘使者，拥有强大的源石技艺。
                作为VIP专属福利，她将永远守护您的作战序列。
              </p>
              <div className="flex items-center gap-3 text-[#ffb347] text-base pt-2">
                <span>✦</span>
                <span className="font-bold">六星干员</span>
                <span className="text-[#ffd700]/50">•</span>
                <span className="font-bold">狙击手</span>
                <span className="text-[#ffd700]/50">•</span>
                <span className="font-bold">VIP限定</span>
                <span>✦</span>
              </div>
            </div>

            {/* 确认按钮 */}
            <button 
              onClick={onClose}
              className="w-full max-w-md py-5 bg-gradient-to-r from-[#ffd700] via-[#ffea00] to-[#ffd700] text-black font-black text-2xl rounded-2xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_0_50px_rgba(255,215,0,0.5)] hover:shadow-[0_0_70px_rgba(255,215,0,0.8)]"
            >
              ✨ 确认招募 ✨
            </button>
          </div>

          {/* 左下角罗德岛标识 */}
          <div className="absolute bottom-6 left-6 z-20">
            <div className="text-[#ffd700] text-sm font-bold tracking-[0.2em] mb-1">✦ RHODES ISLAND ✦</div>
            <div className="text-white/60 text-xs tracking-widest">VIP EXCLUSIVE OPERATOR</div>
          </div>

          {/* 边框装饰 */}
          <div className="absolute -inset-2 rounded-[36px] border-2 border-[#ffd700]/30 pointer-events-none" />
          <div className="absolute -inset-4 rounded-[40px] border border-[#ffd700]/15 pointer-events-none" />
        </div>
      </div>

      {/* 四角装饰 */}
      <div className="absolute top-4 left-4 w-20 h-20 border-t-4 border-l-4 border-[#ffd700]/40 rounded-tl-lg" />
      <div className="absolute top-4 right-4 w-20 h-20 border-t-4 border-r-4 border-[#ffd700]/40 rounded-tr-lg" />
      <div className="absolute bottom-4 left-4 w-20 h-20 border-b-4 border-l-4 border-[#ffd700]/40 rounded-bl-lg" />
      <div className="absolute bottom-4 right-4 w-20 h-20 border-b-4 border-r-4 border-[#ffd700]/40 rounded-br-lg" />
    </div>
  );
};
