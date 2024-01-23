<script lang="ts">
	import { apiClient } from '$lib/api-client';
	import { createRequestURL } from '$lib/define';
	import { Categories } from '$lib/todo';
	import { createForm } from 'felte';
	let isError = false;
	const { form } = createForm({
		onSubmit: async (values) => {
			console.log(values);
			try {
				await apiClient.TodoController_add({
					title: values.title,
					detail: values.detail,
					category: values.category
				});
				document.location.href = '/todo';
			} catch (error) {
				console.error(error);
				isError = true;
			}
		}
	});
</script>

<h1>Todoの追加</h1>
{#if isError}
	<div>エラー発生！詳細はconsole!</div>
{/if}
<div></div>
<form use:form action={createRequestURL('update')} method="post">
	<div class="column">
		<div class="label">タイトル</div>
		<input type="text" name="title" />
	</div>
	<div class="column">
		<div class="label">詳細</div>
		<textarea cols="100" rows="3" name="detail" />
	</div>
	<div class="column">
		<div class="label">カテゴリー</div>
		<select name="category">
			{#each Categories as category}
				<option value={category}>{category} </option>
			{/each}
		</select>
	</div>
	<button type="submit">追加</button>
</form>
