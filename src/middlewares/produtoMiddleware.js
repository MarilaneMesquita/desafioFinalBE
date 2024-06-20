import db from '../configs/database.js';

const validarCreateProduto = async (req, res, next) => {
  const {nome, descricao, preco} = req.body;
  const nomeRegex = /^[a-zA-Z\s]+$/;

  if (!nome || !descricao || !preco) {
    return res.status(400).json({message: 'Todos os campos são obrigatórios'});
  }

  if (!nomeRegex.test(nome) || nome.length > 50) {
    return res.status(400).json({message: 'Nome deve conter apenas letras e espaços'});
  }

  if (typeof preco !== 'number' || preco < 0) {
    return res.status(400).json({message: 'Preço inválido'});
  }

  next();
};

const validarUpdateProduto = async (req, res, next) => {
  const {nome, descricao, preco} = req.body;
  const {id} = req.params;
  const nomeRegex = /^[a-zA-Z\s]+$/;

  if (!nome || !descricao || !preco) {
    return res.status(400).json({message: 'Todos os campos são obrigatórios'});
  }

  if (nome && (!nomeRegex.test(nome) || nome.length > 50)) {
    return res.status(400).json({message: 'Nome inválido'});
  }

  if (preco && (typeof preco !== 'number' || preco < 0)) {
    return res.status(400).json({message: 'Preço inválido'});
  }

  const [rows] = await db.query('SELECT * FROM produtos WHERE id = ?', [id]);
  if (rows.length === 0) {
    return res.status(404).json({message: 'Produto não encontrado'});
  }

  next();
};

const validarDeleteProduto = async (req, res, next) => {
  const {id} = req.params;

  if (!id) {
    return res.status(400).json({message: 'ID do produto é obrigatório'});
  }

  const [rows] = await db.query('SELECT * FROM produtos WHERE id = ?', [id]);
  if (rows.length === 0) {
    return res.status(404).json({message: 'Produto não encontrado'});
  }

  next();
};

export {validarCreateProduto, validarUpdateProduto, validarDeleteProduto};
