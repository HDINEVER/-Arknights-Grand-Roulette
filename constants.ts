import { BossData } from './types';

// Using the images provided in the user prompt description.
// In a real scenario, ensure these files exist in the public/images/ folder.
// Fallbacks provided for placeholders if images are missing.

export const BOSSES: BossData[] = [
  { id: '3-8', name: '碎骨', img: './images/3-8.jpg', color: '#94a3b8' },
  { id: '6-16', name: '霜星', img: './images/6-16.jpg', color: '#bae6fd' },
  { id: '7-18', name: '爱国者', img: './images/7-18.jpg', color: '#ef4444' },
  { id: 'WD-8', name: '皇帝的利刃', img: './images/WD-8.jpg', color: '#1e293b' },
  { id: 'RS-8', name: '哈洛德', img: './images/RS-8.jpg', color: '#a78bfa' },
  { id: 'BI-8', name: '锏', img: './images/BI-8.jpg', color: '#3b82f6' },
  { id: 'AS-9', name: '祖巴伊达姆', img: './images/AS-9.jpg', color: '#fde047' },
  { id: 'MB-8', name: '杰斯顿', img: './images/MB-8.jpg', color: '#fb923c' },
  { id: 'IS-10', name: '扎罗', img: './images/IS-10.jpg', color: '#fbbf24' },
  { id: 'WR-10', name: '自在', img: './images/WR-10.jpg', color: '#34d399' }
];

// Arknights Theme Colors (Snow Realm)
export const THEME = {
  primary: '#67E8F9', // Ice Cyan
  secondary: '#3B82F6', // Royal Blue
  dark: '#0f172a',
  darkOverlay: 'rgba(15, 23, 42, 0.85)',
  text: '#FFFFFF',
  gray: '#94A3B8'
};