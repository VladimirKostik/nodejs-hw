import { Router } from 'express';
import { celebrate } from 'celebrate';

import {
  getAllNotes,
  getNoteById,
  createNote,
  deleteNote,
  updateNote,
} from '../controllers/notesController.js';

import {
  getAllNotesSchema,
  noteIdSchema,
  createNoteSchema,
  updateNoteSchema,
} from '../validations/notesValidation.js';

import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.use('/notes', authenticate);

router.get(
  '/notes',
  celebrate({
    query: getAllNotesSchema,
  }),
  getAllNotes,
);

router.get(
  '/notes/:noteId',
  celebrate({
    params: noteIdSchema,
  }),
  getNoteById,
);

router.post(
  '/notes',
  celebrate({
    body: createNoteSchema,
  }),
  createNote,
);

router.delete(
  '/notes/:noteId',
  celebrate({
    params: noteIdSchema,
  }),
  deleteNote,
);

router.patch(
  '/notes/:noteId',
  celebrate({
    params: updateNoteSchema.params,
    body: updateNoteSchema.body,
  }),
  updateNote,
);

export default router;