import * as questionServices from '../../services/questionServices.js';
import * as quizServices from '../../services/quizServices.js';
import * as topicsServices from '../../services/topicsServices.js';

const listTopics = async ({render}) => {
  // Retrieve a list of topics sorted alphabetically (you need to implement
  // this)
  const topics = await topicsServices.listTopics();

  render('quizs.eta', {
    title: 'Quiz Topics',
    topics,
  });
};
const selectQuestionForQuiz = async ({params, render, response}) => {
  const topicId = params.tId;
  // Retrieve all questions for the selected topic
  const questions = await questionServices.getQuestionsByTopic(topicId);
  console.log(questions);
  if (questions === null || questions.length === 0) {
    // If there are no questions, inform the user
    render('quiz.eta', {
      title: 'No Questions Available',
    });
  } else {
    // Randomly choose a question
    const randomQuestion = await quizServices.getRandomQuestionByTopic(topicId);

    // Redirect the user to the question page
    response.redirect(`/quiz/${topicId}/questions/${randomQuestion[0].id}`);
  }
};

const displayQuestionAndOptions = async ({params, render}) => {
  const topicId = params.tId;
  const questionId = params.qId;

  // Retrieve the question text
  const questionText = await quizServices.getQuestionText(questionId);
  console.log(questionText);

  // Retrieve the answer options for the question
  const answerOptions = await quizServices.getAnswerOptions(questionId);
  render('quiz.eta', {
    title: 'Question and Answer Options',
    topicId,
    questionId,
    questionText,
    answerOptions,
  });
};

const selectAnswerOption = async ({state, params, response}) => {
  const topicId = params.tId;
  const questionId = params.qId;
  const selectedOptionId = params.oId;
  const userId = await state.session.get('user').id;

  // Process the selected answer option (you need to implement this logic)
  const isCorrect = await quizServices.processSelectedOption(
      userId, questionId, selectedOptionId);

  if (isCorrect === true) {
    response.redirect(`/quiz/${topicId}/questions/${questionId}/correct`)
    // Handle the case when the answer is correct
    // render('correct.eta', {
    //   title: 'Correct Answer',
    //   topicId,
    // });
  } else {
    response.redirect(`/quiz/${topicId}/questions/${questionId}/incorrect`)
    // Handle the case when the answer is incorrect
    // const correctOption = await quizServices.getCorrectOption(questionId);
    // console.log(correctOption);
    // render('incorrect.eta', {
    //   title: 'Incorrect Answer',
    //   topicId,
    //   correctOption,
    // });
  }
};

const selectAnswerOptionCorrect = async ({params, render}) => {
  const topicId = params.tId;
  const questionId = params.qId;
  render('correct.eta', {
    title: 'Correct Answer',
    topicId,
  });
};

const selectAnswerOptionIncorrect = async ({params, render}) => {
  const topicId = params.tId;
  const questionId = params.qId;
  const correctOption = await quizServices.getCorrectOption(questionId);
  render('incorrect.eta', {
    title: 'Incorrect Answer',
    topicId,
    correctOption,
  });
};

export {
  selectQuestionForQuiz,
  listTopics,
  displayQuestionAndOptions,
  selectAnswerOption,
  selectAnswerOptionCorrect,
  selectAnswerOptionIncorrect,
}