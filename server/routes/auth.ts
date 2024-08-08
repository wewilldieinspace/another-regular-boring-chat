import express from 'express';
import { login, register } from '../controllers';

export const authRoutes = express.Router();

authRoutes.post('/register', register); // Registration route
authRoutes.post('/login', login); // Login route
