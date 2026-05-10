import createHttpError from 'http-errors';
import { NoteCollection } from '../models/note.js';

export const getAllNotes = async (req, res) => {
  const notes = await NoteCollection.find();

  res.status(200).json(notes);
};

export const getNoteById = async (req, res) => {
  const { noteId } = req.params;

  const note = await NoteCollection.findById(noteId);

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
};