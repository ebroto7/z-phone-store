# Zara Mobile Store

Tienda web de móviles - Prueba técnica Inditex.

## Requisitos

- **Node.js 18** (obligatorio, especificado en el PDF)
- pnpm (recomendado) o npm

## Instalación

```bash
# 1. Clonar el repositorio
git clone <url>
cd z-phone-store

# 2. Usar Node 18 (si tienes nvm)
nvm use
# Si no tienes nvm, asegúrate de tener Node 18 instalado

# 3. Instalar dependencias
pnpm install

# 4. Configurar variables de entorno
cp .env.example .env.local
```

## Scripts

```bash
pnpm dev      # Desarrollo (assets sin minimizar)
pnpm build    # Producción (assets minimizados)
pnpm start    # Ejecutar build de producción
pnpm lint     # Linter
pnpm test     # Tests
```

## Stack Tecnológico

| Tecnología | Versión | Notas |
|------------|---------|-------|
| Node.js | 18.x | Requisito del PDF |
| React | 19 | >= 17 requerido |
| Next.js | 15 | App Router, Server Components |
| TypeScript | 5 | - |
| CSS | Variables CSS | Sin Tailwind ni librerías UI |

## Estructura

```
src/
├── app/          # Rutas (/, /product/[id], /cart)
├── components/   # Componentes React
├── hooks/        # Hooks personalizados
├── services/     # Llamadas a API
└── types/        # Tipos TypeScript
```

## Notas

- **Estado**: React Context API (sin Redux/Zustand)
- **Estilos**: CSS puro + Variables (sin Tailwind)
- **Imágenes**: Optimizadas con next/image
- **API**: Requiere header `x-api-key` en todas las peticiones
