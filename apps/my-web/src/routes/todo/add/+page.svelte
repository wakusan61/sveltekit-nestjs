<script lang="ts">
	import { apiClient } from '$lib/api-client';
	import { Categories } from '$lib/todo';
	import { createForm } from 'felte';
	import { schemas } from '$lib/generated-client';
	import type { ZodError, z } from 'zod';
	import { validator } from '@felte/validator-zod';
	// TODO:リクエストエラーは要見直し
	let requestError = {
		isError: false,
		object: {},
		messages: new Array<String>(),
		reset: () => {
			requestError.isError = false;
			requestError.object = {};
			requestError.messages = [];
		},
		set: (error: ZodError | Error | undefined) => {
			if (!error) {
				requestError.isError = false;
				return;
			}

			// ZodError
			if ('issues' in error) {
				requestError.isError = true;
				requestError.object = error;
				requestError.messages = error.errors.map((v) => v.message);

				return;
			}

			// 通常のエラー
			requestError.isError = true;
			requestError.object = error;
			requestError.messages = [error.message];
		}
	};

	const { form, errors } = createForm<z.infer<typeof schemas.AddRequestDTO>>({
		extend: validator({
			schema: schemas.AddRequestDTO
		}),

		onSubmit: async (values) => {
			requestError.reset();
			await apiClient.TodoController_add({
				...values
			});
			document.location.href = '/todo';
		},

		onError: (error) => {
			console.error(error);
			requestError.set(error as Error);
		}
	});
</script>

<h1>Todoの追加</h1>
{#if requestError.isError}
	<div class="error">{requestError.messages}</div>
{/if}
<div></div>
<form use:form>
	<div class="column">
		<div class="label">タイトル</div>
		<input type="text" name="title" />
		<div class="error">{$errors.title ?? ''}</div>
	</div>
	<div class="column">
		<div class="label">詳細</div>
		<textarea cols="100" rows="3" name="detail" />
		<div class="error">{$errors.detail ?? ''}</div>
	</div>
	<div class="column">
		<div class="label">カテゴリー</div>
		<select name="category">
			{#each Categories as category}
				<option value={category}>{category} </option>
			{/each}
		</select>
		<div class="error">{$errors.detail ?? ''}</div>
	</div>
	<button type="submit">追加</button>
</form>

<style>
	.error {
		font-size: 10px;
		color: red;
	}
</style>
