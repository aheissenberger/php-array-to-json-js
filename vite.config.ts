import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/guide/build.html#library-mode
export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'php-array-from-json-js',
            fileName: 'php-array-from-json-js',
        },
        rollupOptions: {
            external: [
                "node:child_process",
                "node:util",
                "node:buffer",
                "node:stream",
                "node:net",
                "node:url",
                "node:fs",
                "node:path",
                "perf_hooks",
            ],
            output: {
                globals: {
                    "node:child_process":"child_process",
                    "node:stream": "stream",
                    "node:buffer": "buffer",
                    "node:util": "util",
                    "node:net": "net",
                    "node:url": "url",
                    perf_hooks: "perf_hooks",
                },
                inlineDynamicImports: true,
            },
        },
    },

    plugins: [dts()]
});