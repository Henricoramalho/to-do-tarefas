document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("tarefaForm");
  const usuarioSelect = document.getElementById("usuarioId");

  const aFazerDiv = document.getElementById("aFazer");
  const fazendoDiv = document.getElementById("fazendo");
  const prontoDiv = document.getElementById("pronto");

  fetch("http://localhost:3000/usuarios")
    .then(res => {
      if (!res.ok) throw new Error("Erro ao buscar usuários");
      return res.json();
    })
    .then(usuarios => {
      usuarios.forEach(usuario => {
        const option = document.createElement("option");
        option.value = usuario.id; 
        option.textContent = usuario.nome;
        usuarioSelect.appendChild(option);
      });
    })
    .catch(err => alert(err.message));

  function carregarTarefas() {
    fetch("http://localhost:3000/tarefas")
      .then(res => {
        if (!res.ok) throw new Error("Erro ao buscar tarefas");
        return res.json();
      })
      .then(tarefas => {
        aFazerDiv.innerHTML = "";
        fazendoDiv.innerHTML = "";
        prontoDiv.innerHTML = "";

        tarefas.forEach(tarefa => {
          const div = document.createElement("div");
          div.className = "card";
          div.innerHTML = `
            <strong>${tarefa.descricao}</strong><br>
            Setor: ${tarefa.setor}<br>
            Prioridade: ${tarefa.prioridade}<br>
            <select onchange="atualizarStatus(${tarefa.id}, this.value)">
              <option value="a fazer" ${tarefa.status === "a fazer" ? "selected" : ""}>A Fazer</option>
              <option value="fazendo" ${tarefa.status === "fazendo" ? "selected" : ""}>Fazendo</option>
              <option value="pronto" ${tarefa.status === "pronto" ? "selected" : ""}>Pronto</option>
            </select>
            <button onclick="deletarTarefa(${tarefa.id})">Excluir</button>
          `;

          if (tarefa.status === "a fazer") {
            aFazerDiv.appendChild(div);
          } else if (tarefa.status === "fazendo") {
            fazendoDiv.appendChild(div);
          } else {
            prontoDiv.appendChild(div);
          }
        });
      })
      .catch(err => alert(err.message));
  }

  carregarTarefas();

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const descricao = document.getElementById("descricao").value.trim();
    const setor = document.getElementById("setor").value.trim();
    const prioridade = document.getElementById("prioridade").value.trim();
    const usuarioId = Number(document.getElementById("usuarioId").value);

    if (!descricao || !setor || !prioridade || !usuarioId) {
      alert("Por favor, preencha todos os campos corretamente.");
      return;
    }

    fetch("http://localhost:3000/tarefas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ descricao, setor, prioridade, usuarioId })
    })
    .then(res => {
      if (!res.ok) return res.json().then(data => { throw new Error(data.erro || "Erro ao cadastrar tarefa") });
      return res.json();
    })
    .then(data => {
      alert("Tarefa cadastrada!");
      carregarTarefas();
      form.reset();
    })
    .catch(err => alert(err.message));
  });

  window.atualizarStatus = function (id, status) {
    fetch(`http://localhost:3000/tarefas/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    })
    .then(res => {
      if (!res.ok) throw new Error("Erro ao atualizar status");
      carregarTarefas();
    })
    .catch(err => alert(err.message));
  };

  window.deletarTarefa = function (id) {
    if (confirm("Deseja realmente excluir essa tarefa?")) {
      fetch(`http://localhost:3000/tarefas/${id}`, {
        method: "DELETE"
      })
      .then(res => {
        if (!res.ok) throw new Error("Erro ao excluir tarefa");
        carregarTarefas();
      })
      .catch(err => alert(err.message));
    }
  };
});