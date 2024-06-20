import express from 'express';
import {
  createProduto,
  getAllProdutos,
  updateProduto,
  deleteProduto,
} from '../controllers/produtoController.js';
import {
  validarCreateProduto,
  validarDeleteProduto,
  validarUpdateProduto,
} from '../middlewares/produtoMiddleware.js';

// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/', validarCreateProduto, createProduto);
router.get('/', getAllProdutos);
router.put('/:id', validarUpdateProduto, updateProduto);
router.delete('/:id', validarDeleteProduto, deleteProduto);

export default router;
