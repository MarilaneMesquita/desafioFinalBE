import express from 'express';
import {
  createCliente,
  getAllClientes,
  updateCliente,
  deleteCliente,
} from '../controllers/clienteController.js';
import {
  validarCreateCliente,
  validarDeleteCliente,
  validarUpdateCliente,
} from '../middlewares/clienteMiddleware.js';
import verificarToken from '../middlewares/verificarToken.js';
import cacheMiddleware from '../middlewares/cacheMiddleware.js';

// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/', verificarToken, validarCreateCliente, createCliente);
router.get('/', verificarToken, cacheMiddleware, getAllClientes);
router.put('/:id', verificarToken, validarUpdateCliente, updateCliente);
router.delete('/:id', verificarToken, validarDeleteCliente, deleteCliente);

export default router;
