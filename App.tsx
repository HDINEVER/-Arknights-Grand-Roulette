import React, { useState } from 'react';
import { BOSSES, THEME } from './constants';
import { BossData, LotteryMode } from './types';
import { WheelMode } from './components/WheelMode';
import { TapeMode } from './components/TapeMode';
import { ResultModal } from './components/ResultModal';
import { AKButton, AKCard, SectionHeader } from './components/UIComponents';

const App: React.FC = () => {
  const [mode, setMode] = useState<LotteryMode>(LotteryMode.WHEEL);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<BossData | null>(null);
  const [resetTrigger, setResetTrigger] = useState(0);
  const [isVipMode, setIsVipMode] = useState(false);

  // Handlers
  const handleStart = () => {
    if (isSpinning) return;
    setResult(null);
    setIsVipMode(false); // 普通左键点击，非VIP模式
    setIsSpinning(true);
  };

  // 中键点击触发VIP模式
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isSpinning) return;
    // 中键点击 (button === 1)
    if (e.button === 1) {
      e.preventDefault();
      setResult(null);
      setIsVipMode(true);
      setIsSpinning(true);
    }
  };

  const handleReset = () => {
    if (isSpinning) return;
    setResult(null);
    setIsSpinning(false);
    setIsVipMode(false);
    setResetTrigger(prev => prev + 1);
  };

  const handleComplete = (boss: BossData) => {
    // Add a small delay before showing result for dramatic effect
    setTimeout(() => {
      setResult(boss);
    }, 500);
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col ak-bg-grid">
      {/* Background Image Layer */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 blur-[2px]"
        style={{ backgroundImage: 'url(./background.jpg)' }}
      />
      {/* Soft overlay for light theme */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/60 via-[#f0f7ff]/40 to-white/70" />
      
      {/* Content Layer */}
      <main className="relative z-10 container mx-auto px-4 py-8 flex-grow flex flex-col items-center">
        
        {/* Header */}
        <header className="w-full flex justify-between items-center mb-10 border-b border-[#4a6a9a]/20 pb-4">
          <div className="flex flex-col">
            <h1 className="text-4xl font-black italic tracking-tighter text-[#2a3f5f]">
              罗德岛
            </h1>
            <span className="text-[#4a6a9a] text-xs tracking-[0.3em] font-bold">
              后勤与寻访部
            </span>
          </div>
          
          <div className="flex gap-4">
            <AKButton 
              variant={mode === LotteryMode.WHEEL ? 'primary' : 'outline'} 
              onClick={() => { if(!isSpinning) setMode(LotteryMode.WHEEL) }}
              disabled={isSpinning}
            >
              转盘寻访
            </AKButton>
            <AKButton 
              variant={mode === LotteryMode.TAPE ? 'primary' : 'outline'}
              onClick={() => { if(!isSpinning) setMode(LotteryMode.TAPE) }}
              disabled={isSpinning}
            >
              战术补给
            </AKButton>
          </div>
        </header>

        {/* Main Lottery Area */}
        <div className="flex-grow flex flex-col items-center justify-center w-full max-w-6xl">
           <SectionHeader 
             title={isVipMode ? "👑 VIP 寻访" : (mode === LotteryMode.WHEEL ? "标准寻访" : "战术补给")} 
             subtitle={isVipMode ? "尊贵博士专属通道" : "等待指令授权"}
             isVip={isVipMode}
           />

           <div className="w-full min-h-[400px] flex items-center justify-center mb-12">
             {mode === LotteryMode.WHEEL ? (
               <WheelMode 
                 bosses={BOSSES} 
                 onComplete={handleComplete} 
                 isSpinning={isSpinning}
                 setIsSpinning={setIsSpinning}
                 resetTrigger={resetTrigger}
               />
             ) : (
               <TapeMode 
                 bosses={BOSSES} 
                 onComplete={handleComplete} 
                 isSpinning={isSpinning}
                 setIsSpinning={setIsSpinning}
                 resetTrigger={resetTrigger}
               />
             )}
           </div>

           {/* Controls Panel - Centered Main Button */}
           <AKCard className="w-full max-w-2xl flex flex-col items-center justify-center gap-6 py-8">
              {/* Status Display */}
              <div className="flex flex-col items-center">
                <span className="text-[#64748b] text-xs uppercase tracking-widest mb-1">系统状态</span>
                <span className={`text-2xl font-bold uppercase ${isSpinning ? 'text-[#4a6a9a] animate-pulse' : 'text-[#2a3f5f]'}`}>
                  {isSpinning ? '进行中...' : '就绪'}
                </span>
              </div>

              {/* Main Action Button - Prominent and Centered */}
              <button 
                onClick={handleStart}
                onMouseDown={handleMouseDown}
                disabled={isSpinning}
                className={`min-w-[280px] py-5 text-2xl font-black tracking-wider transform hover:scale-105 active:scale-95 transition-all duration-300 relative overflow-hidden
                  ${isVipMode 
                    ? 'vip-golden-btn rounded-2xl' 
                    : 'bg-[#4a6a9a] text-white hover:bg-[#5a7aaa] shadow-[0_0_30px_rgba(74,106,154,0.4)] hover:shadow-[0_0_40px_rgba(74,106,154,0.6)] clip-path-slant'
                  }
                  disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isSpinning 
                  ? (isVipMode ? '👑 VIP连接中...' : '连接中...') 
                  : (isVipMode ? '👑 VIP 开始寻访' : '⚡ 开始寻访')
                }
              </button>
           </AKCard>
        </div>

        {/* Footer with Reset Button */}
        <footer className="w-full mt-12 text-center border-t border-[#4a6a9a]/15 pt-6">
          {/* Subtle Reset Button */}
          <button
            onClick={handleReset}
            disabled={isSpinning}
            className="text-[#94a3b8] text-xs uppercase tracking-widest hover:text-[#4a6a9a] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
          >
            [ 重置系统 ]
          </button>
          <p className="text-[#64748b] text-xs uppercase tracking-widest">© 2024 罗德岛神经网络。仅限授权人员。</p>
        </footer>
      </main>

      {/* Decorations */}
      <div className="fixed top-20 left-10 w-[1px] h-64 bg-gradient-to-b from-transparent via-[#4a6a9a]/25 to-transparent" />
      <div className="fixed bottom-20 right-10 w-[1px] h-64 bg-gradient-to-b from-transparent via-[#7ab3d9]/30 to-transparent" />

      {/* Result Overlay */}
      <ResultModal result={result} onClose={handleReset} isVip={isVipMode} />
    </div>
  );
};

export default App;