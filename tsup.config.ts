// tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig({
	entry: ["src/index.tsx"],
	format: ["esm", "cjs"],
	dts: true,
	sourcemap: true,
	clean: true,
});
