import db from '../configs/database.js';
import cache from '../configs/cache.js';

const createProduto = async (produto) => {
  const {nome, descricao, preco} = produto;
  const [result] = await db.execute(
      'INSERT INTO produtos (nome, descricao, preco) VALUES (?, ?, ?)',
      [nome, descricao, preco],
  );
  cache.del('allProdutos'); // Invalidar cache
  console.log('Cache invalidado: allProdutos');
  return result.insertId;
};

const getAllProdutos = async () => {
  const cacheKey = 'allProdutos';
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    console.log('Cache hit: Dados obtidos do cache');
    return cachedData;
  }

  console.log('Cache miss: Dados obtidos do banco de dados');
  const [rows] = await db.query('SELECT * FROM produtos');
  cache.set(cacheKey, rows);
  return rows;
};

const updateProduto = async (id, produto) => {
  const {nome, descricao, preco} = produto;
  const [result] = await db.execute(
      'UPDATE produtos SET nome = ?, descricao = ?, preco = ? WHERE id = ?',
      [nome, descricao, preco, id],
  );
  cache.del('allProdutos'); // Invalidar cache
  console.log('Cache invalidado: allProdutos');
  return result.affectedRows;
};

const deleteProduto = async (id) => {
  const [result] = await db.execute('DELETE FROM produtos WHERE id = ?', [id]);
  cache.del('allProdutos'); // Invalidar cache
  console.log('Cache invalidado: allProdutos');
  return result.affectedRows;
};

export {createProduto, getAllProdutos, updateProduto, deleteProduto};
