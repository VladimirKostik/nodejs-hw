import express from 'express';

import { celebrate } from 'celebrate';

import { registerUser } from '../controllers/authController.js';

import { registerUserSchema } from '../validations/authValidation.js';

const router = express.Router();

router.post(
  '/auth/register',
  celebrate(registerUserSchema),
  registerUser,
);

export default router;