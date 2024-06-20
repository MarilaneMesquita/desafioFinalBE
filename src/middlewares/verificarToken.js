import jwt from 'jsonwebtoken';
import pool from '../configs/database.js';

const verificarToken = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({message: 'Token não fornecido'});
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE id = ? AND token = ?', [decoded.id, token]);
    if (rows.length === 0) {
      return res.status(401).json({message: 'Token inválido'});
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({message: 'Token inválido'});
  }
};

export default verificarToken;
