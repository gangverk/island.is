import { test, expect } from '@playwright/test'

test('Nýjasta framtal', async ({ page }) => {
  await page.goto('/skattframtol/application')

  // Expect h1 to contain a substring.
  expect(await page.locator('h1').innerText()).toContain('Nýjasta framtal')
})

test('framtöl í vinnslu', async ({ page }) => {
  await page.goto('/skattframtol/application/in-progress')

  // Expect h1 to contain a substring.
  expect(await page.locator('h1').innerText()).toContain('Framtöl í vinnslu')
})

test('eldri framtöl', async ({ page }) => {
  await page.goto('/skattframtol/application/older')

  // Expect h1 to contain a substring.
  expect(await page.locator('h1').innerText()).toContain('Eldri framtöl')
})
