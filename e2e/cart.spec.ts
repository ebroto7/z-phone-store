import { test, expect } from '@playwright/test';

test.describe('Carrito de compras', () => {
  test('usuario puede añadir un producto al carrito', async ({ page }) => {
    // 1. Ir a la home
    await page.goto('/');

    // 2. Hacer clic en el primer producto
    const firstProduct = page.locator('a[href^="/product/"]').first();
    await firstProduct.click();

    // 3. Esperar a que cargue la página de detalle
    await expect(page).toHaveURL(/\/product\/.+/);

    // 4. Seleccionar almacenamiento (primer botón de storage)
    const storageButton = page.locator('button').filter({ hasText: /GB/i }).first();
    await storageButton.click();

    // 5. Seleccionar color (primer botón de color)
    const colorButton = page.locator('button[aria-label^="Color "]').first();
    await colorButton.click();

    // 6. El botón "Añadir" debería estar habilitado ahora
    const addButton = page.getByRole('button', { name: /añadir/i });
    await expect(addButton).toBeEnabled();

    // 7. Hacer clic en "Añadir"
    await addButton.click();

    // 8. Verificar que el contador del carrito aumentó
    const cartBadge = page.locator('header a[href="/cart"] span');
    await expect(cartBadge).toHaveText('1');
  });

  test('usuario puede ver el producto en el carrito', async ({ page }) => {
    // 1. Primero añadir un producto (reutilizamos el flujo)
    await page.goto('/');

    const firstProduct = page.locator('a[href^="/product/"]').first();
    await firstProduct.click();

    await expect(page).toHaveURL(/\/product\/.+/);

    const storageButton = page.locator('button').filter({ hasText: /GB/i }).first();
    await storageButton.click();

    const colorButton = page.locator('button[aria-label^="Color "]').first();
    await colorButton.click();

    const addButton = page.getByRole('button', { name: /añadir/i });
    await addButton.click();

    // 2. Ir al carrito
    const cartLink = page.locator('a[href="/cart"]');
    await cartLink.click();

    // 3. Verificar que estamos en el carrito
    await expect(page).toHaveURL('/cart');

    // 4. Verificar que hay un producto
    const cartItem = page.locator('article').first();
    await expect(cartItem).toBeVisible();

    // 5. Verificar que muestra el precio total
    const totalPrice = page.getByText(/EUR/i);
    await expect(totalPrice.first()).toBeVisible();
  });

  test('usuario puede eliminar un producto del carrito', async ({ page }) => {
    // 1. Añadir producto
    await page.goto('/');

    const firstProduct = page.locator('a[href^="/product/"]').first();
    await firstProduct.click();

    await expect(page).toHaveURL(/\/product\/.+/);

    const storageButton = page.locator('button').filter({ hasText: /GB/i }).first();
    await storageButton.click();

    const colorButton = page.locator('button[aria-label^="Color "]').first();
    await colorButton.click();

    const addButton = page.getByRole('button', { name: /añadir/i });
    await addButton.click();

    // 2. Ir al carrito
    await page.goto('/cart');

    // 3. Hacer clic en "Eliminar"
    const removeButton = page.getByRole('button', { name: /eliminar/i });
    await removeButton.click();

    // 4. Verificar que el carrito está vacío (no hay artículos)
    const cartItems = page.locator('article');
    await expect(cartItems).toHaveCount(0);
  });

  test('el badge del header muestra el número correcto de items', async ({ page }) => {
    // 1. Ir a la home con carrito vacío
    await page.goto('/');

    // 2. Verificar que el contador NO es visible (carrito vacío)
    const bagCount = page.locator('header a[href="/cart"] span');
    await expect(bagCount).not.toBeVisible();

    // 3. Añadir un producto
    const firstProduct = page.locator('a[href^="/product/"]').first();
    await firstProduct.click();

    await expect(page).toHaveURL(/\/product\/.+/);

    const storageButton = page.locator('button').filter({ hasText: /GB/i }).first();
    await storageButton.click();

    const colorButton = page.locator('button[aria-label^="Color "]').first();
    await colorButton.click();

    const addButton = page.getByRole('button', { name: /añadir/i });
    await addButton.click();

    // 4. Verificar que el badge muestra "1"
    await expect(bagCount).toBeVisible();
    await expect(bagCount).toHaveText('1');

    // 5. Añadir el mismo producto otra vez (incrementa cantidad)
    await addButton.click();

    // 6. Verificar que el badge muestra "2"
    await expect(bagCount).toHaveText('2');
  });
});
