import { BossData } from './types';

// 明日方舟Boss头像 - SKZ奖池专用
export const BOSSES: BossData[] = [
  { id: '3-8', name: '大号工程版活动蚀刻章', img: '/skz-pool/3-8.jpg', color: '#94a3b8' },
  { id: '6-16', name: '限定三号透明蚀刻章', img: '/skz-pool/6-16.jpg', color: '#bae6fd' },
  { id: '7-18', name: '限定8号透明蚀刻章', img: '/skz-pool/7-18.jpg', color: '#ef4444' },
  { id: 'WD-8', name: '额外两个吧唧自选', img: '/skz-pool/WD-8.jpg', color: '#1e293b' },
  { id: 'RS-8', name: '再自选2个普通蚀刻章', img: '/skz-pool/RS-8.jpg', color: '#a78bfa' },
  { id: 'BI-8', name: '龙门蚀刻章+如我所见蚀刻章', img: '/skz-pool/BI-8.jpg', color: '#3b82f6' },
  { id: 'AS-9', name: '一个普通蚀刻章自选+再抽一次', img: '/skz-pool/AS-9.jpg', color: '#fde047' },
  { id: 'MB-8', name: '紫外线手电筒+普通蚀刻章或吧唧', img: '/skz-pool/MB-8.jpg', color: '#fb923c' }
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