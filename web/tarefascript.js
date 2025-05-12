function cadastrarUsuario() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;

    fetch('/api/usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, email })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('mensagem').innerText = 'Usuário cadastrado com sucesso!';
    })
    .catch(error => {
        document.getElementById('mensagem').innerText = 'Erro ao cadastrar usuário!';
    });

    return false;
}