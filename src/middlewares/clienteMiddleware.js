import db from '../configs/database.js';

const validarCreateCliente = async (req, res, next) => {
  const {nome, sobrenome, email, idade} = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const nomeSobrenomeRegex = /^[a-zA-Z\s]+$/;

  if (!nome || !sobrenome || !email || !idade) {
    return res.status(httpStatus.BAD_REQUEST).json({message: 'Todos os campos são obrigatórios'});
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({message: 'Email inválido'});
  }

  if (typeof idade !== 'number' || idade < 18 || idade > 100) {
    return res.status(400).json({message: 'Idade inválida'});
  }

  if (!nomeSobrenomeRegex.test(nome) || !nomeSobrenomeRegex.test(sobrenome) || nome.length > 50) {
    return res.status(400).json({message: 'Nome e sobrenome devem conter apenas letras e espaços'});
  }

  const [rows] = await db.query('SELECT * FROM clientes WHERE email = ?', [email]);
  if (rows.length > 0) {
    return res.status(409).json({message: 'Email já cadastrado'});
  }

  next();
};

const validarUpdateCliente = async (req, res, next) => {
  const {nome, sobrenome, email, idade} = req.body;
  const {id} = req.params;

  if (!nome || !sobrenome || !email || !idade) {
    return res.status(httpStatus.BAD_REQUEST).json({message: 'Todos os campos são obrigatórios'});
  }

  if (idade && (typeof idade !== 'number' || idade < 18 || idade > 100)) {
    return res.status(400).json({message: 'Idade inválida'});
  }

  const [rows] = await db.query('SELECT * FROM clientes WHERE id = ?', [id]);
  if (rows.length === 0) {
    return res.status(404).json({message: 'Cliente não encontrado'});
  }

  next();
};

const validarDeleteCliente = async (req, res, next) => {
  const {id} = req.params;

  if (!id) {
    return res.status(400).json({message: 'ID do cliente é obrigatório'});
  }

  const [rows] = await db.query('SELECT * FROM clientes WHERE id = ?', [id]);
  if (rows.length === 0) {
    return res.status(404).json({message: 'Cliente não encontrado'});
  }

  next();
};

export {validarCreateCliente, validarUpdateCliente, validarDeleteCliente};
