import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

// zod 日本語化対応
import i18next from 'i18next';
import { zodI18nMap } from 'zod-i18n-map';
// Import your language translation files
import translation from 'zod-i18n-map/locales/ja/zod.json';

// lng and resources key depend on your locale.
i18next.init({
	lng: 'ja',
	resources: {
		ja: { zod: translation }
	}
});
z.setErrorMap(zodI18nMap);

const GetAllResponseDTO = z
	.object({
		todos: z.array(
			z
				.object({
					no: z.number(),
					title: z.string().min(1).max(20),
					detail: z.string().max(100).optional(),
					category: z.union([z.literal('仕事'), z.literal('プライベート'), z.literal('その他')])
				})
				.passthrough()
		)
	})
	.passthrough();
const GetResponseDTO = z
	.object({
		no: z.number(),
		title: z.string().min(1).max(20),
		detail: z.string().max(100).optional(),
		category: z.union([z.literal('仕事'), z.literal('プライベート'), z.literal('その他')])
	})
	.passthrough();
const AddRequestDTO = z
	.object({
		title: z.string().min(1).max(20),
		detail: z.string().max(100).optional(),
		category: z.union([z.literal('仕事'), z.literal('プライベート'), z.literal('その他')])
	})
	.passthrough();
const UpdateRequestDTO = z
	.object({
		no: z.number(),
		title: z.string().min(1).max(20),
		detail: z.string().max(100).optional(),
		category: z.union([z.literal('仕事'), z.literal('プライベート'), z.literal('その他')])
	})
	.passthrough();

export const schemas = {
	GetAllResponseDTO,
	GetResponseDTO,
	AddRequestDTO,
	UpdateRequestDTO
};

const endpoints = makeApi([
	{
		method: 'get',
		path: '/todo/:no',
		alias: 'TodoController_get',
		requestFormat: 'json',
		parameters: [
			{
				name: 'no',
				type: 'Path',
				schema: z.number()
			}
		],
		response: GetResponseDTO
	},
	{
		method: 'post',
		path: '/todo/add',
		alias: 'TodoController_add',
		requestFormat: 'json',
		parameters: [
			{
				name: 'body',
				type: 'Body',
				schema: AddRequestDTO
			}
		],
		response: z.void()
	},
	{
		method: 'get',
		path: '/todo/all',
		alias: 'TodoController_getAll',
		requestFormat: 'json',
		response: GetAllResponseDTO
	},
	{
		method: 'post',
		path: '/todo/remove/:no',
		alias: 'TodoController_remove',
		requestFormat: 'json',
		parameters: [
			{
				name: 'no',
				type: 'Path',
				schema: z.number()
			}
		],
		response: z.void()
	},
	{
		method: 'post',
		path: '/todo/update',
		alias: 'TodoController_update',
		requestFormat: 'json',
		parameters: [
			{
				name: 'body',
				type: 'Body',
				schema: UpdateRequestDTO
			}
		],
		response: z.void()
	}
]);

export const api = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
	return new Zodios(baseUrl, endpoints, options);
}
