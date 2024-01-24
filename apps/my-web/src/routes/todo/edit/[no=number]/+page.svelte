<script lang="ts">
	import { Categories } from '$lib/todo';
	import type { PageServerData } from './$types';
	import { createForm } from 'felte';
	import { apiClient } from '$lib/api-client';
	import { ZodError, z } from 'zod';
	import { schemas } from '$lib/generated-client';
	import { validator } from '@felte/validator-zod';

	export let data: PageServerData;
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

	// createForm に zod schema を渡すことで項目のデータ型を定義できる。
	const { form, errors } = createForm<z.infer<typeof schemas.UpdateRequestDTO>>({
		// zod schemaで検証
		extend: validator({
			schema: schemas.UpdateRequestDTO
		}),

		onSubmit: async (values) => {
			requestError.reset();
			await apiClient.TodoController_update({
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

<h1>Todoの編集</h1>
{#if requestError.isError}
	<div class="error">{requestError.messages}</div>
	<div class="error">{JSON.stringify(requestError.object)}</div>
{/if}
<div></div>
<form use:form>
	<div class="column">
		<div class="label">No</div>
		<!-- 数値型の入力は type="number" で定義しないと zod へ渡すときに number型で渡されない -->
		<input class="readonly" type="number" readonly name="no" value={data.todo.no} />
	</div>
	<div class="column">
		<div class="label">タイトル</div>
		<input type="text" name="title" value={data.todo.title} />
		<div class="error">{$errors.title ?? ''}</div>
	</div>
	<div class="column">
		<div class="label">詳細</div>
		<textarea cols="100" rows="3" name="detail" value={data.todo.detail} />
		<div class="error">{$errors.detail ?? ''}</div>
	</div>
	<div class="column">
		<div class="label">カテゴリー</div>
		<select name="category" value={data.todo.category}>
			{#each Categories as category}
				<option value={category}>{category} </option>
			{/each}
		</select>
	</div>
	<div class="error">{$errors.category ?? ''}</div>
	<button type="submit">更新</button>
</form>

<style>
	form {
		margin-left: 20px;
	}
	.readonly {
		border: none;
	}
	.column {
		margin-bottom: 15px;
	}
	.error {
		font-size: 10px;
		color: red;
	}
</style>
