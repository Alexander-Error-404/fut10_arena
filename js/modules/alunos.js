// ==========================================================================
// FUT 10 ARENA - MÓDULO DE GERENCIAMENTO DE ALUNOS (js/modules/alunos.js)
// ==========================================================================

// Carrega os alunos salvos no localStorage ou inicia uma lista vazia
let alunos = JSON.parse(localStorage.getItem('fut10_alunos')) || [];

// Guarda temporariamente a foto selecionada em formato Base64
let fotoBase64 = "";

/**
 * BLOCO: CÁLCULOS E REGRAS DE NEGÓCIO
 */
function calcularDiasDesde(dataString) {
    if (!dataString) return 999; 
    const dataPassada = new Date(dataString);
    const hoje = new Date();
    dataPassada.setHours(0, 0, 0, 0);
    hoje.setHours(0, 0, 0, 0);
    const diferencaTempo = hoje.getTime() - dataPassada.getTime();
    return Math.floor(diferencaTempo / (1000 * 60 * 60 * 24));
}

function obterStatusAluno(aluno) {
    const diasSemPresenca = calcularDiasDesde(aluno.ultimaPresenca || aluno.matricula);
    return diasSemPresenca >= 30 ? 'INATIVO' : 'ATIVO';
}

function contarAtivosNaTurma(nomeTurma, idIgnorar = "") {
    const turmaLimpa = nomeTurma.trim().toUpperCase();
    return alunos.filter(a => {
        if (a.id === idIgnorar) return false;
        return a.turma.trim().toUpperCase() === turmaLimpa && obterStatusAluno(a) === 'ATIVO';
    }).length;
}

function atualizarFiltroTurmas() {
    const filtroTurma = document.getElementById('filtro-turma-busca');
    if (!filtroTurma) return;
    
    const valorAtual = filtroTurma.value;
    filtroTurma.innerHTML = '<option value="">Selecione uma turma...</option>';
    
    const turmasUnicas = [...new Set(alunos.map(a => a.turma.trim().toUpperCase()))].sort();
    
    turmasUnicas.forEach(turma => {
        const option = document.createElement('option');
        option.value = turma;
        option.textContent = turma;
        filtroTurma.appendChild(option);
    });
    
    filtroTurma.value = valorAtual;
}

/**
 * BLOCO: RENDERIZAÇÃO DA LISTA DE ALUNOS E FILTROS
 */
export function renderizarListaAlunos() {
    const container = document.getElementById('alunos-lista');
    if (!container) return;

    atualizarFiltroTurmas();

    const buscaNome = (document.getElementById('busca-nome')?.value || '').toLowerCase();
    const buscaTurma = (document.getElementById('filtro-turma-busca')?.value || '').toUpperCase();
    const buscaStatus = document.getElementById('filtro-status-busca')?.value || '';
    const buscaHabilidade = document.getElementById('filtro-habilidade')?.value || '';

    const alunosFiltrados = alunos.filter(aluno => {
        const statusCalculado = obterStatusAluno(aluno);
        const bateNome = aluno.nome.toLowerCase().includes(buscaNome);
        const bateTurma = !buscaTurma || aluno.turma.trim().toUpperCase() === buscaTurma;
        const bateStatus = !buscaStatus || statusCalculado === buscaStatus;
        const bateHabilidade = !buscaHabilidade || String(aluno.estrelas || aluno.habilidade || '') === buscaHabilidade;
        
        return bateNome && bateTurma && bateStatus && bateHabilidade;
    });

    container.innerHTML = '';

    if (alunosFiltrados.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #dae3ef; margin-top: 20px;">Nenhum aluno encontrado.</p>';
        return;
    }

    alunosFiltrados.forEach(aluno => {
        const status = obterStatusAluno(aluno);
        const classeStatus = status === 'ATIVO' ? 'status-ativo' : 'status-inativo';

        const card = document.createElement('div');
        card.className = 'aluno-card';
        card.innerHTML = `
            <div class="aluno-header">
                <div class="aluno-foto-perfil ${classeStatus}">
                    <img src="${aluno.foto || 'assets/images/logo.png'}" alt="${aluno.nome}">
                </div>
                <div>
                    <h4 style="margin: 0; color: #fff;">${aluno.nome}</h4>
                    <span class="badge-categoria">${aluno.turma} | ${aluno.posicao || 'Sem Posição'}</span>
                </div>
            </div>
            <div class="aluno-detalhes">
                <p><strong>Responsável:</strong> ${aluno.responsavel || 'Não informado'}</p>
                <p><strong>WhatsApp:</strong> ${aluno.whatsapp || 'Não informado'}</p>
            </div>
            <div class="aluno-acoes">
                <button type="button" class="btn-acao btn-editar" onclick="window.editarAluno('${aluno.id}')">✏️ Edit</button>
                <button type="button" class="btn-acao btn-excluir" onclick="window.excluirAluno('${aluno.id}')">🗑️</button>
            </div>
        `;
        container.appendChild(card);
    });
}

