const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function criarUsuario(req, res) {
  const { nome, email } = req.body
  try {
    const user = await prisma.usuario.create({ data: { nome, email } })
    res.json(user)
  } catch (error) {
    res.status(400).json({ erro: 'Erro ao cadastrar usuário' })
  }
}

async function listarUsuarios(req, res) {
  const usuarios = await prisma.usuario.findMany()
  res.json(usuarios)
}

module.exports = { criarUsuario, listarUsuarios }