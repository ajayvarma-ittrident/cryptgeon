import { sveltekit } from '@sveltejs/kit/vite'
import precompileIntl from 'svelte-intl-precompile/sveltekit-plugin'
import { resolve } from 'path'

const port = 3000

const config = {
  clearScreen: false,
  server: {
    port,
    proxy: {
      '/api': 'http://localhost:8000',
    },
  },
  preview: { port },
  plugins: [sveltekit(), precompileIntl('locales')],
  resolve: {
    alias: {
      'cryptgeon/shared': resolve(__dirname, '../cli/dist/shared/shared.js')
    }
  },
  optimizeDeps: {
    include: ['cryptgeon']
  },
  build: {
    commonjsOptions: {
      esmExternals: true
    },
    rollupOptions: {
      external: ['inquirer'],
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    }
  }
}

export default config
