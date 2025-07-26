import express from 'express';

import { getMyDetails } from '../controllers/myController.js';
import { verify } from '../controllers/authController.js';

const myRouter = express.Router();

myRouter.route('/').get(verify, getMyDetails);

export default myRouter;
