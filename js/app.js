/* ==========================================================================
   FUT 10 ARENA - INICIALIZAÇÃO DA APLICAÇÃO (js/app.js)
   ========================================================================== */

import { aplicarPermissoesPerfil } from "./modules/auth.js";
import { renderizarDashboard } from "./modules/dashboard.js";
import { 
  renderizarListaAlunos, 
  inicializarEventosFiltros, 
  salvarAluno, 
  processarFotoAluno,
  abrirModalAluno,
  fecharModalAluno,
  calcularIdadeAutomatica
} from "./modules/alunos.js";

// EXPOSIÇÃO GLOBAL DE FUNÇÕES ESSENCIAIS PARA OS ONCLICKS DO HTML
window.abrirModalAluno = abrirModalAluno;
window.fecharModalAluno = fecharModalAluno;

// BLOCO 1: GERENCIAMENTO DE TRANSIÇÃO E ENTRADA NO SISTEMA
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

  // Oculta a tela de Login e exibe o Painel Principal
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

  // Aplica as restricoes de visualizacao conforme o operador logado
  try { aplicarPermissoesPerfil(usuario); } catch (e) {}
  try { renderizarDashboard(); } catch (e) {}
  try { renderizarListaAlunos(); } catch (e) {}

  if (inputSenha) inputSenha.value = "";
}

// BLOCO 2: ENCERRAMENTO DE SESSÃO (LOGOUT)
function realizarLogout() {
  localStorage.removeItem("usuarioLogado");
  window.location.reload();
}

// BLOCO 3: MENSAGENS DE FEEDBACK VISUAL PARA LOGIN
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

/* ==========================================================================
   FUT 10 ARENA - INICIALIZAÇÃO DA APLICAÇÃO (js/app.js) - CONTINUAÇÃO
   ========================================================================== */

// BLOCO 4: REGISTRO DE EVENTOS E EXECUÇÃO AO CARREGAR O DOM
document.addEventListener("DOMContentLoaded", () => {
  const formLogin = document.getElementById("form-login");
  const selectUsuario = document.getElementById("select-usuario");
  const inputSenha = document.getElementById("input-senha");
  const btnLogout = document.getElementById("btn-logout");
  const inputDataNasc = document.getElementById("data-nasc");
  const inputIdade = document.getElementById("idade-aluno");

  // Renderiza a lista de alunos e prepara os filtros de busca
  try { renderizarListaAlunos(); } catch (e) {}
  try { inicializarEventosFiltros(); } catch (e) {}
  try { renderizarDashboard(); } catch (e) {}

  // EVENTO: Troca de Abas do Modal da Ficha do Aluno
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const tabTarget = e.currentTarget.getAttribute("data-tab");

      // Desativa todas as abas e conteudos ativos
      document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
      document.querySelectorAll(".tab-content").forEach((c) => c.classList.remove("active"));

      // Ativa apenas a aba clicada
      e.currentTarget.classList.add("active");
      document.getElementById(tabTarget)?.classList.add("active");
    });
  });

  // EVENTO: Submissao do formulario de cadastro de alunos
  document.getElementById("formAluno")?.addEventListener("submit", salvarAluno);

  // EVENTO: Processamento e Preview de Foto de Perfil
  document.getElementById("foto-aluno")?.addEventListener("change", processarFotoAluno);

  // EVENTO: Calculo automatico da Idade do Aluno
  if (inputDataNasc) {
    inputDataNasc.addEventListener("change", (e) => {
      if (inputIdade) {
        inputIdade.value = calcularIdadeAutomatica(e.target.value);
      }
    });
  }

  // VERIFICAÇÃO DE SESSÃO ATIVA NO NAVEGADOR
  const usuarioSalvo = localStorage.getItem("usuarioLogado");
  if (usuarioSalvo) {
    abrirSistema(usuarioSalvo);
  }

  // SUBMISSÃO DO FORMULÁRIO DE LOGIN
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

  // BOTAO DE SAIDA DO SISTEMA
  if (btnLogout) {
    btnLogout.addEventListener("click", (event) => {
      event.preventDefault();
      realizarLogout();
    });
  }
});