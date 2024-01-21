<script lang="ts">
	import type { PageServerData } from './$types';

	export let data: PageServerData;
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
		{#each data.todos as todo}
			<tr>
				<td>{todo.no}</td>
				<td>{todo.title}</td>
				<td>{todo.detail}</td>
				<td>{todo.category}</td>
				<td>
					<button on:click={() => location.assign(`/todo/edit/${todo.no}`)}>編集</button>
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
