<script lang="ts">
	import type { PageData } from './$types';
	import type { Order } from '$lib/types/prisma-model-types';

	export let data: PageData;
</script>

<h1 class="font-bold text-2xl text-gray-900">Orders</h1>

{#each data.orders as order}
	<li>
		<a href="orders/{order.id}" class="text-blue-500 hover:text-blue-600">
			{order.id}
		</a>
	</li>
{/each}
