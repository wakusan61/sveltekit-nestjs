import { createApiClient } from './generated-client';

/**
 * TODO:dotenvに切り替える。
 */
const DOMAIN = 'http://localhost:3000';

export const apiClient = createApiClient(DOMAIN);
