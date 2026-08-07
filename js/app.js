/* ==========================================================================
   FUT 10 ARENA - INICIALIZAÇÃO DA APLICAÇÃO (js/app.js) - PARTE 1
   ========================================================================== */

import { aplicarPermissoesPerfil } from "./modules/auth.js";
import { 
  renderizarListaAlunos, 
  inicializarEventosFiltros, 
  salvarAluno, 
  processarFotoAluno,
  abrirModalAluno,
  fecharModalAluno,
  calcularIdadeAutomatica
} from "./modules/alunos.js";

// BLOCO DE EXPOSIÇÃO GLOBAL
// Garante acesso direto pelos eventos onclick do HTML
window.abrirModalAluno = abrirModalAluno;
window.fecharModalAluno = fecharModalAluno;

// BLOCO 1: TRANSIÇÃO E ENTRADA NO SISTEMA
function abrirSistema(usuario) {
  const loginScreen = document.getElementById("login-screen");
  const appScreen = document.getElementById("app-screen");
  const userDisplayName = document.getElementById("user-display-name");
  const userDisplayRole = document.getElementById("user-display-role");
  const inputSenha = document.getElementById("input-senha");

  if (userDisplayName) userDisplayName.textContent = usuario;
  if (userDisplayRole) {
    userDisplayRole.textContent = usuario.toLowerCase().includes("alessandra")
      ? "Administradora (Financeiro/Cantina)"
      : "Treinador (Campo/Treinos)";
  }

  if (loginScreen) {
    loginScreen.classList.add("screen-hidden");
    loginScreen.classList.remove("screen-active");
    loginScreen.style.setProperty("display", "none", "important");
  }

  if (appScreen) {
    appScreen.classList.remove("screen-hidden");
    appScreen.classList.add("screen-active");
    appScreen.style.setProperty("display", "block", "important");
  }

  try { aplicarPermissoesPerfil(usuario); } catch (e) {}
  try { renderizarListaAlunos(); } catch (e) {}

  if (inputSenha) inputSenha.value = "";
}

// BLOCO 2: LOGOUT
function realizarLogout() {
  localStorage.removeItem("usuarioLogado");
  window.location.reload();
}
/* ==========================================================================
   FUT 10 ARENA - INICIALIZAÇÃO DA APLICAÇÃO (js/app.js) - PARTE 2
   ========================================================================== */

// BLOCO 3: MENSAGENS DE FEEDBACK VISUAL
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
  if (senha === "1234" || senha === "123" || senha === "admin") return true;
  return Boolean(usuario && senha.length >= 3);
}

// BLOCO 4: REGISTRO DE EVENTOS DOM
document.addEventListener("DOMContentLoaded", () => {
  const formLogin = document.getElementById("form-login");
  const selectUsuario = document.getElementById("select-usuario");
  const inputSenha = document.getElementById("input-senha");
  const btnLogout = document.getElementById("btn-logout");
  const inputDataNasc = document.getElementById("data-nasc");
  const inputIdade = document.getElementById("idade-aluno");

  try { renderizarListaAlunos(); } catch (e) {}
  try { inicializarEventosFiltros(); } catch (e) {}

  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const tabTarget = e.currentTarget.getAttribute("data-tab");
      document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
      document.querySelectorAll(".tab-content").forEach((c) => c.classList.remove("active"));
      e.currentTarget.classList.add("active");
      document.getElementById(tabTarget)?.classList.add("active");
    });
  });

  document.getElementById("formAluno")?.addEventListener("submit", salvarAluno);
  document.getElementById("foto-aluno")?.addEventListener("change", processarFotoAluno);

  if (inputDataNasc) {
    inputDataNasc.addEventListener("change", (e) => {
      if (inputIdade) {
        inputIdade.value = calcularIdadeAutomatica(e.target.value);
      }
    });
  }

  const usuarioSalvo = localStorage.getItem("usuarioLogado");
  if (usuarioSalvo) {
    abrirSistema(usuarioSalvo);
  }

  if (formLogin) {
    formLogin.addEventListener("submit", (event) => {
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

  if (btnLogout) {
    btnLogout.addEventListener("click", (event) => {
      event.preventDefault();
      realizarLogout();
    });
  }
});