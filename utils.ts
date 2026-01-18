import { BossData } from './types';

/**
 * 根据概率权重选择一个Boss
 * 如果 Boss 没有设置 probability，则使用均匀分布
 */
export function selectBossByProbability(bosses: BossData[]): { winner: BossData; winnerIndex: number } {
  // 获取所有概率
  const probabilities = bosses.map(boss => boss.probability ?? (1 / bosses.length));
  
  // 计算累积概率
  const cumulativeProbabilities: number[] = [];
  let sum = 0;
  for (const prob of probabilities) {
    sum += prob;
    cumulativeProbabilities.push(sum);
  }
  
  // 生成随机数 [0, 1)
  const random = Math.random();
  
  // 根据累积概率选择获胜者
  for (let i = 0; i < cumulativeProbabilities.length; i++) {
    if (random < cumulativeProbabilities[i]) {
      return { winner: bosses[i], winnerIndex: i };
    }
  }
  
  // 兜底：返回最后一个
  return { winner: bosses[bosses.length - 1], winnerIndex: bosses.length - 1 };
}

/**
 * 根据概率权重生成奖品池（用于TapeMode）
 * 池中的分布近似于定义的概率
 */
export function generateWeightedPool(bosses: BossData[], poolSize: number): BossData[] {
  const pool: BossData[] = [];
  
  for (let i = 0; i < poolSize; i++) {
    const { winner } = selectBossByProbability(bosses);
    pool.push(winner);
  }
  
  return pool;
}
