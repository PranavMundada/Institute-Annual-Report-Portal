import express from 'express';
import {
  createNewType,
  getAllTypes,
  getType,
} from '../controllers/typeController.js';

const typeRouter = express.Router();

typeRouter.route('/').post(createNewType).get(getAllTypes);

typeRouter.route('/:id').get(getType);

export default typeRouter;
