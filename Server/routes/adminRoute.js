import express from 'express';

import { createUser } from '../controllers/adminController.js';
import { protect, restrictToAdmin } from '../controllers/authController.js';

const adminRouter = express.Router();

adminRouter.route('/createUser').post(protect, restrictToAdmin, createUser);

export default adminRouter;
