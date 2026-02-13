import { request } from '@playwright/test';

async function globalSetup() {
  const apiContext = await request.newContext({
    baseURL: 'http://localhost:5000'
  });

  const response = await apiContext.post('/api/auth/login', {
    data: {
      email: 'admin@hrms.com',
      password: 'admin123'
    }
  });

  if (response.status() !== 200) {
    throw new Error('❌ Login failed in global setup');
  }

  const body = await response.json();
  process.env.AUTH_TOKEN = body.token;

  console.log('✅ Global token generated');
}

export default globalSetup;
