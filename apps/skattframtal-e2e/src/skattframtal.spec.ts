import { test, expect } from '@playwright/test'

test('Nýjasta framtal', async ({ page }) => {
  await page.goto('/skattframtol/application')

  // Expect h1 to contain a substring.
  expect(await page.locator('h1').innerText()).toContain('Nýjasta framtal')

  await page.getByRole('link', { name: 'Hefja skattframtal' }).click()

  await expect(page.getByRole('heading', { name: 'Inngangur' })).toBeVisible()

  await page.getByRole('button', { name: 'Halda áfram' }).click()

  await expect(
    page.getByRole('heading', { name: 'Mínar upplýsingar' }),
  ).toBeVisible()

  await page.getByRole('button', { name: 'Halda áfram' }).click()

  await expect(
    page.getByRole('heading', { name: 'Tekjur ársins' }),
  ).toBeVisible()

  await page.getByRole('button', { name: 'Halda áfram' }).click()

  await expect(
    page.getByRole('heading', { name: 'Eignir í árslok' }),
  ).toBeVisible()

  await page.getByRole('button', { name: 'Halda áfram' }).click()

  await expect(
    page.getByRole('heading', { name: 'Skuldir og vaxtagjöld' }),
  ).toBeVisible()
})

test('eldri framtöl', async ({ page }) => {
  await page.goto('/skattframtol/application/older')

  // Expect h1 to contain a substring.
  expect(await page.locator('h1').innerText()).toContain('Eldri framtöl')
})
