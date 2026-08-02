/* ==========================================================================
   FUT 10 ARENA - GERENCIADOR DE LOCALSTORAGE (js/data/storage.js)
   ========================================================================== */

import { usuariosIniciais } from "./mockData.js";

const CHAVE_USUARIOS = "fut10_usuarios";
const CHAVE_SESSAO = "fut10_sessao";

// === BLOCO 1: BUSCAR E INICIALIZAR USUÁRIOS ===
export function obterUsuarios() {
  const dados = localStorage.getItem(CHAVE_USUARIOS);
  
  if (!dados) {
    // Se não existir nada salvo ainda, grava os usuários padrão (123)
    localStorage.setItem(CHAVE_USUARIOS, JSON.stringify(usuariosIniciais));
    return usuariosIniciais;
  }
  
  return JSON.parse(dados);
}

// === BLOCO 2: GERENCIAMENTO DE SESSÃO DO USUÁRIO LOGADO ===
export function salvarSessao(usuario) {
  localStorage.setItem(CHAVE_SESSAO, JSON.stringify(usuario));
}

export function obterSessao() {
  const sessao = localStorage.getItem(CHAVE_SESSAO);
  return sessao ? JSON.parse(sessao) : null;
}

export function limparSessao() {
  localStorage.removeItem(CHAVE_SESSAO);
}