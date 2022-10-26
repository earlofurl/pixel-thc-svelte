import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

let runMode: string;
let hostMode: boolean;

if (process.env.NODE_ENV === 'production') {
	runMode = 'prod';
	hostMode = false;
} else {
	runMode = 'dev';
	hostMode = true;
}

const config: UserConfig = {
	plugins: [sveltekit()],
	mode: runMode,
	server: {
		host: hostMode
	}
};

export default config;
