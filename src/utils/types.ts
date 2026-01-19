import type { RESULT_CONTENT } from '@/utils/constants';

export interface IContentBody {
  title: string;
  description: string;
}

export interface IOptions {
  difficulty: 'easy' | 'medium' | 'hard';
  mode: 'timed' | 'passage';
}

export interface IResult {
  type: keyof typeof RESULT_CONTENT;
  wpm: number;
  accuracy: number;
  characterCount: {
    correct: number;
    incorrect: number;
  };
}
