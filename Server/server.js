import dotenv from 'dotenv';
import mongoose from 'mongoose';
import fs from 'fs';
import { User } from './models/userModel.js';

import { createServer } from 'http';

import app from './app.js';

dotenv.config({ path: './.env' });

const server = createServer(app);

const DB = process.env.DATABASE.replace(
  '<DATABASE_PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
  console.log('connected to database');
});

const port = process.env.PORT;
server.listen(port, () => {
  console.log('Server running on port 3000');
});

process.once('SIGUSR2', () => {
  server.close(() => {
    process.kill(process.pid, 'SIGUSR2');
  });
});
