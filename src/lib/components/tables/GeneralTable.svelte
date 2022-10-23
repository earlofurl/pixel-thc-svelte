<script lang="ts">
  import { writable } from "svelte/store";
  import type TableOptions from "@tanstack/svelte-table";
  import {
    createSvelteTable,
    flexRender,
    getCoreRowModel,
    getSortedRowModel
  } from "@tanstack/svelte-table";

  export let data;
  export let columns;

  let sorting = [];

  const setSorting = updater => {
    if (updater instanceof Function) {
      sorting = updater(sorting);
    } else {
      sorting = updater;
    }
    options.update(old => ({
      ...old,
      state: {
        ...old.state,
        sorting
      }
    }));
  };

  const options = writable<TableOptions<any>>({
    data: data,
    columns: columns,
    state: {
      sorting
    },
    onSortingChange: setSorting,
    initialState: {
      columnVisibility: {
        id: false
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugAll: false
  });

  const rerender = () => {
    options.update(options => ({
      ...options,
      data
    }));
  };

  const table = createSvelteTable(options);
</script>

<div class="px-4 sm:px-6 lg:px-8">
  <div class="mt-8 flex flex-col">
    <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
        <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
          <table class="min-w-full divide-y divide-gray-300">
            <thead class="bg-gray-50">
            {#each $table.getHeaderGroups() as headerGroup}
              <tr>
                {#each headerGroup.headers as header}
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    {#if !header.isPlaceholder}
                      <div
                        class:cursor-pointer={header.column.getCanSort()}
                        class:select-none={header.column.getCanSort()}
                        on:click={header.column.getToggleSortingHandler()}
                      >
                        <svelte:component this={flexRender(header.column.columnDef.header, header.getContext())} />
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted().toString()] ?? ''}
                      </div>
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
        </div>
      </div>
    </div>
  </div>
</div>
