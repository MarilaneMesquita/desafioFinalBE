import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import pool from '../configs/database.js';

const createUser = async (req, res) => {
  const {usuario, senha} = req.body;
  const hashedPassword = await bcrypt.hash(senha, 10);
  const [result] = await pool.query('INSERT INTO usuarios (usuario, senha) VALUES (?, ?)', [usuario, hashedPassword]);
  res.status(201).json({id: result.insertId, usuario});
};

const login = async (req, res) => {
  const {usuario, senha} = req.body;
  const [rows] = await pool.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario]);
  if (rows.length === 0) {
    return res.status(401).json({message: 'Usuário não encontrado'});
  }

  const user = rows[0];
  const match = await bcrypt.compare(senha, user.senha);
  if (!match) {
    return res.status(401).json({message: 'Senha incorreta'});
  }

  const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '1h'});
  await pool.query('UPDATE usuarios SET token = ? WHERE id = ?', [token, user.id]);

  res.status(200).json({token});
};

const logout = async (req, res) => {
  const token = req.headers['authorization'].split(' ')[1];
  await pool.query('UPDATE usuarios SET token = NULL WHERE token = ?', [token]);

  res.status(200).json({message: 'Logout realizado com sucesso'});
};

export {createUser, login, logout};
