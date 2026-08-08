import { getAlunos, getMensalidades, salvarMensalidade, getConfiguracoes } from '../data/storage.js';

const MESES = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

export function initMensalidades() {
  const selectAno = document.getElementById('filtro-mensalidade-ano');
  const selectStatus = document.getElementById('filtro-mensalidade-status');
  const inputBusca = document.getElementById('busca-mensalidade-aluno');
  const btnFecharModal = document.getElementById('fechar-modal-pagamento');
  const formPagamento = document.getElementById('form-pagamento');

  if (selectAno) selectAno.addEventListener('change', renderizarMensalidades);
  if (selectStatus) selectStatus.addEventListener('change', renderizarMensalidades);
  if (inputBusca) inputBusca.addEventListener('input', renderizarMensalidades);
  if (btnFecharModal) btnFecharModal.addEventListener('click', fecharModalPagamento);
  if (formPagamento) formPagamento.addEventListener('submit', processarPagamento);

  renderizarMensalidades();
}

export function renderizarMensalidades() {
  const container = document.getElementById('lista-alunos-mensalidades');
  if (!container) return;

  const ano = parseInt(document.getElementById('filtro-mensalidade-ano')?.value || '2026', 10);
  const statusFiltro = document.getElementById('filtro-mensalidade-status')?.value || 'todos';
  const termoBusca = document.getElementById('busca-mensalidade-aluno')?.value.toLowerCase().trim() || '';

  const alunos = getAlunos().filter(a => a.status !== 'INATIVO');
  const todasMensalidades = getMensalidades();

  const alunosFiltrados = alunos.filter(aluno => {
    const atendeNome = aluno.nome.toLowerCase().includes(termoBusca);
    if (!atendeNome) return false;

    if (statusFiltro === 'inadimplentes') {
      const mensAluno = todasMensalidades[aluno.id]?.[ano] || {};
      const mesAtualIndex = new Date().getMonth();
      let temPendente = false;
      for (let i = 0; i <= mesAtualIndex; i++) {
        if (!mensAluno[i] || mensAluno[i].status !== 'PAGO') {
          temPendente = true;
          break;
        }
      }
      return temPendente;
    }
    return true;
  });

  if (alunosFiltrados.length === 0) {
    container.innerHTML = '<p style="color: #94a3b8; text-align: center; padding: 20px;">Nenhum aluno cadastrado ou encontrado.</p>';
    return;
  }

  container.innerHTML = alunosFiltrados.map(aluno => {
    const mensAluno = todasMensalidades[aluno.id]?.[ano] || {};
    
    const gridMeses = MESES.map((mes, idx) => {
      const registro = mensAluno[idx];
      const estaPago = registro && registro.status === 'PAGO';
      const classeStatus = estaPago ? 'pago' : 'pendente';
      const icone = estaPago ? '✓' : '!';

      return `
        <button type="button" 
                class="btn-mes ${classeStatus}" 
                onclick="window.abrirPagamento('${aluno.id}', ${idx}, ${ano})"
                style="padding: 6px; border-radius: 6px; border: none; background: ${estaPago ? '#10b981' : '#ef4444'}; color: #fff; cursor: pointer;">
          <div>${mes}</div>
          <small>${icone}</small>
        </button>
      `;
    }).join('');

    return `
      <div class="aluno-card-mensalidade" style="background: #0b2545; border-radius: 10px; padding: 15px; margin-bottom: 15px; border: 1px solid #13335c;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
          <div>
            <h4 style="color: #fff; margin: 0;">${aluno.nome}</h4>
            <small style="color: #94a3b8;">${aluno.turma || 'Sem Turma'} | ${aluno.frequencia || '1x na semana'}</small>
          </div>
        </div>
        <div class="grid-meses-container" style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 6px;">
          ${gridMeses}
        </div>
      </div>
    `;
  }).join('');
}

// Vincula explicitamente no window para funcionar via HTML inline
window.abrirPagamento = function(alunoId, mesIndex, ano) {
  const alunos = getAlunos();
  const aluno = alunos.find(a => String(a.id) === String(alunoId));
  if (!aluno) return;

  const hoje = new Date();
  const dataHojeStr = hoje.toISOString().split('T')[0];

  document.getElementById('pay-aluno-id').value = alunoId;
  document.getElementById('pay-mes-index').value = mesIndex;
  document.getElementById('pay-ano-ref').value = ano;
  
  document.getElementById('pay-aluno-nome').textContent = aluno.nome;
  document.getElementById('pay-mes-nome').textContent = `${MESES[mesIndex]}/${ano}`;
  document.getElementById('pay-data-pagamento').value = dataHojeStr;

  const modal = document.getElementById('modal-pagamento');
  if (modal) modal.classList.add('active');
};

export function fecharModalPagamento() {
  const modal = document.getElementById('modal-pagamento');
  if (modal) modal.classList.remove('active');
}

function processarPagamento(e) {
  e.preventDefault();
  const alunoId = document.getElementById('pay-aluno-id').value;
  const mesIndex = document.getElementById('pay-mes-index').value;
  const ano = document.getElementById('pay-ano-ref').value;
  const valorPago = parseFloat(document.getElementById('pay-valor-real').value);
  const dataPagamento = document.getElementById('pay-data-pagamento').value;
  const formaPagamento = document.getElementById('pay-forma-pagamento').value;

  salvarMensalidade(alunoId, ano, mesIndex, {
    status: 'PAGO',
    valorPago,
    dataPagamento,
    formaPagamento,
    dataRegistro: new Date().toISOString()
  });

  fecharModalPagamento();
  renderizarMensalidades();
}