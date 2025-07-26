import express from 'express';
import {
  createEntry,
  deleteEntry,
  getAllEntries,
  getAllEntriesOfInstitute,
  getEntry,
  updateEntry,
} from '../controllers/entryController.js';
import { upload } from '../multer.js';
import { verify } from '../controllers/authController.js';

const entryRouter = express.Router();

entryRouter.post('/', upload.single('file'), verify, createEntry);

entryRouter.route('/').get(getAllEntries);
entryRouter.route('/instituteEntries/:institute').get(getAllEntriesOfInstitute);

entryRouter.route('/:id').get(getEntry).delete(deleteEntry).patch(updateEntry);

export default entryRouter;
