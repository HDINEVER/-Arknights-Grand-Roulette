import { BossData } from './types';

// 明日方舟Boss头像 - SKZ奖池专用
// 稀有大奖概率: 全套蚀刻章 3.5%, 全套蚀刻章+全套色纸立牌 3.5%, 大白兔奶糖 2%
// 剩余8个奖品平分 91% (各约 11.375%)
export const BOSSES: BossData[] = [
  // 稀有大奖 - 固定低概率
  { id: '1', name: '全套蚀刻章', img: '/skz-pool/全套蚀刻章.jpg', color: '#ffd700', probability: 0.035 },
  { id: '4', name: '全套蚀刻章+全套色纸立牌', img: '/skz-pool/全套蚀刻章+全套色纸立牌.jpg', color: '#a855f7', probability: 0.035 },
  { id: '0', name: '大白兔奶糖', img: '/skz-pool/大白兔奶糖.jpg', color: '#ff1493', probability: 0.02 },
  // 普通奖品 - 平分剩余概率 (91% / 8 ≈ 11.375%)
  { id: '2', name: '全套色纸', img: '/skz-pool/全套色纸.jpg', color: '#ff6b6b', probability: 0.11375 },
  { id: '3', name: '3个大号蚀刻章', img: '/skz-pool/3个大号蚀刻章.jpg', color: '#4ecdc4', probability: 0.11375 },
  { id: '5', name: '大号工程版活动蚀刻章', img: '/skz-pool/大号工程版活动蚀刻章.jpg', color: '#94a3b8', probability: 0.11375 },
  { id: '6', name: '限定三号透明蚀刻章', img: '/skz-pool/限定三号透明蚀刻章.jpg', color: '#bae6fd', probability: 0.11375 },
  { id: '7', name: '限定8号透明蚀刻章', img: '/skz-pool/限定8号透明蚀刻章.jpg', color: '#ef4444', probability: 0.11375 },
  { id: '8', name: '再自选2个普通蚀刻章', img: '/skz-pool/再自选2个普通蚀刻章.jpg', color: '#a78bfa', probability: 0.11375 },
  { id: '9', name: '龙门蚀刻章+如我所见蚀刻章', img: '/skz-pool/龙门蚀刻章+如我所见蚀刻章.jpg', color: '#3b82f6', probability: 0.11375 },
  { id: '10', name: '一个普通蚀刻章自选+再抽一次', img: '/skz-pool/一个普通蚀刻章自选+再抽一次.jpg', color: '#fde047', probability: 0.11375 }
];

// Arknights Theme Colors (Light Theme)
export const THEME = {
  primary: '#4a6a9a', // 主色调蓝灰
  secondary: '#7ab3d9', // 柔和浅蓝
  accent: '#a8d4f0', // 淡蓝色
  dark: '#2a3f5f', // 深蓝灰（用于文字）
  darkOverlay: 'rgba(255, 255, 255, 0.85)',
  text: '#1e293b',
  gray: '#64748b'
};