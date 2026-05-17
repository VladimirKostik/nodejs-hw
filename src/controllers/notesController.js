import createHttpError from 'http-errors';

import { Note } from '../models/note.js';

export const getAllNotes = async (req, res) => {
  const { page = 1, perPage = 10, tag, search } = req.query;

  const pageNumber = Number(page);
  const perPageNumber = Number(perPage);

  const skip = (pageNumber - 1) * perPageNumber;

  let notesQuery = Note.find();

  if (tag) {
    notesQuery = notesQuery.where('tag').equals(tag);
  }

  if (search) {
    notesQuery = notesQuery.or([
      {
        title: {
          $regex: search,
          $options: 'i',
        },
      },
      {
        content: {
          $regex: search,
          $options: 'i',
        },
      },
    ]);
  }

  const [totalNotes, notes] = await Promise.all([
    Note.find(notesQuery.getFilter()).countDocuments(),
    notesQuery.skip(skip).limit(perPageNumber),
  ]);

  const totalPages = Math.ceil(totalNotes / perPageNumber);

  res.status(200).json({
    page: pageNumber,
    perPage: perPageNumber,
    totalNotes,
    totalPages,
    notes,
  });
};

export const getNoteById = async (req, res) => {
  const { noteId } = req.params;

  const note = await Note.findById(noteId);

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
};

export const createNote = async (req, res) => {
  const note = await Note.create(req.body);

  res.status(201).json(note);
};

export const deleteNote = async (req, res) => {
  const { noteId } = req.params;

  const note = await Note.findByIdAndDelete(noteId);

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
};

export const updateNote = async (req, res) => {
  const { noteId } = req.params;

  const updatedNote = await Note.findByIdAndUpdate(
    noteId,
    req.body,
    {
      returnDocument: 'after',
    }
  );

  if (!updatedNote) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(updatedNote);
};