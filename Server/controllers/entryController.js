import APIFeatures from '../utils/ApiFeatures.js';

import Entry from './../models/entryModel.js';
import Type from './../models/typeModel.js';
import { AppError } from './../utils/AppError.js';
import { handleUpload } from './../app.js';
import { catchAsync } from '../utils/catchAsync.js';

export const createEntry = catchAsync(async (req, res, next) => {
  const { title, description, section, type, department, year, institute } =
    req.body;
  if (!title) {
    return next(new AppError('Title field is required', 404));
  }
  if (!description) {
    return next(new AppError('Description field is required', 404));
  }
  if (!section) {
    return next(new AppError('Section field is required', 404));
  }
  if (!type) {
    return next(new AppError('Type field is required', 404));
  }
  const checkSection = await Type.findById(type);
  if (section != checkSection.section) {
    return next(new AppError('Type does not matches Section', 409));
  }
  if (!year) {
    return next(new AppError('Year field is required', 404));
  }

  let imageUrl = '';

  if (req.file) {
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    let dataURI = 'data:' + req.file.mimetype + ';base64,' + b64;
    const cldRes = await handleUpload(dataURI);
    imageUrl = cldRes.secure_url;
  }

  const uploadedBy = req.userId;
  console.log(req.userId, '!');

  const newEntry = await Entry.create({
    title,
    description,
    images: imageUrl,
    department,
    section,
    type,
    year,
    uploadedBy,
    institute,
  });

  res.status(201).json({
    status: 'success',
    data: newEntry,
  });
});

export const getAllEntries = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    Entry.find().populate('section').populate('type'),
    req.query
  )
    .filter()
    .sort();
  const entries = await features.query;
  if (!entries) {
    return next(new AppError('No Entries Found', 404));
  }
  res.status(200).json({
    status: 'success',
    totalEntries: entries.length,
    entries,
  });
});

export const getEntry = catchAsync(async (req, res, next) => {
  const entry = await Entry.findById(req.params.id)
    .populate('section')
    .populate('type')
    .populate('uploadedBy');
  if (!entry) {
    return next(new AppError('Entry not found', 404));
  }
  res.status(200).json({
    status: 'success',
    entry,
  });
});

export const deleteEntry = catchAsync(async (req, res, next) => {
  await Entry.findByIdAndDelete(req.params.id);
  res.status(204).json({});
});

export const updateEntry = catchAsync(async (req, res, next) => {
  const response = await Entry.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true, runValidators: true }
  );
  if (!response) {
    return next(new AppError('entry not found'));
  }
  res.status(200).json({
    status: 'success',
    response,
  });
});

export const getAllEntriesOfInstitute = catchAsync(async (req, res, next) => {
  // const params=req.params;
  const entries = await Entry.find({ institute: req.params.institute })
    .populate('section')
    .populate('type');
  if (!entries) {
    return next(new AppError('No Entries Found', 404));
  }
  res.status(200).json({
    status: 'success',
    totalEntires: entries.length,
    entries,
  });
});
