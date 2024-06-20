import * as clienteService from '../services/clienteService.js';
import cache from '../configs/cache.js';

const createCliente = async (req, res) => {
  try {
    const id = await clienteService.createCliente(req.body);
    cache.flushAll(); // Invalida o cache ao criar um cliente
    res.status(201).json({message: 'Cliente criado com sucesso', id});
  } catch (error) {
    res.status(500).json({message: 'Erro ao criar cliente', error: error.message});
  }
};

const getAllClientes = async (req, res) => {
  try {
    const clientes = await clienteService.getAllClientes();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({message: 'Erro ao buscar clientes', error: error.message});
  }
};

const updateCliente = async (req, res) => {
  try {
    const {id} = req.params;
    const affectedRows = await clienteService.updateCliente(id, req.body);
    if (affectedRows > 0) {
      cache.flushAll(); // Invalida o cache ao atualizar um cliente
      res.status(200).json({message: 'Cliente atualizado com sucesso'});
    } else {
      res.status(404).json({message: 'Cliente não encontrado'});
    }
  } catch (error) {
    res.status(500).json({message: 'Erro ao atualizar cliente', error: error.message});
  }
};

const deleteCliente = async (req, res) => {
  try {
    const {id} = req.params;
    const affectedRows = await clienteService.deleteCliente(id);
    if (affectedRows > 0) {
      cache.flushAll(); // Invalida o cache ao deletar um cliente
      res.status(200).json({message: 'Cliente excluído com sucesso'});
    } else {
      res.status(404).json({message: 'Cliente não encontrado'});
    }
  } catch (error) {
    res.status(500).json({message: 'Erro ao excluir cliente', error: error.message});
  }
};

export {createCliente, getAllClientes, updateCliente, deleteCliente};
