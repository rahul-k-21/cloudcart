import {
  registerUser,
  loginUser
} from '../services/auth.service.js';

import { findUserById } from '../services/user.repository.js';

export async function register(req, res) {
  const user = await registerUser(req.validatedBody);

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: user
  });
}

export async function login(req, res) {
  const result = await loginUser(req.validatedBody);

  res.status(200).json({
    success: true,
    message: 'Login successful',
    data: result
  });
}

export function profile(req, res) {
  const user = findUserById(req.auth.sub);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  res.status(200).json({
    success: true,
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt
    }
  });
}
