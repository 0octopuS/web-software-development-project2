
import * as questionServices from '../../services/questionServices.js';
import * as topicsServices from '../../services/topicsServices.js';
import {anwerOptionValidationRules, questionValidationRules, validate} from '../validation/validationRules.js'


const addQuestionToTopic =
    async ({params, state, request, response, render}) => {
  const topicId = params.id;
  const user = await state.session.get('user');
  if (user === null) {
    response.redirect(`/topics`);
    return;
  }
  const userId = user.id;
  const body = request.body({type: 'form'});
  const bodyform = await body.value;
  const questionText = bodyform.get('question_text');
  console.log(questionText);
  // Perform validation

  const [passes, errors] = await validate(
      questionText,
      questionValidationRules,
  );

  if (!passes) {
    // If validation fails, render the form again with validation errors and
    // populated data
    const topic = await topicService.findTopic(topicId);
    const questions = await questionServices.getQuestionsByTopic(topicId);
    const data = {
      topics: topic[0],
      questions: questions,
      validationError: errors,
      formData: {
        question_text: questionText,
      },
    };
    render('topic.eta', data);
  } else {
    // If validation passes, insert the question into the database
    try {
      // Insert the question into the database
      await questionServices.addQuestion(userId, topicId, questionText);
      console.log('addqestion');
      response.redirect(`/topics/${topicId}`);
    } catch (error) {
      console.error('Database error:', error);
    }
  }
  response.redirect(`/topics/${topicId}`);
};

const showQuestion = async ({params, render}) => {
  const topicId = params.id;
  const questionId = params.qId;

  const question = await questionServices.getQuestionByID(questionId);
  const answerOptions = await questionServices.getAnswerOptionByqID(questionId);
  const data = {
    topicId: topicId,
    question: question[0],
    answerOptions: answerOptions,
  };
  console.log(data);
  render('question.eta', data);
};

const addAnswerOption = async ({params, request, render, response}) => {
  const topicId = params.id;
  const questionId = params.qId;
  const body = request.body({type: 'form'});
  const bodyform = await body.value;
  const optionText = bodyform.get('option_text');
  const isCorrect = bodyform.get('is_correct') === 'on';
  console.log(bodyform);
  const [passes, errors] = await validate(
      optionText,
      anwerOptionValidationRules,
  );
  // Validate the answer option
  if (!passes) {
    // Handle validation errors and redisplay the question page
    const questionText = await questionService.getQuestionByID(questionId);
    const answerOptions =
        await questionService.getAnswerOptionByqID(questionId);

    render('question.eta', {
      title: 'Question Page',
      topicId,
      questionId,
      questionText,
      answerOptions,
      validationError: errors,
    });
  } else {
    // Insert the answer option into the database
    await questionServices.addAnswerOption(questionId, optionText, isCorrect);
    // Redirect to the question page
    response.redirect(`/topics/${topicId}/questions/${questionId}`);
  }
};
const deleteAnswerOption = async ({params, response}) => {
  const topicId = params.tId;
  const questionId = params.qId;
  const optionId = params.oId;
  await questionServices.deleteAnswerOption(optionId);
  response.redirect(`/topics/${topicId}/questions/${questionId}`);
};

const deleteQuestion = async ({params, response}) => {
  const topicId = params.tId;
  const questionId = params.qId;
  await questionServices.deleteQuestion(questionId);
  response.redirect(`/topics/${topicId}`);
};

export {
  addQuestionToTopic,
  showQuestion,
  addAnswerOption,
  deleteAnswerOption,
  deleteQuestion
};
