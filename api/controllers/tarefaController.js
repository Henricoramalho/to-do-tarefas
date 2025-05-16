const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function criarTarefa(req, res) {
  const { descricao, setor, prioridade, usuarioId } = req.body;

  if (!descricao || !setor || !prioridade || !usuarioId) {
    return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
  }

  try {
    const tarefa = await prisma.tarefa.create({
      data: { descricao, setor, prioridade, usuarioId }
    });
    res.json(tarefa);
  } catch (error) {
  console.error("Erro ao cadastrar tarefa:", error);
  res.status(400).json({ erro: 'Erro ao cadastrar tarefa', detalhes: error.message });
}

}

async function listarTarefas(req, res) {
  const tarefas = await prisma.tarefa.findMany({ include: { usuario: true } })
  res.json(tarefas)
}

async function atualizarTarefa(req, res) {
  const { id } = req.params
  const { descricao, setor, prioridade, status } = req.body
  try {
    const tarefa = await prisma.tarefa.update({
      where: { id: Number(id) },
      data: { descricao, setor, prioridade, status }
    })
    res.json(tarefa)
  } catch (error) {
    res.status(400).json({ erro: 'Erro ao atualizar tarefa' })
  }
}

async function deletarTarefa(req, res) {
  const { id } = req.params
  try {
    await prisma.tarefa.delete({ where: { id: Number(id) } })
    res.json({ ok: true })
  } catch (error) {
    res.status(400).json({ erro: 'Erro ao deletar tarefa' })
  }
}

module.exports = {
  criarTarefa,
  listarTarefas,
  atualizarTarefa,
  deletarTarefa
}