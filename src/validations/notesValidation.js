import { Joi } from 'celebrate';
import { isValidObjectId } from 'mongoose';

import { TAGS } from '../constants/tags.js';

export const getAllNotesSchema = {
  query: Joi.object({
    page: Joi.number()
      .integer()
      .min(1)
      .default(1),

    perPage: Joi.number()
      .integer()
      .min(5)
      .max(20)
      .default(10),

    tag: Joi.string()
      .valid(...TAGS),

    search: Joi.string()
      .allow(''),
  }),
};

export const noteIdSchema = {
  params: Joi.object({
    noteId: Joi.string().custom((value, helpers) => {
      if (!isValidObjectId(value)) {
        return helpers.message('Invalid note id');
      }

      return value;
    }),
  }),
};

export const createNoteSchema = {
  body: Joi.object({
    title: Joi.string()
      .min(1)
      .required(),

    content: Joi.string()
      .allow(''),

    tag: Joi.string()
      .valid(...TAGS),
  }),
};

export const updateNoteSchema = {
  params: Joi.object({
    noteId: Joi.string().custom((value, helpers) => {
      if (!isValidObjectId(value)) {
        return helpers.message('Invalid note id');
      }

      return value;
    }),
  }),

  body: Joi.object({
    title: Joi.string().min(1),

    content: Joi.string().allow(''),

    tag: Joi.string().valid(...TAGS),
  }).min(1),
};