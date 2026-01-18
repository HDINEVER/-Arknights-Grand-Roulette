import { BossData } from './types';

// 明日方舟Boss头像 - SKZ奖池专用
// 大赏概率: 大白兔奶糖 2%
// 大奖概率: 全套蚀刻章 8%, 全套色纸 10%, 3个大号蚀刻章 8%, 全套蚀刻章+全套色纸立牌 5%
// 剩余6个奖品平分 67% (各约 11.17%)
export const BOSSES: BossData[] = [
  // 大赏 - 稀有概率
  { id: '0', name: '大白兔奶糖', img: '/skz-pool/大白兔奶糖.jpg', color: '#ff1493', probability: 0.02 },
  // 大奖 - 固定概率
  { id: '1', name: '全套蚀刻章', img: '/skz-pool/全套蚀刻章.jpg', color: '#ffd700', probability: 0.08 },
  { id: '2', name: '全套色纸', img: '/skz-pool/全套色纸.jpg', color: '#ff6b6b', probability: 0.10 },
  { id: '3', name: '3个大号蚀刻章', img: '/skz-pool/3个大号蚀刻章.jpg', color: '#4ecdc4', probability: 0.08 },
  { id: '4', name: '全套蚀刻章+全套色纸立牌', img: '/skz-pool/全套蚀刻章+全套色纸立牌.jpg', color: '#a855f7', probability: 0.05 },
  // 普通奖品 - 平分剩余概率 (67% / 6 ≈ 11.17%)
  { id: '5', name: '大号工程版活动蚀刻章', img: '/skz-pool/大号工程版活动蚀刻章.jpg', color: '#94a3b8', probability: 0.1117 },
  { id: '6', name: '限定三号透明蚀刻章', img: '/skz-pool/限定三号透明蚀刻章.jpg', color: '#bae6fd', probability: 0.1117 },
  { id: '7', name: '限定8号透明蚀刻章', img: '/skz-pool/限定8号透明蚀刻章.jpg', color: '#ef4444', probability: 0.1117 },
  { id: '8', name: '再自选2个普通蚀刻章', img: '/skz-pool/再自选2个普通蚀刻章.jpg', color: '#a78bfa', probability: 0.1117 },
  { id: '9', name: '龙门蚀刻章+如我所见蚀刻章', img: '/skz-pool/龙门蚀刻章+如我所见蚀刻章.jpg', color: '#3b82f6', probability: 0.1117 },
  { id: '10', name: '一个普通蚀刻章自选+再抽一次', img: '/skz-pool/一个普通蚀刻章自选+再抽一次.jpg', color: '#fde047', probability: 0.1115 }
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