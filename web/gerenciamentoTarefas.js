document.addEventListener('DOMContentLoaded', () => {
    const descricaoInput = document.getElementById('descricao');
    const prioridadeSelect = document.getElementById('prioridade');
    const dataCadastroInput = document.getElementById('dataCadastro');
    const adicionarBtn = document.getElementById('adicionar');
    const listaTarefas = document.getElementById('lista-tarefas');
    const filtroPrioridade = document.getElementById('filtro-prioridade');
    const filtroStatus = document.getElementById('filtro-status');

    let tarefas = [];

    const renderizarTarefas = () => {
        listaTarefas.innerHTML = '';
        const filtroPrioridadeValue = filtroPrioridade.value;
        const filtroStatusValue = filtroStatus.value;

        tarefas
            .filter(tarefa => {
                const prioridadeMatch = filtroPrioridadeValue ? tarefa.prioridade === filtroPrioridadeValue : true;
                const statusMatch = filtroStatusValue ? tarefa.status === filtroStatusValue : true;
                return prioridadeMatch && statusMatch;
            })
            .forEach(tarefa => {
                const li = document.createElement('li');
                li.classList.add('tarefa');
                if (tarefa.status === 'PRONTO') li.classList.add('done');
                li.innerHTML = `
                    <span>${tarefa.descricao} - ${tarefa.prioridade} - ${tarefa.dataCadastro}</span>
                    <div>
                        <button onclick="marcarComoConcluida(${tarefa.id})">Concluir</button>
                        <button onclick="editarTarefa(${tarefa.id})">Editar</button>
                        <button onclick="deletarTarefa(${tarefa.id})">Excluir</button>
                    </div>
                `;
                listaTarefas.appendChild(li);
            });
    };

    const adicionarTarefa = () => {
        const descricao = descricaoInput.value.trim();
        const prioridade = prioridadeSelect.value;
        const dataCadastro = dataCadastroInput.value;

        if (!descricao || !dataCadastro) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        const novaTarefa = {
            id: Date.now(),
            descricao,
            prioridade,
            dataCadastro,
            status: 'AFAZER'
        };

        tarefas.push(novaTarefa);
        descricaoInput.value = '';
        dataCadastroInput.value = '';
        renderizarTarefas();
    };

    const editarTarefa = id => {
        const tarefa = tarefas.find(t => t.id === id);
        if (tarefa) {
            const novaDescricao = prompt('Editar descrição:', tarefa.descricao);
            if (novaDescricao !== null && novaDescricao.trim() !== '') {
                tarefa.descricao = novaDescricao.trim();
                renderizarTarefas();
            }
        }
    };

    const deletarTarefa = id => {
        tarefas = tarefas.filter(t => t.id !== id);
        renderizarTarefas();
    };

    const marcarComoConcluida = id => {
        const tarefa = tarefas.find(t => t.id === id);
        if (tarefa) {
            tarefa.status = 'PRONTO';
            renderizarTarefas();
        }
    };

    adicionarBtn.addEventListener('click', adicionarTarefa);

    filtroPrioridade.addEventListener('change', renderizarTarefas);
    filtroStatus.addEventListener('change', renderizarTarefas);

    renderizarTarefas();
});
