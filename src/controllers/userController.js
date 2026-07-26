import createHttpError from 'http-errors';

import { User } from '../models/user.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';


export const updateUserAvatar = async (req, res) => {
  if (!req.file) {
    throw createHttpError(400, 'No file');
  }

  const userId = req.user._id;

  const result = await saveFileToCloudinary(
    req.file.buffer,
    userId,
  );

  const user = await User.findByIdAndUpdate(
    userId,
    {
      avatar: result.secure_url,
    },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  res.status(200).json({
    url: result.secure_url,
  });
};