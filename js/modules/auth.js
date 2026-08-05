/* ==========================================================================
   FUT 10 ARENA - MÓDULO DE AUTENTICAÇÃO (js/modules/auth.js)
   ========================================================================== */

import { salvarSessao, limparSessao } from "../data/storage.js";

/**
 * Valida o login de forma direta e sem falhas de comparação de texto
 */
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

/**
 * Encerra a sessão do usuário
 */
export function realizarLogout() {
  try {
    limparSessao();
  } catch (e) {
    localStorage.removeItem("usuarioLogado");
  }
  window.location.reload();
}

/**
 * Troca as telas visíveis (Esconde o Login e Mostra o App)
 */
export function alternarParaApp() {
  const loginScreen = document.getElementById("login-screen");
  const appScreen = document.getElementById("app-screen");

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
}

/**
 * APLICA O FILTRO DE PERFIL (PAINEL + RODAPÉ)
 */
export function aplicarPermissoesPerfil(usuarioOuNome) {
  if (!usuarioOuNome) return;

  // Trata se veio string ("Vinícius") ou objeto ({ nome: "Vinícius" })
  const nome = typeof usuarioOuNome === "object" ? usuarioOuNome.nome : usuarioOuNome;

  const elementosAlessandra = document.querySelectorAll('.menu-alessandra, .nav-alessandra');
  const elementosVinicius = document.querySelectorAll('.menu-vinicius, .nav-vinicius');

  const eVinicius = nome.toLowerCase().includes('vinícius') || nome.toLowerCase().includes('vinicius');

  if (eVinicius) {
    elementosVinicius.forEach(el => {
      el.classList.remove('oculto-perfil');
      el.style.display = '';
    });
    elementosAlessandra.forEach(el => {
      el.classList.add('oculto-perfil');
      el.style.display = 'none';
    });
  } else {
    elementosAlessandra.forEach(el => {
      el.classList.remove('oculto-perfil');
      el.style.display = '';
    });
    elementosVinicius.forEach(el => {
      el.classList.add('oculto-perfil');
      el.style.display = 'none';
    });
  }
}