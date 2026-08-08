/* ==========================================================================
   FUT 10 ARENA - MÓDULO DO DASHBOARD (js/modules/dashboard.js)
   ========================================================================== */

import { getAlunos } from "../data/storage.js";

/**
 * Função responsável por recalcular e exibir os 4 KPIs principais na tela inicial.
 * KPIs: Total de Alunos, Inadimplentes, Produtos com Estoque Baixo e Total de Fiado.
 */
export function renderizarDashboard() {
  // ------------------------------------------------------------------------
  // 1. CARREGAMENTO DAS CONFIGURAÇÕES DE REGRA DE NEGÓCIO
  // ------------------------------------------------------------------------
  const config = JSON.parse(localStorage.getItem("fut10_configuracoes")) || {};
  const estoqueMin = config.estoqueMinimo || 5;

  // ------------------------------------------------------------------------
  // 2. PROCESSAMENTO E CÁLCULO DE ALUNOS E INADIMPLÊNCIA
  // Usa o getter oficial getAlunos() para manter a consistência da fonte de dados.
  // ------------------------------------------------------------------------
  let alunos = [];
  try {
    alunos = getAlunos();
  } catch (e) {
    alunos = JSON.parse(localStorage.getItem("fut10_alunos")) || [];
  }

  const mesAtual = new Date().getMonth();
  let inadimplentes = 0;

  alunos.forEach((aluno) => {
    // Tratamento defensivo para validar o histórico de pagamentos
    const hist = Array.isArray(aluno.historicoPagamentos) ? aluno.historicoPagamentos : [];
    
    // Considera inadimplente se houver qualquer mensalidade até o mês atual com status 'aberto' ou 'pendente'
    const temAberto = hist.some(
      (p, i) => i <= mesAtual && (p.status === "aberto" || p.status === "pendente")
    );
    
    if (temAberto) {
      inadimplentes++;
    }
  });

  // ------------------------------------------------------------------------
  // 3. PROCESSAMENTO DE ESTOQUE CRÍTICO DA CANTINA
  // ------------------------------------------------------------------------
  const estoque = JSON.parse(localStorage.getItem("fut10_estoque_cantina")) || [];
  const itensCriticos = estoque.filter(
    (item) => item && typeof item.quantidade === "number" && item.quantidade <= (item.minimo || estoqueMin)
  ).length;

  // ------------------------------------------------------------------------
  // 4. CÁLCULO DO TOTAL DE FIADO A RECEBER (COMANDAS DA CANTINA)
  // ------------------------------------------------------------------------
  const comandas = JSON.parse(localStorage.getItem("fut10_comandas_fiado")) || [];
  const totalFiado = comandas.reduce((acc, c) => acc + (Number(c.valor) || 0), 0);

  // ------------------------------------------------------------------------
  // 5. ATUALIZAÇÃO SEGURA DOS ELEMENTOS NO DOM
  // ------------------------------------------------------------------------
  const elAlunos = document.getElementById("kpi-alunos");
  const elInadimplentes = document.getElementById("kpi-inadimplentes");
  const elEstoque = document.getElementById("kpi-estoque");
  const elFiado = document.getElementById("kpi-fiado");

  if (elAlunos) elAlunos.textContent = alunos.length;
  if (elInadimplentes) elInadimplentes.textContent = inadimplentes;
  if (elEstoque) elEstoque.textContent = itensCriticos;
  if (elFiado) {
    elFiado.textContent = totalFiado.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
  }

  // ------------------------------------------------------------------------
  // 6. PROTEÇÃO CONTRA IMAGENS "UNDEFINED" NO DOM
  // Varre a página e substitui qualquer tag <img> cujo atributo src contenha 'undefined'
  // por um SVG padrão para evitar o erro 404 no console do navegador.
  // ------------------------------------------------------------------------
  sanitizarImagensUndefined();
}

/**
 * Função utilitária que varre e corrige imagens com caminho inválido ou 'undefined' no DOM.
 */
function sanitizarImagensUndefined() {
  const imagens = document.querySelectorAll("img");
  const fotoPadraoBola = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><circle cx='50' cy='50' r='50' fill='%2313335c'/><text x='50%' y='55%' dominant-baseline='middle' text-anchor='middle' font-size='50'>⚽</text></svg>";

  imagens.forEach((img) => {
    const src = img.getAttribute("src");
    if (!src || src.includes("undefined") || src === "null") {
      img.src = fotoPadraoBola;
    }
  });
}