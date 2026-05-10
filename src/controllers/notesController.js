import { NoteCollection } from '../models/note.js';

export const getAllNotes = async (req, res) => {
  const notes = await NoteCollection.find();

  res.status(200).json(notes);
};