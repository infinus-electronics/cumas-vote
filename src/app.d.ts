// See https://kit.svelte.dev/docs/types#app

import type { Admin, Record } from "pocketbase";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
		interface Locals {
            pb: PocketBase
			user: Record | Admin | null;
        }
	}
}

export {};
