const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.create = async (req, res) => {
  const { usuarioId, descricao, setor, prioridade } = req.body;
  try {
    const tarefa = await prisma.tarefa.create({
      data: {
        usuarioId,
        descricao,
        setor,
        prioridade,
      },
    });
    res.status(201).json(tarefa);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const tarefas = await prisma.tarefa.findMany({
      include: { usuario: true }, // Inclui dados do usuário
    });
    res.status(200).json(tarefas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { status, prioridade } = req.body;
  try {
    const tarefa = await prisma.tarefa.update({
      where: { id: Number(id) },
      data: { status, prioridade },
    });
    res.status(200).json(tarefa);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.tarefa.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};