
import * as questionServices from '../../services/questionServices.js';
import * as topicsServices from '../../services/topicsServices.js';

const getTopic = async ({params, render}) => {
  // Clicking on a link moves the user to the path /topics/:id, where :id refers
  // to the database id of the topic whose link was clicked.
  const topicId = params.id;
  const topic = await topicsServices.findTopic(topicId);
  const questions = await questionServices.getQuestionsByTopic(topicId);
  const data = {
    topic: topic[0],
    questions: questions,
  };
  // console.log(data);
  render('topic.eta', data);
};



export {getTopic}