// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types

import type { Role } from '$lib/types/custom';
declare global {
	namespace App {
		interface Locals {
			user: {
				id: string;
				username?: string;
				role: Role;
			};
		}
		// interface PageData {}
		// interface Error {}
		// interface Platform {}
	}
}
