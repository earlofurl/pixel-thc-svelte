import type { Uom, PackageTag } from '$lib/types/prisma-model-types';
import type { PackageWithNestedData, ItemWithNesting } from './types/custom';
import { writable } from 'svelte/store';

// Stores for the creation of new packages.
export const selectedParentPackage = writable({} as PackageWithNestedData);
export const selectedUom = writable({} as Uom);
export const selectedItem = writable({} as ItemWithNesting);
export const selectedNewPackageTag = writable({} as PackageTag);
