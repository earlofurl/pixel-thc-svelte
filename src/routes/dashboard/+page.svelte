<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Dashboard</title>
</svelte:head>

<div class="container">
	<div class="row">
		<div class="col-12">
			<h1>Dashboard</h1>
		</div>
	</div>
	<div class="row">
		<div class="col-12">
			<h2>My Projects</h2>
		</div>
	</div>
	<div class="row">
		<div class="col-12">
			<h2>My Tasks</h2>
		</div>
	</div>
	<div>
		{data.hello}
	</div>
	<div>
		Hello {JSON.stringify(data.user)}
	</div>
</div>
