/* ==========================================================================
   FUT 10 ARENA - ARQUIVO PRINCIPAL (js/app.js)
   Objetivo: Autenticação, Persistência de Sessão e Controle de Telas.
   ========================================================================== */

// === BLOCO: CONTROLE DE PERMISSÕES E FILTRO DE TELA ===

function aplicarPermissoesPerfil(nomeUsuario) {
  // Pega todos os elementos com restrição de perfil
  const botoesAlessandra = document.querySelectorAll(".menu-alessandra");
  const botoesVinicius = document.querySelectorAll(".menu-vinicius");

  // Se for Alessandra: esconde o que é do Vinícius e mostra o dela
  if (nomeUsuario === "Alessandra") {
    botoesAlessandra.forEach((el) => el.classList.remove("oculto-perfil"));
    botoesVinicius.forEach((el) => el.classList.add("oculto-perfil"));
  }
  // Se for Vinícius: esconde o que é da Alessandra e mostra o dele
  else if (nomeUsuario === "Vinícius" || nomeUsuario === "Vinicius") {
    botoesVinicius.forEach((el) => el.classList.remove("oculto-perfil"));
    botoesAlessandra.forEach((el) => el.classList.add("oculto-perfil"));
  }
}

// === FUNÇÕES GLOBAIS DE TRANSIÇÃO E CONTROLE DE TELA ===

function abrirSistema(usuario) {
  const loginScreen = document.getElementById("login-screen");
  const appScreen = document.getElementById("app-screen");
  const userDisplayName = document.getElementById("user-display-name");
  const userDisplayRole = document.getElementById("user-display-role");
  const inputSenha = document.getElementById("input-senha");

  // Atualiza nome e cargo no cabeçalho
  if (userDisplayName) {
    userDisplayName.textContent = usuario;
  }
  if (userDisplayRole) {
    userDisplayRole.textContent = usuario.toLowerCase().includes("alessandra")
      ? "Administradora"
      : "Treinador";
  }

  // Oculta a tela de login
  if (loginScreen) {
    loginScreen.classList.add("screen-hidden");
    loginScreen.classList.remove("screen-active");
    loginScreen.style.setProperty("display", "none", "important");
  }

  // Exibe a tela do sistema
  if (appScreen) {
    appScreen.classList.remove("screen-hidden");
    appScreen.classList.add("screen-active");
    appScreen.style.setProperty("display", "block", "important");
  }

  // APUCA O FILTRO DE PERFIL (Esconde/Mostra botões conforme o usuário)
  aplicarPermissoesPerfil(usuario);

  // Limpa o campo de senha por segurança
  if (inputSenha) {
    inputSenha.value = "";
  }
}

function realizarLogout() {
  localStorage.removeItem("usuarioLogado");
  window.location.reload();
}

function exibirErro(mensagem) {
  const errorMessage = document.getElementById("error-message");
  if (errorMessage) {
    errorMessage.textContent = mensagem;
    errorMessage.classList.add("show");
  }
}

function esconderErro() {
  const errorMessage = document.getElementById("error-message");
  if (errorMessage) {
    errorMessage.textContent = "";
    errorMessage.classList.remove("show");
  }
}

function validarCredenciais(usuario, senha) {
  // Aceita senhas de teste
  if (senha === "1234" || senha === "123" || senha === "admin") {
    return true;
  }
  return Boolean(usuario && senha.length >= 3);
}

// === INICIALIZAÇÃO E EVENTOS DA PÁGINA ===

document.addEventListener("DOMContentLoaded", () => {
  const formLogin = document.getElementById("form-login");
  const selectUsuario = document.getElementById("select-usuario");
  const inputSenha = document.getElementById("input-senha");
  const btnLogout = document.getElementById("btn-logout");

  // Verifica se o usuário já estava logado
  const usuarioSalvo = localStorage.getItem("usuarioLogado");
  if (usuarioSalvo) {
    abrirSistema(usuarioSalvo);
  }

  // Captura o envio do formulário de login
  if (formLogin) {
    formLogin.addEventListener("submit", (event) => {
      // Bloqueia o recarregamento automático da página
      event.preventDefault();
      event.stopPropagation();

      const usuario = selectUsuario ? selectUsuario.value : "";
      const senha = inputSenha ? inputSenha.value.trim() : "";

      esconderErro();

      if (validarCredenciais(usuario, senha)) {
        localStorage.setItem("usuarioLogado", usuario);
        abrirSistema(usuario);
      } else {
        exibirErro("Usuário ou senha incorretos. Tente novamente!");
      }

      return false;
    });
  }

  // Captura o botão de sair
  if (btnLogout) {
    btnLogout.addEventListener("click", (event) => {
      event.preventDefault();
      realizarLogout();
    });
  }
});