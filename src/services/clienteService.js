import db from '../configs/database.js';
import cache from '../configs/cache.js';

const createCliente = async (cliente) => {
  const {nome, sobrenome, email, idade} = cliente;
  const [result] = await db.execute(
      'INSERT INTO clientes (nome, sobrenome, email, idade) VALUES (?, ?, ?, ?)',
      [nome, sobrenome, email, idade],
  );
  cache.del('allClientes'); // Invalidar cache
  console.log('Cache invalidado: allClientes');
  return result.insertId;
};

const getAllClientes = async () => {
  const cacheKey = 'allClientes';
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    console.log('Cache hit: Dados obtidos do cache');
    return cachedData;
  }

  console.log('Cache miss: Dados obtidos do banco de dados');
  const [rows] = await db.query('SELECT * FROM clientes');
  cache.set(cacheKey, rows);
  return rows;
};

const updateCliente = async (id, cliente) => {
  const {nome, sobrenome, email, idade} = cliente;
  const [result] = await db.execute(
      'UPDATE clientes SET nome = ?, sobrenome = ?, email = ?, idade = ? WHERE id = ?',
      [nome, sobrenome, email, idade, id],
  );
  cache.del('allClientes'); // Invalidar cache
  console.log('Cache invalidado: allClientes');
  return result.affectedRows;
};

const deleteCliente = async (id) => {
  const [result] = await db.execute('DELETE FROM clientes WHERE id = ?', [id]);
  cache.del('allClientes'); // Invalidar cache
  console.log('Cache invalidado: allClientes');
  return result.affectedRows;
};

export {createCliente, getAllClientes, updateCliente, deleteCliente};