export function inicializarEventosFiltros() {
    const idsFiltros = ['busca-nome', 'filtro-turma-busca', 'filtro-status-busca', 'filtro-habilidade'];
    idsFiltros.forEach(id => {
        const elemento = document.getElementById(id);
        if (elemento) {
            elemento.addEventListener('input', renderizarListaAlunos);
            elemento.addEventListener('change', renderizarListaAlunos);
        }
    });
}

/**
 * BLOCO: MODAL, UPLOAD DE FOTO E OPERAÇÕES DE SALVAR/EDITAR/EXCLUIR
 */
export function abrirModalAluno() {
    fotoBase64 = "";
    const form = document.getElementById('formAluno');
    if (form) form.reset();
    
    const campoId = document.getElementById('aluno-id');
    if (campoId) campoId.value = '';

    const preview = document.getElementById('foto-preview');
    if (preview) preview.innerHTML = '📸';

    const modal = document.getElementById('modal-aluno');
    if (modal) modal.style.display = 'flex';
}

export function fecharModalAluno() {
    const modal = document.getElementById('modal-aluno');
    if (modal) modal.style.display = 'none';
}

export function processarFotoAluno(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        fotoBase64 = e.target.result;
        const preview = document.getElementById('foto-preview');
        if (preview) {
            preview.innerHTML = `<img src="${fotoBase64}" alt="Foto" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">`;
        }
    };
    reader.readAsDataURL(file);
}

export function salvarAluno(event) {
    event.preventDefault();

    const id = document.getElementById('aluno-id')?.value;
    const turma = document.getElementById('aluno-turma')?.value || '';

    const ativosNaTurma = contarAtivosNaTurma(turma, id);
    if (ativosNaTurma >= 20) {
        alert(`Atenção: A turma "${turma}" já atingiu o limite máximo de 20 alunos ativos!`);
        return;
    }

    const alunoDados = {
        id: id || Date.now().toString(),
        nome: document.getElementById('aluno-nome')?.value || '',
        turma: turma,
        posicao: document.getElementById('aluno-posicao')?.value || '',
        pe: document.getElementById('aluno-pe')?.value || '',
        habilidade: document.getElementById('select-habilidade')?.value || '⭐',
        camiseta: document.getElementById('aluno-camiseta')?.value || '',
        short: document.getElementById('aluno-short')?.value || '',
        meiao: document.getElementById('aluno-meiao')?.value || '',
        responsavel: document.getElementById('aluno-responsavel')?.value || '',
        cpfResponsavel: document.getElementById('aluno-cpf-resp')?.value || '',
        whatsapp: document.getElementById('aluno-whatsapp')?.value || '',
        emergencia: document.getElementById('aluno-emergencia')?.value || '',
        retirada: document.getElementById('aluno-retirada')?.value || '',
        atestado: document.getElementById('atestado-dia')?.checked || false,
        imagem: document.getElementById('uso-imagem')?.checked || false,
        saude: document.getElementById('aluno-saude')?.value || '',
        matricula: id ? (alunos.find(a => a.id === id)?.matricula || new Date().toISOString().split('T')[0]) : new Date().toISOString().split('T')[0],
        foto: fotoBase64 || (id ? alunos.find(a => a.id === id)?.foto : '')
    };

    if (id) {
        const index = alunos.findIndex(a => a.id === id);
        if (index !== -1) alunos[index] = alunoDados;
    } else {
        alunos.push(alunoDados);
    }

    localStorage.setItem('fut10_alunos', JSON.stringify(alunos));
    fecharModalAluno();
    renderizarListaAlunos();
}

window.editarAluno = function(id) {
    const aluno = alunos.find(a => a.id === id);
    if (!aluno) return;

    abrirModalAluno();
    
    const setVal = (elemId, val) => {
        const el = document.getElementById(elemId);
        if (el) el.value = val || '';
    };

    setVal('aluno-id', aluno.id);
    setVal('aluno-nome', aluno.nome);
    setVal('aluno-turma', aluno.turma);
    setVal('aluno-posicao', aluno.posicao);
    setVal('aluno-pe', aluno.pe);
    setVal('select-habilidade', aluno.habilidade);
    setVal('aluno-camiseta', aluno.camiseta);
    setVal('aluno-short', aluno.short);
    setVal('aluno-meiao', aluno.meiao);
    setVal('aluno-responsavel', aluno.responsavel);
    setVal('aluno-cpf-resp', aluno.cpfResponsavel);
    setVal('aluno-whatsapp', aluno.whatsapp);
    setVal('aluno-emergencia', aluno.emergencia);
    setVal('aluno-retirada', aluno.retirada);
    setVal('aluno-saude', aluno.saude);

    fotoBase64 = aluno.foto || '';
    const preview = document.getElementById('foto-preview');
    if (preview && fotoBase64) {
        preview.innerHTML = `<img src="${fotoBase64}" alt="Foto" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">`;
    }
};

window.excluirAluno = function(id) {
    if (confirm('Tem certeza que deseja excluir este aluno?')) {
        alunos = alunos.filter(a => a.id !== id);
        localStorage.setItem('fut10_alunos', JSON.stringify(alunos));
        renderizarListaAlunos();
    }
};