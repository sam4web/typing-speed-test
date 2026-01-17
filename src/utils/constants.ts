import type { IContentBody } from './types';

export const RESULT_CONTENT = {
  COMPLETED: {
    title: 'Test Complete!',
    description: 'Solid run. Keep pushing to beat your high score.',
  },
  FIRST_TEST: {
    title: 'Baseline Established!',
    description: 'You’ve set the bar. Now the real challenge begins—time to beat it.',
  },
  HIGH_SCORE: {
    title: 'High Score Smashed!',
    description: 'You’re getting faster. That was incredible typing.',
  },
} as const satisfies Record<string, IContentBody>;
