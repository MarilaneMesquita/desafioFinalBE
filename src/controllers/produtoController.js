import * as produtoService from '../services/produtoService.js';

const createProduto = async (req, res) => {
  try {
    const id = await produtoService.createProduto(req.body);
    res.status(201).json({message: 'Produto criado com sucesso', id});
  } catch (error) {
    res.status(500).json({message: 'Erro ao criar produto', error: error.message});
  }
};

const getAllProdutos = async (req, res) => {
  try {
    const produtos = await produtoService.getAllProdutos();
    res.status(200).json(produtos);
  } catch (error) {
    res.status(500).json({message: 'Erro ao buscar produtos', error: error.message});
  }
};

const updateProduto = async (req, res) => {
  try {
    const {id} = req.params;
    const affectedRows = await produtoService.updateProduto(id, req.body);
    if (affectedRows > 0) {
      res.status(200).json({message: 'Produto atualizado com sucesso'});
    } else {
      res.status(404).json({message: 'Produto não encontrado'});
    }
  } catch (error) {
    res.status(500).json({message: 'Erro ao atualizar produto', error: error.message});
  }
};

const deleteProduto = async (req, res) => {
  try {
    const {id} = req.params;
    const affectedRows = await produtoService.deleteProduto(id);
    if (affectedRows > 0) {
      res.status(200).json({message: 'Produto excluído com sucesso'});
    } else {
      res.status(404).json({message: 'Produto não encontrado'});
    }
  } catch (error) {
    res.status(500).json({message: 'Erro ao excluir produto', error: error.message});
  }
};

export {createProduto, getAllProdutos, updateProduto, deleteProduto};
