/* ==========================================================================
   FUT 10 ARENA - INICIALIZAÇÃO DA APLICAÇÃO (js/app.js)
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

import { initMensalidades, renderizarMensalidades, fecharModalPagamento } from "./modules/mensalidades.js";
import { initConfiguracoes } from "./modules/configuracoes.js";

// FUNÇÃO DE ABERTURA DO SISTEMA (Tornada global)
window.abrirSistema = function(usuario) {
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

  // Inicializa a lógica de cada módulo sem interromper o fluxo se houver erro
  try { aplicarPermissoesPerfil(usuario); } catch (e) { console.warn("Erro Auth:", e); }
  try { renderizarListaAlunos(); } catch (e) { console.warn("Erro Alunos:", e); }
  try { initMensalidades(); } catch (e) { console.warn("Erro Mensalidades:", e); }
  try { initConfiguracoes(); } catch (e) { console.warn("Erro Config:", e); }

  if (inputSenha) inputSenha.value = "";
};

// EXPOSIÇÃO GLOBAL DE OUTRAS FUNÇÕES
window.abrirModalAluno = abrirModalAluno;
window.fecharModalAluno = fecharModalAluno;
window.fecharModalPagamento = fecharModalPagamento;

// HOOK DE NAVEGAÇÃO
window.aoMudarDeTela = function(screenId) {
  if (screenId === "financeiro-screen") {
    try { renderizarMensalidades(); } catch (e) {}
  } else if (screenId === "configuracoes-screen") {
    try { initConfiguracoes(); } catch (e) {}
  } else if (screenId === "alunos-screen") {
    try { renderizarListaAlunos(); } catch (e) {}
  }
};

// AUXILIARES DE LOGIN E INTERFACE
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
  if (!usuario) return false;
  if (senha === "1234" || senha === "123" || senha === "admin") return true;
  return senha.length >= 3;
}

// INICIALIZAÇÃO EVENTOS DOM
document.addEventListener("DOMContentLoaded", () => {
  const formLogin = document.getElementById("form-login");
  const selectUsuario = document.getElementById("select-usuario");
  const inputSenha = document.getElementById("input-senha");
  const btnLogout = document.getElementById("btn-logout");
  const inputDataNasc = document.getElementById("data-nasc");
  const inputIdade = document.getElementById("idade-aluno");

  try { inicializarEventosFiltros(); } catch (e) {}

  // Evento das abas da ficha do aluno
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

  // SUBMIT DO FORMULÁRIO DE LOGIN
  if (formLogin) {
    formLogin.addEventListener("submit", (event) => {
      event.preventDefault();

      const usuario = selectUsuario ? selectUsuario.value : "";
      const senha = inputSenha ? inputSenha.value.trim() : "";

      esconderErro();

      if (validarCredenciais(usuario, senha)) {
        localStorage.setItem("usuarioLogado", usuario);
        window.abrirSistema(usuario);
      } else {
        exibirErro("Selecione um usuário e digite a senha correta (ex: 1234)!");
      }
    });
  }

  if (btnLogout) {
    btnLogout.addEventListener("click", (event) => {
      event.preventDefault();
      realizarLogout();
    });
  }

  // AUTO-LOGIN (Apenas no final, após registrar todos os eventos)
  const usuarioSalvo = localStorage.getItem("usuarioLogado");
  if (usuarioSalvo) {
    window.abrirSistema(usuarioSalvo);
  }
});