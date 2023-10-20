const {test, expect} = require('@playwright/test');
test(
    'Unauthorized user is redirected to /auth/login when accessing /topics',
    async ({page}) => {
      // Navigate to the /topics page without being logged in
      await page.goto('/topics');
      // Verify that the user is now on the /auth/login page
      expect(page.url()).toMatch(/^https?:\/\/[^/]+\/auth\/login$/);
    });

test(
    'GET request to /topics lists topics and allows clicking',
    async ({page}) => {
      await page.goto('/auth/login');

      // Fill in the email and password fields
      await page.fill('input[name="email"]', 'admin@admin.com');
      await page.fill('input[name="password"]', '123456');

      // Submit the login form
      await page.click('button[type="submit"]');


      // Navigate to the /topics page
      await page.goto('/topics');

      // Verify that the page lists topics
      const topicList =
          await page.$('.topic-list');  // Replace with the actual selector
      expect(topicList).toBeTruthy();

      // Get the topic links
      const topicLinks = await topicList.$$(
          'a.topic-link');  // Replace with the actual selector

      // Check if there are at least two topics
      expect(topicLinks.length).toBeGreaterThanOrEqual(1);

      //   // Click on the first topic link
      await topicLinks[0].click();

      //   // Wait for navigation to complete
      //   await page.waitForNavigation();

      //   // Verify that the URL matches the expected pattern
      const currentURL = page.url();
      expect(currentURL).toMatch(/^https?:\/\/[^/]+\/topics\/\d+$/);

      //   // You can extract the topic ID from the URL for further testing
      //   const topicId = currentURL.split('/').pop();
    });

test(
    'Authenticated admin can add a topic via the /topics page',
    async ({page}) => {
      // Simulate authentication as an admin (you may need to adjust this
      // according to your authentication mechanism) For example, log in as
      // admin user before navigating to the /topics page.
      await page.goto('/auth/login');

      // Fill in the email and password fields
      await page.fill('input[name="email"]', 'admin@admin.com');
      await page.fill('input[name="password"]', '123456');

      // Submit the login form
      await page.click('button[type="submit"]');

      // Verify that the page contains a form for adding a topic
      const addTopicForm = await page.$(
          'form#add-topic-form');  // Replace with the actual selector
      expect(addTopicForm).toBeTruthy();

      // Verify that the form asks for the name of the topic
      const topicNameInput = await addTopicForm.$(
          'input[name=name]');  // Replace with the actual selector
      expect(topicNameInput).toBeTruthy();

      // Fill in the topic name in the input field
      //   await topicNameInput.type('New Topic');
      await page.locator('input[type=text]').type('My cool new task');
      // Submit the form
      //   await addTopicForm.$eval(
      //       'button[type="submit"]', (button) => button.click());
      await page.locator('button[id=addTopic]').click();
      //   await page.waitForNavigation();
      expect(page.url()).toMatch(/^https?:\/\/[^/]+\/topics$/);
    });

test('Navigation from quiz to topic quiz', async ({page}) => {
  // Navigate to the quiz page
  await page.goto('/quiz');
  await page.fill('input[name="email"]', 'admin@admin.com');
  await page.fill('input[name="password"]', '123456');

  // Submit the login form
  await page.click('button[type="submit"]');



  // Click on a topic link to start a quiz
  const topicLink =
      await page.$('a.topic-link');  // Replace with the actual selector
  expect(topicLink).toBeTruthy();

  // Get the topic ID from the link (replace "topicId" with the actual ID
  // attribute)
  // Click on the topic link
  await topicLink.click();
});
