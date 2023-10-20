const {test, expect} = require('@playwright/test');

test('GET request to /auth/login displays a login form', async ({page}) => {
  // Navigate to the /auth/login page
  await page.goto('/auth/login');

  // Verify the presence of the login form
  const loginForm =
      await page.$('form#login-form');  // Replace with the actual selector
  expect(loginForm).toBeTruthy();

  // Verify that the login form contains email and password input fields
  const emailInput = await loginForm.$('input[name="email"]');
  const passwordInput = await loginForm.$('input[name="password"]');
  expect(emailInput).toBeTruthy();
  expect(passwordInput).toBeTruthy();

  // Verify the presence of a submit button
  const submitButton = await loginForm.$('button[type="submit"]');
  expect(submitButton).toBeTruthy();
});


test(
    'POST request to /auth/login with valid credentials redirects to /topics',
    async ({page}) => {
      // Navigate to the login page
      await page.goto('/auth/login');

      // Fill in the email and password fields with valid credentials
      await page.fill(
          'input[name="email"]',
          'admin@admin.com');  // Replace with valid email
      await page.fill(
          'input[name="password"]', '123456');  // Replace with valid password

      // Submit the login form
      await page.click('button[type="submit"]');

      // Verify that the user is redirected to the /topics page
      expect(page.url())
          .toMatch(
              /^https?:\/\/[^/]+\/topics$/);  // Adjust the pattern as needed
    });

test(
    'POST request to /auth/login with invalid credentials shows an error message',
    async ({page}) => {
      // Navigate to the login page
      await page.goto('/auth/login');

      // Fill in the email and password fields with invalid credentials
      await page.fill(
          'input[name="email"]',
          'invalidemail@example.com');  // Replace with invalid email
      await page.fill(
          'input[name="password"]',
          'invalidpassword');  // Replace with invalid password

      // Submit the login form
      await page.click('button[type="submit"]');

      // Wait for the login attempt and the display of the login page with an
      // error message
      await page.waitForSelector(
          '#error-message');  // Replace with the actual error message selector
      const errorMessage = await page.textContent(
          '#error-message');  // Extract the error message text

      // Verify that an error message is displayed
      expect(errorMessage)
          .toContain(
              'No registered username found.');  // Adjust the error message
                                                 // text as needed
    });

test('User registration redirects to login page', async ({page}) => {
  // Navigate to the registration page
  await page.goto('/auth/register');

  // Fill in the registration form with valid data
  await page.fill('input[name="email"]', 'testuser@example.com');
  await page.fill('input[name="password"]', 'password123');

  // Submit the registration form
  await page.click('button[type="submit"]');
  await page.goto('/auth/login');

  // Fill in the email and password fields with valid credentials
  await page.fill(
      'input[name="email"]',
      'testuser@example.com');  // Replace with valid email
  await page.fill(
      'input[name="password"]', 'password123');  // Replace with valid password
  await page.click('button[type="submit"]');
  expect(page.url())
      .toMatch(/^https?:\/\/[^/]+\/topics$/);  // Adjust the pattern as needed
});
