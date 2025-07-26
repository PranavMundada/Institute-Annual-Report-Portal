import { AppError } from '../utils/AppError.js';
import { catchAsync } from '../utils/catchAsync.js';
import Section from './../models/sectionModel.js';
import Type from './../models/typeModel.js';

export const getAllSections = catchAsync(async (req, res, next) => {
  const sections = await Section.find();
  res.status(200).json({
    status: 'success',
    sections,
  });
});

export const createSection = catchAsync(async (req, res, next) => {
  const name = req.body.name;
  if (!name) {
    return next(new AppError('name field is required.', 400));
  }

  const alreadySection = await Section.findOne({ name: req.body.name });
  if (alreadySection) {
    return next(new AppError('already present', 409));
  }

  const section = await Section.create({ name: name.trim() });
  res.status(201).json({
    status: 'success',
    section,
  });
});

export const getSection = catchAsync(async (req, res, next) => {
  const section = await Section.findById(req.params.id);
  if (!section) {
    return next(new AppError('Section not found', 404));
  }
  res.status(200).json({
    status: 'success',
    section,
  });
});

export const getTypesOfSection = catchAsync(async (req, res, next) => {
  const section = await Section.findById(req.params.id);
  if (!section) {
    return next(new AppError('Section not found', 404));
  }
  const types = await Type.find({ section: req.params.id }).select('-section');
  if (!types) {
    return next(new AppError('Types for this section not found', 404));
  }

  res.status(200).json({
    status: 'success',
    section,
    types,
  });
});
