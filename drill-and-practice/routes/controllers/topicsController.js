import * as topicService from '../../services/topicsServices.js';
import * as userServices from '../../services/userServices.js';
import {topicValidationRules, validate} from '../validation/validationRules.js'


const getTopics = async ({render, state}) => {
  const userId = await state.session.get('user').id;
  const data = {
    topics: await topicService.listTopics(),
    admin: await userServices.isAdmin(userId),
  };
  console.log(userId, data);
  render('topics.eta', data);
};


const addTopic = async ({request, response, render, state}) => {
  const body = request.body({type: 'form'});
  const bodyform = await body.value;
  const userId = await state.session.get('user').id;
  const isAdmin = await userServices.isAdmin(userId);
  if (isAdmin === false) {
    response.redirect('/topics');
    return;
  }
  const topicText = bodyform.get('name');

  const [passes, errors] = await validate(
      topicText,
      topicValidationRules,
  );


  if (!passes) {
    // If validation fails, render the form again with validation errors and
    // populated data
    const data = {
      topics: await topicService.listTopics(),
      admin: isAdmin,
      validationError: errors,
      formData: {
        name: topicText,
      },
    };
    render('topics.eta', data);
  } else {
    // If validation passes, insert the question into the database
    try {
      // Insert the question into the database
      await topicService.addTopic(
          userId,
          topicText,
      );
      response.redirect(`/topics`);
    } catch (error) {
      console.error('Database error:', error);
    }
  }


  response.redirect('/topics');
};

const deleteTopic = async ({params, state, response}) => {
  // console.log('>>>>>>>>>>>>>>>>>> imhere');
  // const body = request.body({type: 'form'});
  // const bodyform = await body.value;
  const userId = await state.session.get('user').id;
  const isAdmin = await userServices.isAdmin(userId);

  if (isAdmin === false) {
    response.redirect('/topics');
    return;
  }

  const topicId = params.id;
  await topicService.deleteTopic(topicId);
  response.redirect('/topics');
};


export {getTopics, addTopic, deleteTopic};