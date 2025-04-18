### 2025-1-s1-g8-t2

Versión node >= v18.20.8

Correr npm install antes de correr servidor.

## Instalar dependencias

```bash 
npm install 

```

## Para celular y mostrar que es responsive: 

   ```bash

   npm run dev -- --host

   ```
## Para hacer build en al archivo img processing

```bash

   wasm-pack build --target web --out-dir ../frontend/src/wasm

   ```

   ## Aspecto PWA: Personalización completa de la App.

   - Ya se encuentran los colores personalizados en tailwind.css, en el archivo index.css.
   - Se instaló el Vite plugin pwa, que genera inmediatamente el manifest.webmanifest, registrando el service worker. 

```bash

   npm install vite-plugin-pwa --save-dev

   ```