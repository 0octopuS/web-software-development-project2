import {sql} from '../database/database.js';


const alterTable = async () => {
  await sql`ALTER TABLE topics
        ADD CONSTRAINT user_id_con
        FOREIGN KEY (user_id) REFERENCES users ON DELETE CASCADE;`;
  await sql`ALTER TABLE questions   
        ADD CONSTRAINT user_id_con
        FOREIGN KEY (user_id) REFERENCES users ON DELETE CASCADE;`;
  await sql`ALTER TABLE questions  
        ADD CONSTRAINT topic_id_con
        FOREIGN KEY (topic_id) REFERENCES topics ON DELETE CASCADE;`;
  await sql`ALTER TABLE question_answer_options   
        ADD CONSTRAINT question_id_con
        FOREIGN KEY (question_id) REFERENCES questions ON DELETE CASCADE;`;
  await sql`ALTER TABLE question_answers   
        ADD CONSTRAINT user_id_con
        FOREIGN KEY (user_id) REFERENCES users ON DELETE CASCADE;`;
  await sql`ALTER TABLE question_answers   
        ADD CONSTRAINT question_id_con
        FOREIGN KEY (question_id) REFERENCES questions ON DELETE CASCADE;`;
  await sql`ALTER TABLE question_answers   
        ADD CONSTRAINT question_answer_option_id_con
        FOREIGN KEY (question_answer_option_id) REFERENCES question_answer_options ON DELETE CASCADE;`;
};
const getStatistics = async () => {
  console.log('Enter index page, show statistics');
  return await sql`SELECT
        (SELECT COUNT(*) FROM topics) AS topicCount,
        (SELECT COUNT(*) FROM questions) AS questionCount,
        (SELECT COUNT(*) FROM question_answers) AS answerCount
    `;
};

export {getStatistics, alterTable};