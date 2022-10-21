<script lang="ts">
  import { writable } from 'svelte/store'
  import type TableOptions from '@tanstack/svelte-table'
  import {
    createSvelteTable,
    flexRender,
    getCoreRowModel,
  } from '@tanstack/svelte-table'

  export let data
  export let columns

  const options = writable<TableOptions<any>>({
    data: data,
    columns: columns,
    initialState: {
      columnVisibility: {
        id: false,
      }
    },
    getCoreRowModel: getCoreRowModel(),
    debugAll: false,
  })

  const rerender = () => {
    options.update(options => ({
      ...options,
      data,
    }))
  }

  const table = createSvelteTable(options)
</script>

<div class="p-2">
  <table class="min-w-full divide-y divide-gray-300">
    <thead class="bg-gray-50">
    {#each $table.getHeaderGroups() as headerGroup}
      <tr>
        {#each headerGroup.headers as header}
          <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
            {#if !header.isPlaceholder}
              <svelte:component
                this={flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
              />
            {/if}
          </th>
        {/each}
      </tr>
    {/each}
    </thead>
    <tbody class="divide-y divide-gray-200 bg-white">
    {#each $table.getRowModel().rows as row}
      <tr>
        {#each row.getVisibleCells() as cell}
          <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-800">
            <svelte:component
              this={flexRender(cell.column.columnDef.cell, cell.getContext())}
            />
          </td>
        {/each}
      </tr>
    {/each}
    </tbody>
<!--    <tfoot>-->
<!--    {#each $table.getFooterGroups() as footerGroup}-->
<!--      <tr>-->
<!--        {#each footerGroup.headers as header}-->
<!--          <th>-->
<!--            {#if !header.isPlaceholder}-->
<!--              <svelte:component-->
<!--                this={flexRender(-->
<!--                    header.column.columnDef.footer,-->
<!--                    header.getContext()-->
<!--                  )}-->
<!--              />-->
<!--            {/if}-->
<!--          </th>-->
<!--        {/each}-->
<!--      </tr>-->
<!--    {/each}-->
<!--    </tfoot>-->
  </table>
  <div class="h-4" />
  <button on:click={() => rerender()} class="border p-2"> Rerender </button>
</div>
