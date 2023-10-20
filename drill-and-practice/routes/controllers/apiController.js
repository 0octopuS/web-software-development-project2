
import * as quizServices from '../../services/quizServices.js';
import * as topicsServices from '../../services/topicsServices.js';
import {anwerOptionValidationRules, questionValidationRules, validate} from '../validation/validationRules.js'

const displayQuestionAndOptionsAPI = async ({response}) => {
  response.type = 'json';
  const randomQuestion = await quizServices.getRandomQuestion();
  if (randomQuestion === null) {
    response.body = '';
    return;
  }

  const questionId = randomQuestion.id;
  const questionText = randomQuestion.question_text;
  console.log(randomQuestion);
  // Retrieve the question text
  //   const questionText = await quizServices.getQuestionText(questionId);


  // Retrieve the answer options for the question
  const answerOptions = await quizServices.getAnswerOptions(questionId);

  const answerOptionsMsg = [];
  answerOptions.forEach(
      (item) => {answerOptionsMsg.push(
          {'optionId': item.id, 'optionText': item.option_text})});

  const data = {
    questionId: questionId,
    questionText: questionText,
    answerOptions: answerOptionsMsg,
  };
  response.body = data;
};

const disPlayAnswerAPI = async ({request, response}) => {
  const body = request.body({type: 'json'});
  // note, this is not a function call!
  const content = await body.value;
  const questionId = content.questionId;
  const optionId = content.optionId;
  const isCorrect = await quizServices.processSelectedOptionAPI(optionId);
  response.type = 'json';
  if (isCorrect === true) {
    response.body = {correct: true};
  } else {
    response.body = {correct: false};
  }
};



export {displayQuestionAndOptionsAPI, disPlayAnswerAPI};