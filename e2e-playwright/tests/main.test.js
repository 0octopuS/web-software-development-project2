const {test, expect} = require('@playwright/test');

test(
    'Main page contains description, statistics, and links', async ({page}) => {
      // Navigate to the root path
      await page.goto('/');

      // Check if the main page contains a brief description
      const descriptionElement = await page.$('#description');
      expect(descriptionElement).toBeTruthy();

      // Check if the main page contains application statistics
      const statisticsElement = await page.$('#statistics');
      expect(statisticsElement).toBeTruthy();

      // Check if there are links for registration and login
      const registrationLink = await page.$('a[href="/auth/register"]');
      const loginLink = await page.$('a[href="/auth/login"]');
      expect(registrationLink).toBeTruthy();
      expect(loginLink).toBeTruthy();

      // Verify the application statistics
      const totalTopics =
          await page.$eval('#total-topics', (element) => element.innerText);
      const totalQuestions =
          await page.$eval('#total-questions', (element) => element.innerText);
      const totalAnswers =
          await page.$eval('#total-answers', (element) => element.innerText);
      expect(totalTopics).toBeTruthy();
      expect(totalQuestions).toBeTruthy();
      expect(totalAnswers).toBeTruthy();
    });


test(
    'Application has navigation with links to topics and quiz',
    async ({page}) => {
      // Navigate to the root path
      await page.goto('/');

      // Find the navigation element, typically represented as a navbar
      const navbar = await page.$(
          '.navbar');  // Replace with the actual selector for your navbar

      // Check if the "Topics" link exists in the navigation
      const topicsLink = await navbar.$(
          'a[href="/topics"]');  // Replace with the actual selector
      expect(topicsLink).toBeTruthy();

      // Check if the "Quiz" link exists in the navigation
      const quizLink = await navbar.$(
          'a[href="/quiz"]');  // Replace with the actual selector
      expect(quizLink).toBeTruthy();
    });
