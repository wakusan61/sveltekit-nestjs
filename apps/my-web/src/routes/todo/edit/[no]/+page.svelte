<script lang="ts">
	import { Categories } from '$lib/todo';
	import type { PageServerData } from './$types';
	import { createForm } from 'felte';
	import { createRequestURL } from '$lib/define';

	export let data: PageServerData;
	let isError = false;

	const { form } = createForm({
		onSubmit: async (values) => {
			console.log(values);
			try {
				await fetch(createRequestURL('todo/update'), {
					method: 'POST',
					mode: 'cors',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						no: new Number(values.no),
						title: values.title,
						detail: values.detail,
						category: values.category
					})
				});
			} catch (error) {
				console.error(error);
				isError = true;
			}
		}
	});
</script>

<h1>Todoの編集</h1>
{#if isError}
	<div>エラー発生！詳細はconsole!</div>
{/if}
<div></div>
<form use:form action={createRequestURL('update')} method="post">
	<div class="column">
		<div class="label">No</div>
		<input class="readonly" type="no" readonly name="no" value={data.todo.no} />
	</div>
	<div class="column">
		<div class="label">タイトル</div>
		<input type="text" name="title" value={data.todo.title} />
	</div>
	<div class="column">
		<div class="label">詳細</div>
		<textarea cols="100" rows="3" name="detail" value={data.todo.detail} />
	</div>
	<div class="column">
		<div class="label">カテゴリー</div>
		<select name="category" value={data.todo.category}>
			{#each Categories as category}
				<option value={category}>{category} </option>
			{/each}
		</select>
	</div>
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
</style>
