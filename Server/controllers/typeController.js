import { AppError } from '../utils/AppError.js';
import { catchAsync } from '../utils/catchAsync.js';
import Section from './../models/sectionModel.js';
import Type from '../models/typeModel.js';

export const createNewType = catchAsync(async (req, res, next) => {
  const { name, section } = req.body;
  if (!name) {
    return next(new AppError('name field is required', 400));
  }
  if (!section) {
    return next(new AppError('section field is required', 400));
  }
  if (!(await Section.findById(section))) {
    return next(new AppError('Section not Found', 404));
  }

  if (await Type.findOne({ name })) {
    return next(new AppError('This Type Already exists', 409));
  }
  const newType = await Type.create({ name, section });

  res.status(201).json({
    status: 'success',
    type: newType,
  });
});

export const getAllTypes = catchAsync(async (req, res, next) => {
  const allTypes = await Type.find();
  res.status(200).json({
    status: 'success',
    Types: allTypes,
  });
});

export const getType = catchAsync(async (req, res, next) => {
  const type = await Type.findById(req.params.id);
  if (!type) {
    return next(new AppError('Type not found', 404));
  }
  res.status(200).json({
    status: 'success',
    type,
  });
});
