import { createRequestURL } from '$lib/define';
import { apiClient } from '$lib/api-client';
import type { PageServerLoad } from './$types';
import { schemas } from '$lib/generated-client';
import type { z } from 'zod';

type PageData = {
	todo: z.infer<typeof schemas.GetResponseDTO>;
};

export const load: PageServerLoad = async (serverLoad): Promise<PageData> => {
	try {
		const result = await apiClient.TodoController_get({
			params: {
				// TODO: params/number.ts で number を保証しているが string になるためやむなく numberに変換
				no: Number(serverLoad.params.no)
			}
		});
		return { todo: result };
	} catch (error) {
		console.error(error);
		throw new Error('リクエストでエラーが発生しました。');
	}
};
