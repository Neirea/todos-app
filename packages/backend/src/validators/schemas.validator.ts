import Joi from 'joi';

export const todoSchema = Joi.object({
  query: Joi.object({
    skip: Joi.string().pattern(/\d+/),
    take: Joi.string().pattern(/[1-9]\d*/),
    search: Joi.string().min(1),
    status: Joi.string().valid('completed', 'private', 'public')
  }).allow({}),
  body: Joi.object({
    title: Joi.string().min(1).required(),
    description: Joi.string().required(),
    is_completed: Joi.boolean().required(),
    is_private: Joi.boolean().required(),
    user_id: Joi.string().uuid()
  }).allow({})
});

const commonUserSchema = {
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  token: Joi.string().min(80).required().messages({ 'string.min': 'Invalid token' })
};

export const userSchema = {
  sign: Joi.object({
    body: Joi.object({
      email: commonUserSchema.email,
      password: commonUserSchema.password
    })
  }),
  verify: Joi.object({
    body: Joi.object({
      email: commonUserSchema.email,
      token: commonUserSchema.token
    })
  }),
  changePassword: Joi.object({
    body: Joi.object({
      password: commonUserSchema.password,
      newPassword: commonUserSchema.password
    })
  }),
  forgotPassword: Joi.object({
    body: Joi.object({
      email: commonUserSchema.email
    })
  }),
  resetPassword: Joi.object({
    body: Joi.object({
      email: commonUserSchema.email,
      token: commonUserSchema.token,
      password: commonUserSchema.password
    })
  })
};
