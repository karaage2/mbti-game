// vite.config.ts
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: '0.0.0.0', // 全てのIPアドレスからアクセスできるようにする
    port: 5173,       // ポート番号（デフォルトでOK）
  }
})
