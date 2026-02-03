import { test, expect } from '@playwright/test';

test.describe('Búsqueda de productos', () => {
  test('usuario puede buscar un móvil por nombre', async ({ page }) => {
    // 1. Ir a la home
    await page.goto('/');

    // 2. Verificar que hay productos iniciales
    const productCards = page.locator('a[href^="/product/"]');
    await expect(productCards.first()).toBeVisible();

    // 3. Escribir en el buscador
    const searchInput = page.getByPlaceholder('Search for a smartphone...');
    await searchInput.fill('iPhone');

    // 4. Esperar a que la URL contenga el término (sin esperar carga completa)
    await expect(page).toHaveURL(/search=iPhone/, { timeout: 10000 });
  });

  test('usuario puede limpiar la búsqueda', async ({ page }) => {
    // 1. Ir a la home con búsqueda
    await page.goto('/?search=Samsung');

    // 2. Verificar que el input tiene el valor
    const searchInput = page.getByPlaceholder('Search for a smartphone...');
    await expect(searchInput).toHaveValue('Samsung');

    // 3. Hacer clic en el botón de limpiar
    const clearButton = page.getByRole('button', { name: /clear/i });
    await clearButton.click();

    // 4. Esperar a que la URL cambie a home sin search
    await expect(page).toHaveURL('http://localhost:3000/', { timeout: 10000 });

    // 5. Verificar que el input está vacío
    await expect(searchInput).toHaveValue('');
  });
});
