/* ==========================================================================
   FUT 10 ARENA - MÓDULO DE AUTENTICAÇÃO (js/modules/auth.js)
   ========================================================================== */

import { salvarSessao, limparSessao } from "../data/storage.js";

// BLOCO 1: AUTENTICAÇÃO DE USUÁRIO
// Valida o login de forma direta e sem falhas de comparação de texto
export function realizarLogin(usuarioInput, senhaInput) {
  if (!usuarioInput) {
    return { sucesso: false, mensagem: "Por favor, selecione quem está acessando." };
  }

  if (senhaInput === "123" || senhaInput === "1234" || senhaInput === "admin") {
    const usuarioObjeto = {
      nome: usuarioInput,
      usuario: usuarioInput,
      perfil: usuarioInput.toLowerCase().includes("alessandra") ? "admin" : "treinador"
    };

    // Tenta salvar via storage.js se existir, senão usa localStorage direto
    try {
      salvarSessao(usuarioObjeto);
    } catch (e) {
      localStorage.setItem("usuarioLogado", usuarioInput);
    }

    return { sucesso: true, usuario: usuarioObjeto };
  }

  return { sucesso: false, mensagem: "Senha incorreta! Digite 123" };
}

// BLOCO 2: ENCERRAMENTO DE SESSÃO
export function realizarLogout() {
  try {
    limparSessao();
  } catch (e) {
    localStorage.removeItem("usuarioLogado");
  }
  window.location.reload();
}

// BLOCO 3: ALTERNÂNCIA DE TELAS (LOGIN -> APP)
export function alternarParaApp() {
  const loginScreen = document.getElementById("login-screen");
  const appScreen = document.getElementById("app-screen");
  const bottomNav = document.querySelector(".bottom-nav");

  if (loginScreen) {
    loginScreen.classList.remove("screen-active");
    loginScreen.classList.add("screen-hidden");
    loginScreen.style.display = "none";
  }

  if (appScreen) {
    appScreen.classList.remove("screen-hidden");
    appScreen.classList.add("screen-active");
    appScreen.style.display = "block";
  }

  // Garante que a barra do rodapé apareça assim que entra no App
  if (bottomNav) {
    bottomNav.style.display = "flex";
  }
}

// BLOCO 4: CONTROLE DE PERMISSÕES E VISIBILIDADE POR PERFIL
export function aplicarPermissoesPerfil(usuarioOuNome) {
  if (!usuarioOuNome) return;

  const nome = typeof usuarioOuNome === "object" ? usuarioOuNome.nome : usuarioOuNome;

  const elementosAlessandra = document.querySelectorAll('.menu-alessandra, .nav-alessandra');
  const elementosVinicius = document.querySelectorAll('.menu-vinicius, .nav-vinicius');

  const eVinicius = nome.toLowerCase().includes('vinícius') || nome.toLowerCase().includes('vinicius');

  if (eVinicius) {
    elementosVinicius.forEach(el => {
      el.classList.remove('oculto-perfil');
      el.style.display = el.classList.contains('nav-bottom-item') ? 'flex' : 'flex';
    });
    elementosAlessandra.forEach(el => {
      el.classList.add('oculto-perfil');
      el.style.display = 'none';
    });
  } else {
    elementosAlessandra.forEach(el => {
      el.classList.remove('oculto-perfil');
      el.style.display = el.classList.contains('nav-bottom-item') ? 'flex' : 'flex';
    });
    elementosVinicius.forEach(el => {
      el.classList.add('oculto-perfil');
      el.style.display = 'none';
    });
  }
}