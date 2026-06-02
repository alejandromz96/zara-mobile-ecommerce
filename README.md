# Zara Mobile Ecommerce

Aplicacion de ecommerce mobile construida con Next.js, React, TypeScript y Tailwind CSS para la prueba tecnica. Permite consultar un catalogo de telefonos, buscar productos, ver el detalle de cada modelo, seleccionar almacenamiento y color, y gestionar un carrito persistente en el navegador.

## Stack

- Next.js 16 con App Router.
- React 19 y TypeScript.
- Tailwind CSS 4 para estilos.
- Vitest, Testing Library y jsdom para tests unitarios y de componentes.
- Server Actions para acceder a la API del catalogo.

## Funcionalidades

- Listado responsive de productos.
- Busqueda por texto contra la API.
- Pagina de detalle con imagen, precio dinamico, variantes y especificaciones.
- Productos similares en la ficha de producto.
- Carrito con contador global, eliminacion de productos y total calculado.
- Persistencia del carrito en `localStorage`.

## Requisitos

- Node.js 20 o superior recomendado.
- npm, usando el `package-lock.json` incluido.

## Instalacion

```bash
npm install
```

## Arrancar en local

```bash
npm run dev
```

La aplicacion queda disponible en `http://localhost:3000`.

## Scripts disponibles

```bash
npm run dev
```

Arranca el servidor de desarrollo.

```bash
npm run build
```

Genera la build de produccion.

```bash
npm run start
```

Sirve la build de produccion generada previamente.

```bash
npm run test
```

Ejecuta la suite de tests con Vitest.

```bash
npm run lint
```

Ejecuta ESLint sobre el proyecto.

## Variables de entorno

El proyecto incluye valores por defecto para facilitar la ejecucion local, pero se pueden sobrescribir creando un archivo `.env.local` a partir de `.env.example`:

```bash
MOBILE_STORE_API_URL=https://prueba-tecnica-api-tienda-moviles.onrender.com
MOBILE_STORE_API_KEY=tu_api_key
```

- `MOBILE_STORE_API_URL`: URL base de la API de productos.
- `MOBILE_STORE_API_KEY`: clave usada en la cabecera `x-api-key`.

## Estructura del proyecto

```text
src/
  app/
    actions/          Server Actions para consultar la API.
    cart/             Ruta del carrito.
    products/[id]/    Ruta de detalle de producto.
    globals.css       Estilos globales y variables CSS.
    layout.tsx        Layout raiz y metadata.
    page.tsx          Home con buscador y grid de productos.
  components/         Componentes reutilizables de interfaz.
  lib/                Tipos, i18n, formateadores y logica de dominio.
public/               Assets publicos, como el favicon.
```

## Detalles de implementacion

- La consulta a la API esta centralizada en `src/app/actions/products.ts`.
- Las imagenes se renderizan con `next/image` y la configuracion actual usa `unoptimized: true` en `next.config.ts`.
- La logica de carrito vive en `src/lib/cart.ts` y se expone en UI mediante `CartProvider`.
- La logica de precio, seleccion de variantes e imagen activa del producto esta separada en `src/lib/product-details.ts`.
- Los literales de interfaz estan centralizados en `src/lib/i18n.ts` con un helper `t(...)`. Actualmente solo hay traducciones en ingles, pero la estructura permite anadir mas idiomas.
- Los tests estan colocados junto al codigo que validan con extension `.test.ts` o `.test.tsx`.

## Calidad y tests

Antes de entregar cambios, se recomienda ejecutar:

```bash
npm run lint
npm run test
npm run build
```

Esto valida reglas de lint, comportamiento de utilidades/componentes y que la aplicacion compile correctamente para produccion.
