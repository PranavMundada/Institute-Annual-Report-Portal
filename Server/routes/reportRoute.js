import express from 'express';
import { generateAnnualReport } from '../controllers/reportController.js';

const router = express.Router();
router.get('/download', generateAnnualReport);

export default router;
