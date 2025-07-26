import { User } from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import { catchAsync } from '../utils/catchAsync.js';
import { AppError } from '../utils/AppError.js';
import Cookies from 'cookies';

const jwtsign = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = jwtsign(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    sameSite: 'lax',
    secure: false,
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  res.cookie('jwt', token, cookieOptions);

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

export const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      status: 'fail',
      message: 'unauthorized',
    });
  }

  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);
  if (!user) {
    return res.status(401).json({
      status: 'fail',
      message: 'unauthorized',
    });
  }
  req.user = user;
  next();
};

export const restrictToAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(401).json({
      status: 'fail',
      message: 'Unauthorized',
    });
  }
  next();
};

export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(404).json({
      status: 'fail',
      message: 'Email or Password not found',
    });
  }

  const user = await User.findOne({ email }).select('+password');
  console.log(user);

  if (!user || !(await user.comparePassword(user.password, password))) {
    return res.status(401).json({
      status: 'fail',
      message: 'Incorrect Email or Password',
    });
  }
  createSendToken(user, 200, res);
});

export const signup = catchAsync(async (req, res, next) => {
  const alreadyuser = await User.findOne({ email: req.body.email });
  if (alreadyuser) {
    return next(new AppError('Email already exists', 409));
  }
  if (req.body.password.length < 6) {
    return next(
      new AppError('Password length should be more than 6 characters')
    );
  }

  const newUser = await User.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      newUser,
    },
  });
});

export const verify = (req, res, next) => {
  const cookie = new Cookies(req, res);
  // console.log(cookie);
  const token = cookie.get('jwt');
  // console.log(token);

  if (!token) {
    return next(new AppError('User is unauthorized', 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded.id) {
    return next(new AppError('token is invalid', 401));
  }
  req.userId = decoded.id;
  // console.log(req.userId);
  return next();
};
