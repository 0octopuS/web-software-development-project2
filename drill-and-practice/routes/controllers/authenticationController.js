import * as bcrypt from 'https://deno.land/x/bcrypt@v0.4.1/mod.ts';

import * as userServices from '../../services/userServices.js';
import {userRules, validate} from '../validation/validationRules.js'

const showRegistrationForm = ({render}) => {
  const data = {
    email: '',
    validationError: [],
  };
  render('register.eta', data);
};

const postRegistrationForm = async ({request, response, render}) => {
  const body = request.body();
  const params = await body.value;

  const user = {
    email: params.get('email'),
    password: params.get('password'),
  };
  const data = {
    email: '',
    validationError: [],
  };
  const [passes, errors] = await validate(
      user,
      userRules,
  );
  if (!passes) {
    // If validation fails, render the form again with validation errors and
    // populated data
    data.email = user.email;
    data.validationError = errors;
    console.log(data);
    // response.body = data;
    render('register.eta', data);
    return;
  }
  const existingUsers = await userServices.findUsersWithEmail(user.email);
  if (existingUsers.length > 0) {
    response.body = 'The email is already reserved.';
    return;
  }

  const hash = await bcrypt.hash(user.password);
  await userServices.addUser(user.email, hash);
  response.redirect('/auth/login');
};

const postLoginForm = async ({request, response, state, render}) => {
  const body = request.body();
  const params = await body.value;

  const email = params.get('email');
  const password = params.get('password');

  const existingUsers = await userServices.findUsersWithEmail(email);
  if (existingUsers.length === 0) {
    render('login.eta', {
      validationError: {user: {noExistedUser: 'No registered username found.'}}
    });
    return;
  }

  // take the first row from the results
  const userObj = existingUsers[0];

  const hash = userObj.password;

  const passwordCorrect = await bcrypt.compare(password, hash);
  if (!passwordCorrect) {
    render('login.eta', {
      validationError: {password: {wrongPassword: 'The password unmatchs.'}}
    });
    return;
  }

  await state.session.set('authenticated', true);
  await state.session.set('user', {
    id: userObj.id,
    email: userObj.email,
  });
  response.redirect('/topics');
};

const showLoginForm = ({render}) => {
  render('login.eta');
};

export {
  postLoginForm,
  postRegistrationForm,
  showLoginForm,
  showRegistrationForm,
};
