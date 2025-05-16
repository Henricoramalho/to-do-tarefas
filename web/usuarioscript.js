document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("usuarioForm");
  const lista = document.getElementById("listaUsuarios");

  fetch("http://localhost:3000/usuarios")
    .then(res => {
      if (!res.ok) throw new Error("Erro ao buscar usuários");
      return res.json();
    })
    .then(usuarios => {
      usuarios.forEach(usuario => {
        const div = document.createElement("div");
        div.textContent = `${usuario.nome} - ${usuario.email}`;
        lista.appendChild(div);
      });
    })
    .catch(err => alert(err.message));

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;

    fetch("http://localhost:3000/usuarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email })
    })
    .then(res => {
      if (!res.ok) throw new Error("Erro ao cadastrar usuário");
      return res.json();
    })
    .then(data => {
      alert("Usuário cadastrado!");
      location.reload(); 
    })
    .catch(err => alert(err.message));
  });
});