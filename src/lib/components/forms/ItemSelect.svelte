<script lang='ts'>
	import type { Item, Strain } from '$lib/types/prisma-model-types';
	import {
		Listbox,
		ListboxButton,
		ListboxOptions,
		ListboxOption
	} from '@rgossiaux/svelte-headlessui';
	import { selectedParentPackage } from '$lib/stores';

	export function classNames(
		...classes: readonly (string | undefined)[]
	): (string | undefined) {
		return classes.filter(Boolean).join(' ');
	}

	export let options: Item[] = [];
	$: filteredOptions = $selectedParentPackage.item
		? options.filter((item: Item) => {
			return item.strain.id === $selectedParentPackage.item.strain.id;
		}) : options.slice(0, 10);

	let selectedItem = options[0];
</script>

<div class='sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5'>
	<label for='item-select'
				 class='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'>Item</label>
	<div class='mt-1 sm:col-span-2 sm:mt-0'>
		<div id='item-select' class='flex max-w-lg rounded-md shadow-sm'>
			<!--Item Selection Listbox -->
			<Listbox value={selectedItem} on:change={(e) => (selectedItem = e.detail)}>
				<ListboxButton
					class='relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm'>
					<div>
						<p class='font-semibold'>
							{selectedItem.strain.name}
						</p>
						<div class='w-full justify-between'>
							<span>{selectedItem.itemType.productForm}</span> -
							<span>{selectedItem.itemType.productModifier}</span>
						</div>
					</div>
				</ListboxButton>
				<ListboxOptions
					class='absolute z-20 mt-2 w-56 origin-top-left divide-y divide-gray-100 overflow-visible rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
					{#each filteredOptions as item (item.id)}
						<ListboxOption value={item} let:selected let:active
													 class={({ active }) => (active ? "group flex items-center w-full px-4 py-2 text-sm bg-gray-100 text-gray-800" : "group flex items-center w-full px-4 py-2 text-sm text-gray-700")}>
							<div>
								<p class={classNames(selected ? 'font-bold' : 'font-normal')}>
									{item.strain.name}
								</p>
								<div class='w-full justify-between'>
									<span>{item.itemType.productForm}</span>
									<span>{item.itemType.productModifier}</span>
								</div>
							</div>
						</ListboxOption>
					{/each}
				</ListboxOptions>
			</Listbox>
			<!--End Item Selection Listbox-->
		</div>
	</div>
</div>
