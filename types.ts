export interface BossData {
  id: string;
  name: string;
  img: string; // URL path to image
  color: string; // Theme color for the boss
  probability?: number; // Optional custom probability (0-1), if not set will be evenly distributed
}

export enum LotteryMode {
  WHEEL = 'WHEEL',
  TAPE = 'TAPE', // CS:GO style
}

export interface LotteryProps {
  bosses: BossData[];
  onComplete: (boss: BossData) => void;
  isSpinning: boolean;
  setIsSpinning: (spinning: boolean) => void;
  resetTrigger: number;
}