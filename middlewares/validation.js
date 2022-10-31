const { celebrate, Joi } = require('celebrate');
const { isURL } = require('validator');
const { errorCustomText } = require('../configs/constants');

const validateUrl = (value, helpers) => {
  if (isURL(value)) {
    return value;
  }
  return helpers.message(errorCustomText);
};

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const validateRegistration = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
});

const validateUserInfo = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
});

const validateMovieInfo = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2),
    director: Joi.string().required().min(2),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required().min(2),
    image: Joi.string().required().custom(validateUrl),
    trailerLink: Joi.string(),
    thumbnail: Joi.string().required().custom(validateUrl),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required().min(1),
    nameEN: Joi.string().min(1),
  }),
});

const validateMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().length(24).hex(),
  }),
});

module.exports = {
  validateLogin,
  validateRegistration,
  validateUserInfo,
  validateMovieInfo,
  validateMovieId,
};
