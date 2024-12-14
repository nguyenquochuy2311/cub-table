import { esbuildDecorators } from '@anatine/esbuild-decorators';
import { build } from 'esbuild';

await build({
	entryPoints: ['src/**/*.ts'],
	bundle: true,
	outdir: 'dist',
	platform: 'node',
	target: 'esnext',
	packages: 'external',
	plugins: [esbuildDecorators()],
});
