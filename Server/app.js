import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import cloudinary from 'cloudinary';

import userRouter from './routes/userRoute.js';
import adminRouter from './routes/adminRoute.js';
import myRouter from './routes/myRoute.js';
import sectionRouter from './routes/sectionRoute.js';
import { globalErrorHandler } from './controllers/errorController.js';
import typeRouter from './routes/typeRouter.js';
import entryRouter from './routes/entryRoute.js';
import reportRoutes from './routes/reportRoute.js';
import { upload } from './multer.js';

dotenv.config({ path: './.env' });

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true, // ✅ allow cookies to be sent
  })
);

app.use(cookieParser());

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('');
});

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
export async function handleUpload(file) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: 'auto',
  });
  return res;
}

app.use('/api/users', userRouter);
app.use('/api/admin', adminRouter);
app.use('/api/me', myRouter);
app.use('/api/section', sectionRouter);
app.use('/api/type', typeRouter);
app.use('/api/entry', entryRouter);
app.use('/api/report', reportRoutes);

app.use(globalErrorHandler);

export default app;
