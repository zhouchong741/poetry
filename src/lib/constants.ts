import type { GradeMeta, DynastyMeta, PoemType } from '@/types/poem';

export const GRADES: GradeMeta[] = Array.from({ length: 12 }, (_, i) => {
  const num = i + 1;
  const chinese = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];
  const label = num <= 6 ? `小学${chinese[i]}年级` : num <= 9 ? `初中${chinese[i]}年级` : `高中${chinese[i]}年级`;
  return {
    id: num,
    label,
    shortLabel: chinese[i],
    poemCount: 0,
    requiredCount: 0,
  };
});

export const DYNASTIES: DynastyMeta[] = [
  { id: 'xianqin', label: '先秦', count: 0 },
  { id: 'han', label: '两汉', count: 0 },
  { id: 'weijin', label: '魏晋', count: 0 },
  { id: 'nanbeichao', label: '南北朝', count: 0 },
  { id: 'sui', label: '隋代', count: 0 },
  { id: 'tang', label: '唐代', count: 0 },
  { id: 'song', label: '宋代', count: 0 },
  { id: 'yuan', label: '元代', count: 0 },
  { id: 'ming', label: '明代', count: 0 },
  { id: 'qing', label: '清代', count: 0 },
];

export const DYNASTY_LABEL_MAP: Record<string, string> = Object.fromEntries(
  DYNASTIES.map((d) => [d.label, d.id])
);

export const DYNASTY_ID_MAP: Record<string, string> = Object.fromEntries(
  DYNASTIES.map((d) => [d.id, d.label])
);

export const POEM_TYPES: PoemType[] = ['诗', '词', '曲', '古文'];

export const GRADE_COLORS: Record<number, string> = {
  1: 'bg-green-50 border-green-200 hover:border-green-400 dark:bg-green-950/50 dark:border-green-800/40 dark:hover:border-green-600/60',
  2: 'bg-emerald-50 border-emerald-200 hover:border-emerald-400 dark:bg-emerald-950/50 dark:border-emerald-800/40 dark:hover:border-emerald-600/60',
  3: 'bg-teal-50 border-teal-200 hover:border-teal-400 dark:bg-teal-950/50 dark:border-teal-800/40 dark:hover:border-teal-600/60',
  4: 'bg-cyan-50 border-cyan-200 hover:border-cyan-400 dark:bg-cyan-950/50 dark:border-cyan-800/40 dark:hover:border-cyan-600/60',
  5: 'bg-sky-50 border-sky-200 hover:border-sky-400 dark:bg-sky-950/50 dark:border-sky-800/40 dark:hover:border-sky-600/60',
  6: 'bg-blue-50 border-blue-200 hover:border-blue-400 dark:bg-blue-950/50 dark:border-blue-800/40 dark:hover:border-blue-600/60',
  7: 'bg-indigo-50 border-indigo-200 hover:border-indigo-400 dark:bg-indigo-950/50 dark:border-indigo-800/40 dark:hover:border-indigo-600/60',
  8: 'bg-violet-50 border-violet-200 hover:border-violet-400 dark:bg-violet-950/50 dark:border-violet-800/40 dark:hover:border-violet-600/60',
  9: 'bg-purple-50 border-purple-200 hover:border-purple-400 dark:bg-purple-950/50 dark:border-purple-800/40 dark:hover:border-purple-600/60',
  10: 'bg-fuchsia-50 border-fuchsia-200 hover:border-fuchsia-400 dark:bg-fuchsia-950/50 dark:border-fuchsia-800/40 dark:hover:border-fuchsia-600/60',
  11: 'bg-pink-50 border-pink-200 hover:border-pink-400 dark:bg-pink-950/50 dark:border-pink-800/40 dark:hover:border-pink-600/60',
  12: 'bg-rose-50 border-rose-200 hover:border-rose-400 dark:bg-rose-950/50 dark:border-rose-800/40 dark:hover:border-rose-600/60',
};

export const SITE_TITLE = '古诗文学习';
export const SITE_DESCRIPTION = '中国中小学生必备古诗文学习平台，覆盖一至高三部编版必背古诗文。';
