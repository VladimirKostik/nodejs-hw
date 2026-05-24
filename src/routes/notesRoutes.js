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

router.use(authenticate);

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
  celebrate(updateNoteSchema),
  updateNote,
);

export default router;