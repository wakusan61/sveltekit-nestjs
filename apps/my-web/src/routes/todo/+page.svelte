<script lang="ts">
	import type { PageServerData } from './$types';
	import { apiClient } from '$lib/api-client';

	export let data: PageServerData;
	$: todos = data.todos;

	const removeTodo = async (no: number) => {
		try {
			await apiClient.TodoController_remove(undefined, { params: { no: no } });
		} catch (error) {
			console.error(error);
			throw error;
		}
		todos = todos.filter((v) => v.no !== no);
	};
</script>

<button><a class="register" href="/todo/add">登録</a></button>
<table>
	<thead>
		<tr>
			<th>No</th>
			<th>タイトル</th>
			<th>詳細</th>
			<th>カテゴリ</th>
		</tr>
	</thead>
	<tbody>
		{#each todos as todo}
			<tr>
				<td>{todo.no}</td>
				<td>{todo.title}</td>
				<td>{todo.detail}</td>
				<td>{todo.category}</td>
				<td>
					<button on:click={() => location.assign(`/todo/edit/${todo.no}`)}>編集</button>
				</td>
				<td>
					<button on:click={async () => await removeTodo(todo.no)}>削除</button>
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	table {
		border-collapse: collapse;
	}
	thead {
		border-bottom: solid 1px black;
	}
	td {
		padding-right: 10px;
	}
	.register {
		color: black;
		text-decoration: none;
	}
</style>
