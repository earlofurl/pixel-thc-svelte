<script lang="ts">
	import type { Uom } from '$lib/types/prisma-model-types';
	import {
		Listbox,
		ListboxButton,
		ListboxOptions,
		ListboxOption
	} from '@rgossiaux/svelte-headlessui';
	import { selectedUom, selectedItem } from '$lib/stores';

	export function classNames(...classes: readonly (string | undefined)[]): string | undefined {
		return classes.filter(Boolean).join(' ');
	}

	export let options: Uom[] = [];

	$: if ($selectedItem.itemType) {
		$selectedUom =
			options.find((option) => option.id === $selectedItem.itemType.uomDefaultId) ?? options[0];
	}
</script>

<!--Uom Selection Listbox -->
<Listbox
	value={$selectedUom}
	on:change={(e) => ($selectedUom = e.detail)}
	as="div"
	class="relative items-center"
>
	<ListboxButton
		class="min-w-60 max-w-96 relative cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
	>
		<div>
			<p class="font-semibold">
				{$selectedUom.name}
			</p>
		</div>
	</ListboxButton>
	<ListboxOptions
		class="absolute z-20 mt-2 w-56 origin-top-left divide-y divide-gray-100 overflow-visible rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
	>
		{#each options as uom (uom.id)}
			<ListboxOption
				value={uom}
				let:selected
				let:active
				class={({ active }) =>
					active
						? 'group flex items-center w-full px-4 py-2 text-sm bg-gray-100 text-gray-800'
						: 'group flex items-center w-full px-4 py-2 text-sm text-gray-700'}
			>
				<div>
					<p class={classNames(selected ? 'font-bold' : 'font-normal')}>
						{uom.name}
					</p>
				</div>
			</ListboxOption>
		{/each}
	</ListboxOptions>
</Listbox>
<!--End Uom Selection Listbox-->
