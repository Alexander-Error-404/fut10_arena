/* ==========================================================================
   FUT 10 ARENA - MÓDULO DO DASHBOARD (dashboard.js)
   ========================================================================== */

/**
 * Atualiza os valores dos 4 KPIs na tela do Dashboard
 */
export function renderizarDashboard() {
  // 1. Busca configurações ou usa padrões
  const config = JSON.parse(localStorage.getItem('fut10_configuracoes')) || {};
  const limiteInativo = config.limiteDiasInativo || 30;
  const estoqueMin = config.estoqueMinimo || 5;

  // 2. Processa dados de Alunos
  const alunos = JSON.parse(localStorage.getItem('fut10_alunos')) || [];
  const mesAtual = new Date().getMonth();
  let inadimplentes = 0;

  alunos.forEach(aluno => {
    const hist = aluno.historicoPagamentos || [];
    const temAberto = hist.some((p, i) => i <= mesAtual && p.status === 'aberto');
    if (temAberto) inadimplentes++;
  });

  // 3. Processa dados da Cantina e Fiado
  const estoque = JSON.parse(localStorage.getItem('fut10_estoque_cantina')) || [];
  const itensCriticos = estoque.filter(item => item.quantidade <= (item.minimo || estoqueMin)).length;

  const comandas = JSON.parse(localStorage.getItem('fut10_comandas_fiado')) || [];
  const totalFiado = comandas.reduce((acc, c) => acc + (c.valor || 0), 0);

  // 4. Preenche os elementos existentes no HTML
  const elAlunos = document.getElementById('kpi-alunos');
  const elInadimplentes = document.getElementById('kpi-inadimplentes');
  const elEstoque = document.getElementById('kpi-estoque');
  const elFiado = document.getElementById('kpi-fiado');

  if (elAlunos) elAlunos.textContent = alunos.length;
  if (elInadimplentes) elInadimplentes.textContent = inadimplentes;
  if (elEstoque) elEstoque.textContent = itensCriticos;
  if (elFiado) {
    elFiado.textContent = totalFiado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
}