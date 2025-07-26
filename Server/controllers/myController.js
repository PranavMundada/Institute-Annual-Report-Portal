import { catchAsync } from '../utils/catchAsync.js';
import { User } from '../models/userModel.js';
import { AppError } from '../utils/AppError.js';

export const getMyDetails = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.userId);

  if (!user) {
    return next(new AppError('No user Exists ', 404));
  }
  console.log(user);

  res.status(201).json({
    status: 'success',
    user,
  });
});
