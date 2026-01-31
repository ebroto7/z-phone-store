# Backlog - Zara Mobile Store Challenge

Gestión de tareas del proyecto. Marcamos con `[x]` las completadas.

## Iteración 1: Fundamentos ✅

- [x] Crear estructura de carpetas (components, hooks, services, context, types, lib)
- [x] Definir tipos TypeScript (Product, CartItem, ApiResponse)
- [x] Crear servicio API con x-api-key header
- [x] Crear hook useDebounce (300ms)
- [x] Verificar CSS base (variables ya en globals.css)
- [x] Crear lib/utils.ts (formatPrice, cn, localStorage helpers)

## Iteración 2: Layout + Navegación ✅

- [x] Crear componente Navbar (client component)
- [x] Crear CartProvider básico (context)
- [x] Configurar layout.tsx con providers
- [x] Verificar rutas funcionando (/, /product/[id], /cart)
- [x] Build exitoso

## Iteración 3: Vista Lista (/)

- [ ] Crear ProductCard (server component)
- [ ] Crear ProductGrid con grid responsive
- [ ] Crear ProductCardSkeleton (loading)
- [ ] Crear SearchInput con debounce + URL update
- [ ] Integrar API en page.tsx (server component)
- [ ] Estados: loading, error, empty search

## Iteración 4: Vista Detalle (/product/[id])

- [ ] Fetch producto por ID (server component)
- [ ] Crear ProductImage con thumbnails
- [ ] Crear StorageSelector
- [ ] Crear ColorSelector
- [ ] Lógica botón añadir (disabled hasta selección completa)
- [ ] Crear SpecsTable
- [ ] Crear SimilarProducts carousel/grid

## Iteración 5: Carrito (/cart)

- [ ] Completar CartContext con localStorage
- [ ] Manejar hidratación SSR/Client
- [ ] Crear CartItem component
- [ ] Crear CartSummary (total)
- [ ] Crear CartEmpty (estado vacío)
- [ ] Integrar contador en Navbar

## Iteración 6: Polish

- [ ] Error boundary global
- [ ] Loading states completos (Suspense)
- [ ] Accesibilidad (aria-labels, focus visible)
- [ ] Responsive final (verificar breakpoints)
- [ ] Consola limpia (sin warnings React)

## Iteración 7: Testing

- [ ] Tests unitarios CartContext
- [ ] Tests hook useDebounce
- [ ] Tests servicio api.ts
- [ ] Tests componentes clave (ProductCard, SearchInput)

## Iteración 8: Nice to Have (si hay tiempo)

- [ ] Validar carrito contra API
- [ ] Optimización imágenes avanzada
- [ ] Sincronización entre pestañas (storage event)
- [ ] Cancelación de requests (AbortController)

---

## Decisiones Tomadas

| Aspecto | Decisión | Razón |
|---------|----------|-------|
| Búsqueda | URL-based (`?search=`) | Como Zara.com, SEO friendly |
| Validación carrito | No (iterar si tiempo) | Simplicidad inicial |
| Loading states | Skeletons | UX estándar |
| Error handling | Mensaje + retry | Simple y efectivo |
| Imágenes | `loading="lazy"` nativo | Sin librerías extra |
| Formato precio | `XXX EUR` | Como Zara.com |

---

## Progreso

| Iteración | Estado | Notas |
|-----------|--------|-------|
| 1. Fundamentos | ✅ Completa | types, api, useDebounce, utils, CSS |
| 2. Layout | ✅ Completa | Navbar, CartProvider, layout.tsx, rutas |
| 3. Lista | ⏳ Pendiente | |
| 4. Detalle | ⏳ Pendiente | |
| 5. Carrito | ⏳ Pendiente | |
| 6. Polish | ⏳ Pendiente | |
| 7. Testing | ⏳ Pendiente | |
| 8. Nice to Have | ⏳ Pendiente | Solo si sobra tiempo |
