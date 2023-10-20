import {sql} from '../database/database.js';

const addQuestion = async (userId, topicId, question_text) => {
  await sql`INSERT INTO questions (user_id, topic_id, question_text)
  VALUES (${userId}, ${topicId}, ${question_text})`;
};

const getQuestionsByTopic = async (topicId) => {
  return await sql`SELECT * FROM questions WHERE topic_id=${topicId}`;
};

const getQuestionByID = async (questionId) => {
  return await sql`SELECT * FROM questions WHERE id=${questionId}`;
};

const deleteQuestion = async (questionId) => {
  await sql`DELETE FROM questions WHERE id=${questionId}`;
};

const getAnswerOptionByqID = async (questionId) => {
  return await sql`SELECT * FROM question_answer_options  WHERE question_id =${
      questionId}`;
};

const addAnswerOption = async (questionId, optionText, isCorrect) => {
  await sql`INSERT INTO question_answer_options (question_id,option_text,is_correct) VALUES (${
      questionId},${optionText},${isCorrect})`;
};


const deleteAnswerOption = async (optionId) => {
  await sql`DELETE FROM question_answers WHERE question_answer_option_id=${
      optionId}`;
  await sql`DELETE FROM question_answer_options WHERE id=${optionId}`;
};


export {
  addQuestion,
  getQuestionsByTopic,
  getQuestionByID,
  getAnswerOptionByqID,
  addAnswerOption,
  deleteAnswerOption,
  deleteQuestion
};