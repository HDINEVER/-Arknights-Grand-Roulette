import { BossData } from './types';

// 明日方舟Boss头像 - 使用本地public目录图片
export const BOSSES: BossData[] = [
  { id: '3-8', name: '碎骨', img: '/3-8.jpg', color: '#94a3b8' },
  { id: '6-16', name: '霜星', img: '/6-16.jpg', color: '#bae6fd' },
  { id: '7-18', name: '爱国者', img: '/7-18.jpg', color: '#ef4444' },
  { id: 'WD-8', name: '皇帝的利刃', img: '/WD-8.jpg', color: '#1e293b' },
  { id: 'RS-8', name: '哈洛德', img: '/RS-8.jpg', color: '#a78bfa' },
<<<<<<< HEAD
  { id: 'BI-8', name: '数值仙人快速通关', img: '/BI-8.jpg', color: '#3b82f6' },
=======
  { id: 'BI-8', name: '锏', img: '/BI-8.jpg', color: '#3b82f6' },
>>>>>>> a3db497669fe7e2811ed52c486a1af46411d495d
  { id: 'AS-9', name: '祖巴伊达姆', img: '/AS-9.jpg', color: '#fde047' },
  { id: 'MB-8', name: '杰斯顿', img: '/MB-8.jpg', color: '#fb923c' },
  { id: 'IS-10', name: '扎罗', img: '/IS-10.jpg', color: '#fbbf24' },
  { id: 'WR-10', name: '自在', img: '/WR-10.jpg', color: '#34d399' }
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