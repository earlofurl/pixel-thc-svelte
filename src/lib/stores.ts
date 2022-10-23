import type { PackageWithNestedData } from './types/custom';
import { writable } from 'svelte/store';

export const selectedParentPackage = writable({} as PackageWithNestedData);
