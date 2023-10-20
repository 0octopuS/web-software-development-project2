# Project Documentation

## Introduction

This project is a web application that provides various features and functionalities to users. It includes a main page, navigation, topic management, question management, registration and login functionality, as well as a quiz feature. Additionally, it offers an API to fetch random questions and answer them.

## Application Purpose

The application's main purpose is to allow users to interact with various features, including:

- Managing topics and questions.
- Registering and logging in to the platform.
- Participating in quizzes and answering questions.
The application also provides a simple API to access random questions.

## Live Demo
You can access a live demo of the application at Demo Link, where you can explore its features.

## Running the Application Locally
To run the application locally, follow these steps:

Clone the repository to your local machine:

```bash
git clone https://github.com/your-repo-url.git
cd your-project-directory
deno run --allow-read --allow-net --allow-env  app-launch.js
```

Open your web browser and access the application at http://localhost:7777.

## Features

### Main Page

- The main page is accessible at the root path /.
- It contains a brief description of the application.
- Displays application statistics, including the total number of topics, questions, and user-provided answers.
- Provides links for user registration and login.

### Navigation

- The application includes navigation, typically implemented as a navbar.
- It offers links to different sections, such as topics and quizzes.

### Topic Management

- GET requests to /topics display a page listing available topics in alphabetical order.
- Topics are clickable links that take users to specific topic pages at /topics/:id, where :id corresponds to the database ID of the topic.

### Question Management

- Admin users can create and delete topics.
- A form for adding topics is available at /topics and is submitted as a POST request to add topics to the database.
- Validation is performed on the topic name to ensure it contains at least one character.
- Admins can delete topics, which also removes associated questions, answer options, and user answers.
- All actions are authenticated to ensure only admins can create and delete topics.

### Question Creation and Listing

- Users can add questions for a topic by making a POST request to /topics/:id/questions.
- Question text is validated for at least one character.
- Questions are linked from the topic page to specific question pages at /topics/:id/questions/:qId.

### Lists of questions are displayed on topic pages

- Clicking on a question link takes the user to the question page.

### Answer Options

- Users can add answer options to questions at /topics/:id/questions/:qId/options.
- Answer options include text and correctness indicators.
- Validation ensures the text contains at least one character.
- Correctness is checked by the server.
- Admin users can remove answer options, and questions are authenticated for access control.

## Registration and Login

- The application provides user registration at /auth/register.
- Registration form validates email and password inputs.
- After successful registration, users are redirected to the login page.
- The login page is available at /auth/login and verifies user credentials.
- Upon successful login, users are redirected to the topics page; otherwise, an error message - is displayed.

### Quiz

- Users can participate in quizzes.
- The quiz page at /quiz displays available topics.
- Users select a topic, and a random question is chosen from the database.
- Users are redirected to answer questions.
- Correct answers lead to a "Correct!" page, while incorrect answers display the correct answer option and an "Incorrect!" page.
- Users can proceed to the next question.

### API

- The application offers an API to fetch random questions.
- GET requests to /api/questions/random return random questions as JSON documents.
- Questions include attributes like questionId, questionText, and answerOptions.
- POST requests to /api/questions/answer validate answers and return correctness.

### Usage

To explore the functionality of the application, you can access the live demo provided in the "Live Demo" section. You can also follow the "Running the Application Locally" instructions to run the application on your local machine.

Enjoy using the application and exploring its features!
