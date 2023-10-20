import {Router} from '../deps.js';
import {authMiddleware} from '../middlewares/authMiddleware.js';

import * as apiController from './controllers/apiController.js';
import * as authenticationController from './controllers/authenticationController.js';
import * as mainController from './controllers/mainController.js';
import * as questionController from './controllers/questionController.js';
import * as quizController from './controllers/quizController.js';
import * as topicController from './controllers/topicController.js';
import * as topicsController from './controllers/topicsController.js';

const router = new Router();

router.get('/', mainController.showMain);

// Topics.eta
router.use('/topics', authMiddleware);

router.get('/topics', topicsController.getTopics);
router.post('/topics', topicsController.addTopic);
router.post('/topics/:id/delete', topicsController.deleteTopic);

// Topic.eta
router.get('/topics/:id', topicController.getTopic);

// question.eta
router.post('/topics/:id/questions', questionController.addQuestionToTopic);
router.get('/topics/:id/questions/:qId', questionController.showQuestion);
router.post(
    '/topics/:id/questions/:qId/options', questionController.addAnswerOption);
router.post(
    '/topics/:tId/questions/:qId/options/:oId/delete',
    questionController.deleteAnswerOption);
router.post(
    '/topics/:tId/questions/:qId/delete', questionController.deleteQuestion);

// router.get('/topics/:id/questions', topicsController.);

// quizs.eta
router.use('/quiz', authMiddleware);
router.get('/quiz', quizController.listTopics);

// quiz
router.get('/quiz/:tId', quizController.selectQuestionForQuiz);
router.get(
    '/quiz/:tId/questions/:qId', quizController.displayQuestionAndOptions);
router.post(
    '/quiz/:tId/questions/:qId/options/:oId',
    quizController.selectAnswerOption);
router.get(
    '/quiz/:tId/questions/:qId/correct',
    quizController.selectAnswerOptionCorrect);
router.get(
    '/quiz/:tId/questions/:qId/incorrect',
    quizController.selectAnswerOptionIncorrect);
// router.get('/quiz/:tId/questions/:qId',
// quizController.selectQuestionForQuiz);

router.get('/auth/register', authenticationController.showRegistrationForm);
router.post('/auth/register', authenticationController.postRegistrationForm);
router.get('/auth/login', authenticationController.showLoginForm);
router.post('/auth/login', authenticationController.postLoginForm);


router.get('/api/questions/random', apiController.displayQuestionAndOptionsAPI);
router.post('/api/questions/answer', apiController.disPlayAnswerAPI);
export {router};
