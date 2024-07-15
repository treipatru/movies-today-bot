import { handlers } from '@/test/msw/handlers.js';
import { setupServer } from 'msw/node';

export const server = setupServer(...handlers);
