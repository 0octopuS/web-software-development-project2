import {sql} from '../database/database.js';

const listTopics = async () => {
  return await sql`SELECT * FROM topics ORDER BY name`;
};

const addTopic = async (userId, name) => {
  await sql`INSERT INTO Topics
      (user_id, name)
        VALUES (${userId}, ${name})`;
};

const findTopic = async (topicId) => {
  return await sql`SELECT * FROM topics WHERE id=${topicId}`;
};

const deleteTopic = async (topicId) => {
  const questionsId =
      await sql`SELECT id FROM questions WHERE topic_id=${topicId}`;
  questionsId.forEach(async q => {
    await sql`DELETE FROM question_answers WHERE question_id =${q.id}`;
    await sql`DELETE FROM question_answer_options  WHERE question_id =${q.id}`;
  });
  await sql`DELETE FROM questions WHERE topic_id =${topicId}`;
  await sql`DELETE FROM Topics WHERE id=${topicId}`;
};

export {listTopics, addTopic, deleteTopic, findTopic};