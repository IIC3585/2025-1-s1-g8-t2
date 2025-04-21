### 2025-1-s1-g8-t2

# Progressive Web Application with Web Assembly features


## Instrucciones & Pre-Requisitos

- Versión node >= v18.20.8
- Rust & cargo. Siguiendo las indicaciones a continuación.
- wasm-pack. 

### Instalar dependencias

1. **Instalanción de Node.js y paquetes.**:
   
```bash 
npm install 

```

2. **Instalación de Rust & cargo**

```bash 
curl https://sh.rustup.rs -sSf | sh
source $HOME/.cargo/env
```

3. **Hacer build en la carpeta img processing**
   
```bash

   wasm-pack build --target web --out-dir ../frontend/src/wasm

   ```

### Para exponer el host a parte del local: 

1. **Solo exponer host**
   
   ```bash

   npm run dev -- --host

   ```
2. **Hacer build para producción y exponer host, útil para probar funciones PWA en Mobile.**
    ```bash

   npm run build && npm run dev -- --host

   ```

## Aspectos PWA. 

1. **Peronalización de la App.**
   
   - Se encuentran los colores personalizados en tailwind.css, en el archivo index.css.
   - Se instaló el Vite plugin pwa, que genera inmediatamente el manifest.webmanifest, registrando el service worker, en este caso sus funciones serán asignadas al archivo Vite.config.

```bash

   npm install vite-plugin-pwa --save-dev

   ```
2. **Caché en el service wroker.**

   - Se ha implementado un caché en el service worker para que fucione sin internet. 
