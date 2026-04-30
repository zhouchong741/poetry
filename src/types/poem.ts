export type PoemType = '诗' | '词' | '曲' | '古文';

export interface Annotation {
  term: string;
  explanation: string;
}

export interface Poem {
  id: string;
  title: string;
  author: string;
  dynasty: string;
  type: PoemType;
  grade: number;
  semester: number;
  unit?: string;
  text: string[];
  annotations: Annotation[];
  translation: string;
  background?: string;
  appreciation?: string;
  isRequired: boolean;
  keywords?: string[];
  image?: string;
}

export interface GradeMeta {
  id: number;
  label: string;
  shortLabel: string;
  poemCount: number;
  requiredCount: number;
}

export interface DynastyMeta {
  id: string;
  label: string;
  count: number;
}
