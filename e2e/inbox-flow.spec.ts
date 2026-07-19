import { expect, test } from '@playwright/test';

test('reads an unread message and persists a locally filed composed message', async ({
  page,
}) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();

  await expect(page.getByRole('heading', { name: 'Messages' })).toBeVisible();
  await expect(page.getByText('2 unread')).toBeVisible();

  await page
    .getByRole('button', {
      name: /Design review notes for the card list/i,
    })
    .click();

  await expect(
    page.getByRole('heading', {
      name: 'Design review notes for the card list',
    }),
  ).toBeVisible();
  await expect(page.getByText(/calm card rhythm/i)).toBeVisible();

  await page.getByRole('button', { name: 'Back to inbox' }).click();

  const openedCard = page.getByRole('button', {
    name: /Design review notes for the card list/i,
  });
  await expect(openedCard).toBeVisible();
  await expect(openedCard).not.toHaveClass(/message-card--unread/);
  await expect(page.getByText('1 unread')).toBeVisible();

  await page.getByRole('button', { name: 'Compose', exact: true }).click();
  await page.getByLabel('To').fill('reader@example.com');
  await page.getByLabel('Subject').fill('E2E local message');
  await page
    .getByLabel('Body')
    .fill('This local message should be retained across reloads.');
  await page.getByRole('button', { name: 'File locally' }).click();

  await expect(
    page.getByText('Filed locally: E2E local message'),
  ).toBeVisible();

  await page.reload();
  await expect(page.getByRole('heading', { name: 'Messages' })).toBeVisible();
  await expect(page.getByText('1 unread')).toBeVisible();

  await page.getByRole('button', { name: 'Compose', exact: true }).click();
  await expect(page.getByText('1 filed locally')).toBeVisible();
});
