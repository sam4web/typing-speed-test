import type { RESULT_CONTENT } from '@/utils/constants';

export interface IContentBody {
  title: string;
  description: string;
}

export type TestResultType = keyof typeof RESULT_CONTENT;
