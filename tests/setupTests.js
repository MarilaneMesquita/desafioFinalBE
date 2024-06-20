import pool from '../src/configs/database.js';
import bcrypt from 'bcrypt';

const createClientesTableSQL = `
CREATE TABLE IF NOT EXISTS clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    sobrenome VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    idade INT NOT NULL
);
`;

const createProdutosTableSQL = `
CREATE TABLE IF NOT EXISTS produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    descricao TEXT NOT NULL,
    preco DECIMAL(10, 2) NOT NULL
);
`;

const createUsuariosTableSQL = `
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(50) NOT NULL,
    senha VARCHAR(100) NOT NULL,
    token VARCHAR(255)
);
`;

const initClientesSQL = `
INSERT INTO clientes (nome, sobrenome, email, idade) VALUES 
('Alice', 'Smith', 'alice.smith@example.com', 30),
('Bob', 'Johnson', 'bob.johnson@example.com', 25);
`;

const initProdutosSQL = `
INSERT INTO produtos (nome, descricao, preco) VALUES 
('Produto A', 'Descrição do Produto A', 100.00),
('Produto B', 'Descrição do Produto B', 150.00);
`;

const initUsuariosSQL = async () => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('senha123', salt);

  return `
    INSERT INTO usuarios (usuario, senha) VALUES 
    ('admin', '${hashedPassword}');
  `;
};

const setupDatabase = async () => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    await connection.query(createClientesTableSQL);
    await connection.query(createProdutosTableSQL);
    await connection.query(createUsuariosTableSQL);
    await connection.query(initClientesSQL);
    await connection.query(initProdutosSQL);
    const initUsuarios = await initUsuariosSQL();
    await connection.query(initUsuarios);
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    console.error('Error during setupDatabase:', error);
    throw error;
  } finally {
    await connection.release();
  }
};

const teardownDatabase = async () => {
  const dropClientesTableSQL = `DROP TABLE IF EXISTS clientes;`;
  const dropProdutosTableSQL = `DROP TABLE IF EXISTS produtos;`;
  const dropUsuariosTableSQL = `DROP TABLE IF EXISTS usuarios;`;

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    await connection.query(dropClientesTableSQL);
    await connection.query(dropProdutosTableSQL);
    await connection.query(dropUsuariosTableSQL);
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    console.error('Error during teardownDatabase:', error);
    throw error;
  } finally {
    await connection.release();
  }
};

export {setupDatabase, teardownDatabase};
