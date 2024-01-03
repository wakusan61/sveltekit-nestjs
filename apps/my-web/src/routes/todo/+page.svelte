<script lang="ts">
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<table>
	<thead>
		<tr>
			<th>タイトル</th>
			<th>詳細</th>
			<th>カテゴリ</th>
		</tr>
	</thead>
	<tbody>
		{#each data.todos as todo}
			<tr>
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
