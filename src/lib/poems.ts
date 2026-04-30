import poemsData from '@/data/poems.json';
import type { Poem, GradeMeta, DynastyMeta } from '@/types/poem';
import { GRADES, DYNASTIES } from '@/lib/constants';

const poems = poemsData as Poem[];

export function getAllPoems(): Poem[] {
  return poems;
}

export function getPoemById(id: string): Poem | undefined {
  return poems.find((p) => p.id === id);
}

export function getPoemsByGrade(grade: number): Poem[] {
  return poems.filter((p) => p.grade === grade);
}

export function getPoemsByDynasty(dynastyLabel: string): Poem[] {
  return poems.filter((p) => p.dynasty === dynastyLabel);
}

export function getPoemsByType(type: string): Poem[] {
  return poems.filter((p) => p.type === type);
}

export function getGrades(): GradeMeta[] {
  return GRADES.map((g) => {
    const gradePoems = poems.filter((p) => p.grade === g.id);
    return {
      ...g,
      poemCount: gradePoems.length,
      requiredCount: gradePoems.filter((p) => p.isRequired).length,
    };
  });
}

export function getDynasties(): DynastyMeta[] {
  return DYNASTIES.map((d) => ({
    ...d,
    count: poems.filter((p) => p.dynasty === d.label).length,
  })).filter((d) => d.count > 0);
}

export function getStats() {
  return {
    totalPoems: poems.length,
    totalRequired: poems.filter((p) => p.isRequired).length,
    totalGrades: new Set(poems.map((p) => p.grade)).size,
    totalDynasties: new Set(poems.map((p) => p.dynasty)).size,
  };
}
