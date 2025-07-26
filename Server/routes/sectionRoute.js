import express from 'express';
import {
  getAllSections,
  createSection,
  getSection,
  getTypesOfSection,
} from '../controllers/sectionController.js';

const sectionRouter = express.Router();

sectionRouter.route('/').get(getAllSections).post(createSection);
sectionRouter.route('/:id').get(getSection);
sectionRouter.route('/:id/types').get(getTypesOfSection);

export default sectionRouter;
