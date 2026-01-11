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

  // Handlers
  const handleStart = () => {
    if (isSpinning) return;
    setResult(null);
    setIsSpinning(true);
  };

  const handleReset = () => {
    if (isSpinning) return;
    setResult(null);
    setIsSpinning(false);
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
      {/* Dark Overlay Gradient - Updated to darker slate/blue for Snow Realm feel */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0f172a]/90 via-[#0f172a]/70 to-[#0f172a] opacity-90" />
      
      {/* Content Layer */}
      <main className="relative z-10 container mx-auto px-4 py-8 flex-grow flex flex-col items-center">
        
        {/* Header */}
        <header className="w-full flex justify-between items-center mb-10 border-b border-[#67E8F9]/20 pb-4">
          <div className="flex flex-col">
            <h1 className="text-4xl font-black italic tracking-tighter text-white">
              罗德岛
            </h1>
            <span className="text-[#67E8F9] text-xs tracking-[0.3em] font-bold">
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
             title={mode === LotteryMode.WHEEL ? "标准寻访" : "战术补给"} 
             subtitle="等待指令授权"
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

           {/* Controls Panel */}
           <AKCard className="w-full max-w-2xl flex flex-col md:flex-row items-center justify-center gap-6">
              <div className="flex flex-col items-start flex-1">
                <span className="text-gray-400 text-xs uppercase tracking-widest mb-1">系统状态</span>
                <span className={`text-2xl font-bold uppercase ${isSpinning ? 'text-[#67E8F9] animate-pulse' : 'text-white'}`}>
                  {isSpinning ? '进行中...' : '就绪'}
                </span>
              </div>

              <div className="flex gap-4 w-full md:w-auto">
                 <AKButton 
                   onClick={handleReset} 
                   variant="secondary"
                   disabled={isSpinning}
                 >
                   重置系统
                 </AKButton>
                 
                 <AKButton 
                   onClick={handleStart} 
                   variant="primary" 
                   className="min-w-[200px] py-4 text-xl"
                   disabled={isSpinning}
                 >
                   {isSpinning ? '连接中...' : '开始寻访'}
                 </AKButton>
              </div>
           </AKCard>
        </div>

        {/* Footer */}
        <footer className="w-full mt-12 text-center text-slate-500 text-xs uppercase tracking-widest border-t border-[#67E8F9]/10 pt-6">
          <p>© 2024 罗德岛神经网络。仅限授权人员。</p>
        </footer>
      </main>

      {/* Decorations */}
      <div className="fixed top-20 left-10 w-[1px] h-64 bg-gradient-to-b from-transparent via-[#67E8F9]/30 to-transparent" />
      <div className="fixed bottom-20 right-10 w-[1px] h-64 bg-gradient-to-b from-transparent via-[#67E8F9]/30 to-transparent" />

      {/* Result Overlay */}
      <ResultModal result={result} onClose={handleReset} />
    </div>
  );
};

export default App;