import createHttpError from 'http-errors';
import { Note } from '../models/note.js';

export const getAllNotes = async (req, res) => {
  const {
    tag,
    search,
    page = 1,
    perPage = 10,
  } = req.query;

  const pageNumber = Number(page);
  const perPageNumber = Number(perPage);

  const skip = (pageNumber - 1) * perPageNumber;

  const buildQuery = () => {
    let query = Note.find()
      .where('userId')
      .equals(req.user._id);

    if (tag) {
      query.where('tag').equals(tag);
    }

    if (search) {
      query.or([
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

    return query;
  };

  const [notes, totalNotes] = await Promise.all([
    buildQuery()
      .skip(skip)
      .limit(perPageNumber),

    buildQuery()
      .countDocuments(),
  ]);

  res.status(200).json({
    page: pageNumber,
    perPage: perPageNumber,
    totalNotes,
    totalPages: Math.ceil(totalNotes / perPageNumber),
    notes,
  });
};

export const getNoteById = async (req, res) => {
  const { noteId } = req.params;

  const note = await Note.findOne({
    _id: noteId,
    userId: req.user._id,
  });

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
};


export const createNote = async (req, res) => {
  const note = await Note.create({
    ...req.body,
    userId: req.user._id,
  });

  res.status(201).json(note);
};


export const updateNote = async (req, res) => {
  const { noteId } = req.params;

  const note = await Note.findOneAndUpdate(
    {
      _id: noteId,
      userId: req.user._id,
    },
    req.body,
    {
      returnDocument: 'after',
    },
  );

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
};


export const deleteNote = async (req, res) => {
  const { noteId } = req.params;

  const note = await Note.findOneAndDelete({
    _id: noteId,
    userId: req.user._id,
  });

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
};