<script lang="ts">
	import { Menu, MenuButton, MenuItems, MenuItem } from '@rgossiaux/svelte-headlessui';

	export function classNames(...classes: readonly (string | undefined)[]): string | undefined {
		return classes.filter(Boolean).join(' ');
	}
</script>

<Menu as="div" class="relative items-center">
	<MenuButton
		class="items-center rounded-full text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
	>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
			<path
				d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z"
			/>
		</svg>
	</MenuButton>
	<MenuItems
		class="absolute z-10 mt-1 max-h-60 min-w-20 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
	>
		<MenuItem let:active>
			<button
				type="button"
				class={classNames(
					active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
					'group flex items-center w-full px-4 py-2 text-sm'
				)}
			>
				Create From
			</button>
		</MenuItem>
		<MenuItem let:active>
			<button
				type="button"
				class={classNames(
					active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
					'group flex items-center w-full px-4 py-2 text-sm'
				)}
			>
				Edit
			</button>
		</MenuItem>
		<MenuItem let:active>
			<button
				type="button"
				class={classNames(
					active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
					'group flex items-center w-full px-4 py-2 text-sm'
				)}
			>
				Add to Order
			</button>
		</MenuItem>
		<MenuItem let:active>
			<button
				type="button"
				class={classNames(
					active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
					'group flex items-center w-full px-4 py-2 text-sm'
				)}
			>
				Assign Tag
			</button>
		</MenuItem>
	</MenuItems>
</Menu>
