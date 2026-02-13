import { test, expect } from '@playwright/test';

test('Login and get JWT token', async ({ request }) => {
  const response = await request.post('/api/auth/login', {
    data: {
      email: 'admin@hrms.com',
      password: 'admin123'
    }
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.token).toBeTruthy();
});
