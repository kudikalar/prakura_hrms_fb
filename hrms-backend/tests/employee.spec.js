import { test, expect } from '@playwright/test';

let employeeId;

test('Create Employee', async ({ request }) => {
  const response = await request.post('/api/employees', {
    headers: {
      Authorization: `Bearer ${process.env.AUTH_TOKEN}`
    },
    data: {
      name: "Ramesh Kumar",
      email: `ramesh_${Date.now()}@company.com`,
      role: "EMPLOYEE"
    }
  });

  expect(response.status()).toBe(201);

  const body = await response.json();
  console.log("CREATE RESPONSE:", body);

  employeeId = body.employee?.id;

  expect(employeeId).toBeTruthy();
});

test('Get Employee By ID', async ({ request }) => {
  const response = await request.get(`/api/employees/${employeeId}`, {
    headers: {
      Authorization: `Bearer ${process.env.AUTH_TOKEN}`
    }
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.id).toBe(employeeId);
});

test('Update Employee', async ({ request }) => {
  const response = await request.put(`/api/employees/${employeeId}`, {
    headers: {
      Authorization: `Bearer ${process.env.AUTH_TOKEN}`
    },
    data: {
      name: "Ramesh Updated",
      role: "EMPLOYEE"
    }
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.name).toBe("Ramesh Updated");
});

test('Delete Employee', async ({ request }) => {
  const response = await request.delete(`/api/employees/${employeeId}`, {
    headers: {
      Authorization: `Bearer ${process.env.AUTH_TOKEN}`
    }
  });

  expect(response.status()).toBe(200);
});
