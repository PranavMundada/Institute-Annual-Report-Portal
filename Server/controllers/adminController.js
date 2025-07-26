import { User } from '../models/userModel.js';

export const createUser = async (req, res) => {
  const newUser = await User.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      newUser,
    },
  });
};
