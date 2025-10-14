import { setupWorker } from 'msw';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);

export function startMockServiceWorker() {
  if (typeof window === 'undefined') return;
  worker.start();
}
