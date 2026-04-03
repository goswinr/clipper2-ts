import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

const clipper2FSharp = process.env.CLIPPER2FSHARP === '1';

export default defineConfig({
  resolve: clipper2FSharp
    ? {
        alias: {
          '../src/Clipper': resolve(__dirname, '../FableBuild/shim/Clipper.ts'),
          '../src/index': resolve(__dirname, '../FableBuild/shim/index.ts'),
          '../src': resolve(__dirname, '../FableBuild/shim/index.ts'),
        },
      }
    : undefined,
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: ['node_modules', 'dist', '.idea', '.git', '.cache'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*'],
      exclude: ['src/**/*.d.ts', 'src/**/*.test.ts']
    },
    benchmark: {
      include: ['bench/**/*.{bench,benchmark}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}']
    }
  }
});
