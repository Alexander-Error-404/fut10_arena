/* ==========================================================================
   FUT 10 ARENA - MÓDULO DE AUTENTICAÇÃO (js/modules/auth.js)
   ========================================================================== */

import { salvarSessao, limparSessao } from "../data/storage.js";

/**
 * Valida o login de forma direta e sem falhas de comparação de texto
 */
export function realizarLogin(usuarioInput, senhaInput) {
  // Se não selecionou nenhum usuário
  if (!usuarioInput) {
    return { sucesso: false, mensagem: "Por favor, selecione quem está acessando." };
  }

  // Verifica se a senha é 123
  if (senhaInput === "123") {
    const usuarioObjeto = {
      nome: usuarioInput,
      usuario: usuarioInput,
      perfil: usuarioInput.toLowerCase().includes("alessandra") ? "admin" : "treinador"
    };

    // Salva na sessão e autoriza a entrada
    salvarSessao(usuarioObjeto);
    return { sucesso: true, usuario: usuarioObjeto };
  }

  return { sucesso: false, mensagem: "Senha incorreta! Digite 123" };
}

/**
 * Encerra a sessão do usuário
 */
export function realizarLogout() {
  limparSessao();
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
  }

  if (appScreen) {
    appScreen.classList.remove("screen-hidden");
    appScreen.classList.add("screen-active");
  }
}

// ===================================================================
// BLOCO: APLICAR PERMISSÕES DE TELA POR USUÁRIO (FILTRO DE PERFIL)
// Descrição: Esconde ou exibe cartões/módulos baseando-se no nome de
// quem está logado (Alessandra ou Vinícius).
// ===================================================================
export function aplicarPermissoesPerfil(nomeUsuario) {
  // Pega todos os elementos que possuem restrição da Alessandra ou Vinícius
  const botoesAlessandra = document.querySelectorAll('.menu-alessandra');
  const botoesVinicius = document.querySelectorAll('.menu-vinicius');

  // Caso 1: Usuário logado é a Alessandra
  if (nomeUsuario === 'Alessandra') {
    // Exibe tudo da Alessandra
    botoesAlessandra.forEach(el => el.classList.remove('oculto-perfil'));
    // Esconde o que é exclusivo do Vinícius (Fazer Chamada e Campo Tático)
    botoesVinicius.forEach(el => el.classList.add('oculto-perfil'));
  } 
  // Caso 2: Usuário logado é o Vinícius
  else if (nomeUsuario === 'Vinícius' || nomeUsuario === 'Vinicius') {
    // Exibe tudo do Vinícius (Alunos, Chamada e Campo Tático)
    botoesVinicius.forEach(el => el.classList.remove('oculto-perfil'));
    // Esconde o que é exclusivo da Alessandra (Cantina, Mensalidades, Financeiro, etc.)
    botoesAlessandra.forEach(el => el.classList.add('oculto-perfil'));
  }
}