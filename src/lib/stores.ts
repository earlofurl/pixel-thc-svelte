import type { Uom } from '$lib/types/prisma-model-types';
import type { PackageWithNestedData } from './types/custom';
import { writable } from 'svelte/store';

// Stores for the creation of new packages.
export const selectedParentPackage = writable({} as PackageWithNestedData);
export const selectedUom = writable({} as Uom);
