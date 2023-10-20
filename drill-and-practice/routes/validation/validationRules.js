import {validasaur} from '../../deps.js';

const topicValidationRules = {
  name: [validasaur.minLength(1)],
};

const questionValidationRules = {
  question_text: [validasaur.minLength(1)],
};

const anwerOptionValidationRules = {
  option_text: [validasaur.minLength(1)],
};

const userRules = {
  email: [validasaur.isEmail, validasaur.required],
  password: [validasaur.minLength(4), validasaur.required],
}

const validate = async (text, rule) => {
  return await validasaur.validate(text, rule);
};

export {
  topicValidationRules,
  questionValidationRules,
  anwerOptionValidationRules,
  userRules,
  validate,
}