import express from 'express';
import {createUser, login, logout} from '../controllers/usuarioController.js';

// eslint-disable-next-line new-cap
const router = express.Router();

// Endpoint para criar um novo usuário
router.post('/', createUser);

// Endpoint para login
router.post('/login', login);

// Endpoint para logout
router.post('/logout', logout);

export default router;
