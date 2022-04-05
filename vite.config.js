import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

const fs = require('fs');
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0'
    // 開啟 localhost 端使用 https 協定
    // https: {
    //   key: fs.readFileSync(`${__dirname}/static/pem/localhost-key.pem`),
    //   cert: fs.readFileSync(`${__dirname}/static/pem/localhost.pem`)
    // }
  },
  define: {
    'process.env': {}
  },
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      components: path.resolve(__dirname, 'src/components'),
      assets: path.resolve(__dirname, 'src/assets'),
      views: path.resolve(__dirname, 'src/views'),
      '~': path.resolve(__dirname, 'node_modules')
    }
  },
  // css: {
  //   preprocessorOptions: {
  //     scss: { additionalData: `@import "assets/scss/all";` },
  //   },
  // },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    },
    postcss: {
      plugins: [
        {
          postcssPlugin: 'internal:charset-removal',
          AtRule: {
            charset: atRule => {
              if (atRule.name === 'charset') {
                atRule.remove();
              }
            }
          }
        }
      ]
    }
  },
  build: {
    chunkSizeWarningLimit: 1500
  }
});
