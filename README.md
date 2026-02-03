# Z Phone Store - MBST

Aplicación web para visualización, búsqueda y gestión de un catálogo de teléfonos móviles.

**Demo:** [https://z-phone-store.vercel.app](https://z-phone-store.vercel.app)

## Requisitos cumplidos

| Obligatorio | Estado |
|-------------|--------|
| Testing | ✅ Vitest + Playwright |
| Responsive | ✅ Mobile-first |
| Accesibilidad | ✅ Skip link, aria-live, aria-labels |
| Linters | ✅ ESLint + Prettier |
| README | ✅ |

| Opcional | Estado |
|----------|--------|
| Despliegue | ✅ Vercel |
| SSR (Next.js) | ✅ Server Components |
| Variables CSS | ✅ |

## Instalación

```bash
git clone <url>
cd z-phone-store
nvm use          # Node 22
pnpm install
cp .env.example .env.local   # Configurar API_KEY
pnpm dev                     # http://localhost:3000
```

> Editar `.env.local` con los valores del PDF: `NEXT_PUBLIC_API_URL` y `API_KEY`.

## Scripts

```bash
pnpm dev       # Desarrollo
pnpm build     # Build producción
pnpm test      # Tests unitarios (Vitest)
pnpm test:e2e  # Tests E2E (Playwright)
```

## Stack

Requisitos del proyecto: Node 18, React ≥17, Next.js 15, TypeScript 5.

> ⚠️ Node 18 fue deprecado por Vercel en 2025. Se usa Node ≥20 para el deploy.

- **Next.js 14** - App Router, Server Components
- **React 18** - Context API para estado global
- **TypeScript 5** - Tipado estricto
- **CSS Modules** - Variables CSS (colores de Figma), sin librerías UI
- **Imágenes** - Optimizadas con next/image
- **API** - Header `x-api-key` en todas las peticiones

## Arquitectura

```
src/
├── app/           # Rutas (/, /product/[id], /cart, /order/success)
├── components/    # Organizados por dominio (product/, cart/, ui/)
├── context/       # CartContext + useCart hook
├── hooks/         # useDebounce (para búsqueda)
├── services/      # API client
└── types/         # Tipos compartidos
```

## Testing

No es testing exhaustivo, pero cubre lo esencial:

**Unitarios (Vitest + RTL)** - 75 tests
- Renderizado de componentes
- Interacciones de usuario (clicks, inputs)
- Edge cases (carrito vacío, errores API, sin resultados)

**E2E (Playwright)** - 7 tests
- Navegación completa entre páginas
- Flujo de búsqueda
- Añadir al carrito y checkout

## Decisiones técnicas

- **Búsqueda en URL** (`?search=`) - SEO friendly, permite compartir enlaces
- **Server Components** - Carga inicial de productos en servidor
- **Context API** - Suficiente para carrito, sin overhead de Redux
- **Debounce 300ms** - Evita llamadas excesivas a la API en búsqueda
