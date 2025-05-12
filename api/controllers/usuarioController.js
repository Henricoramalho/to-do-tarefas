const db = require('../models/db');

// Criar um novo usuário
exports.criarUsuario = async (req, res) => {
  const { nome, email } = req.body;
  try {
    const [result] = await db.execute(
      'INSERT INTO Usuario (nome, email) VALUES (?, ?)',
      [nome, email]
    );
    res.status(201).json({ id: result.insertId, nome, email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao criar usuário' });
  }
};

// Obter todos os usuários
exports.obterUsuarios = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM Usuario');
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao obter usuários' });
  }
};

// Obter um usuário por ID
exports.obterUsuarioPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.execute('SELECT * FROM Usuario WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao obter usuário' });
  }
};

// Atualizar um usuário
exports.atualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nome, email } = req.body;
  try {
    const [result] = await db.execute(
      'UPDATE Usuario SET nome = ?, email = ? WHERE id = ?',
      [nome, email, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json({ message: 'Usuário atualizado com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao atualizar usuário' });
  }
};

// Deletar um usuário
exports.deletarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.execute('DELETE FROM Usuario WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json({ message: 'Usuário deletado com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao deletar usuário' });
  }
};
