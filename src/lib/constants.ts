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
  1: 'bg-green-50 border-green-200 hover:border-green-400',
  2: 'bg-emerald-50 border-emerald-200 hover:border-emerald-400',
  3: 'bg-teal-50 border-teal-200 hover:border-teal-400',
  4: 'bg-cyan-50 border-cyan-200 hover:border-cyan-400',
  5: 'bg-sky-50 border-sky-200 hover:border-sky-400',
  6: 'bg-blue-50 border-blue-200 hover:border-blue-400',
  7: 'bg-indigo-50 border-indigo-200 hover:border-indigo-400',
  8: 'bg-violet-50 border-violet-200 hover:border-violet-400',
  9: 'bg-purple-50 border-purple-200 hover:border-purple-400',
  10: 'bg-fuchsia-50 border-fuchsia-200 hover:border-fuchsia-400',
  11: 'bg-pink-50 border-pink-200 hover:border-pink-400',
  12: 'bg-rose-50 border-rose-200 hover:border-rose-400',
};

export const SITE_TITLE = '古诗文学习';
export const SITE_DESCRIPTION = '中国中小学生必备古诗文学习平台，覆盖一至高三部编版必背古诗文。';
