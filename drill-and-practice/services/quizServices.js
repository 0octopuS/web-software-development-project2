import {sql} from '../database/database.js';

const getRandomQuestionByTopic = async (topicId) => {
  return await sql`SELECT * FROM questions WHERE topic_id=${
      topicId} ORDER BY RANDOM() LIMIT 1`;
};

const getRandomQuestion = async () => {
  const row = await sql`SELECT * FROM questions ORDER BY RANDOM() LIMIT 1`;
  if (row.length > 0) {
    return row[0];
  } else {
    return null;
  }
};


const getAnswerOptions = async (questionId) => {
  return await sql`SELECT * FROM question_answer_options WHERE question_id=${
      questionId}`;
};
const getQuestionText = async (questionId) => {
  const row =
      await sql`SELECT question_text FROM questions WHERE id=${questionId}`;
  return row[0].question_text;
};

const processSelectedOption = async (userId, question_id, selectedOptionId) => {
  const isCorrect =
      await sql`SELECT is_correct FROM question_answer_options WHERE id=${
          selectedOptionId}`;
  await sql`INSERT INTO question_answers (user_id, question_id, question_answer_option_id) VALUES (${
      userId},${question_id}, ${selectedOptionId})`;
  return isCorrect[0].is_correct === true;
};

const processSelectedOptionAPI = async (selectedOptionId) => {
  const isCorrect =
      await sql`SELECT is_correct FROM question_answer_options WHERE id=${
          selectedOptionId}`;
  return isCorrect[0].is_correct === true;
};

const getCorrectOption = async (questionId) => {
  return sql`SELECT * FROM question_answer_options WHERE question_id=${
      questionId} AND is_correct=true`;
};

export {
  getRandomQuestionByTopic,
  getRandomQuestion,
  getAnswerOptions,
  getQuestionText,
  processSelectedOption,
  getCorrectOption,
  processSelectedOptionAPI
};
