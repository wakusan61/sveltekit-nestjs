import type { PageServerLoad } from './$types';
import type { Todo } from '$lib/todo';
import { apiClient } from '$lib/api-client';
import type { ZodiosResponseByAlias } from '@zodios/core';
import type { z } from 'zod';
import type { schemas } from '$lib/generated-client';

type PageData = z.infer<typeof schemas.GetAllResponseDTO>;

export const load: PageServerLoad = async (): Promise<PageData> => {
	// TODO:エラーハンドリングが適当なので要リファクタ
	try {
		return await apiClient.TodoController_getAll();
	} catch (error) {
		console.error(error);
		throw new Error('リクエストでエラーが発生しました。');
	}
};
