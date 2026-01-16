import type { RESULT_CONTENT } from '@/constants/results';

export interface IContentBody {
  title: string;
  description: string;
}

export type TestResultType = keyof typeof RESULT_CONTENT;
