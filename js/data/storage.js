/* ==========================================================================
   FUT 10 ARENA - CAMADA DE ARMAZENAMENTO (js/data/storage.js)
   ========================================================================== */

const CHAVE_ALUNOS = 'fut10_alunos';
const CHAVE_MENSALIDADES = 'fut10_mensalidades';
const CHAVE_CONFIG = 'fut10_configuracoes';
const CHAVE_SESSAO = 'usuarioLogado';

// DADOS PADRÃO DE BACKUP
const ALUNOS_PADRAO = [
  {
    id: "1",
    nome: "Lucas Gabriel Silva",
    status: "ATIVO",
    dataNascimento: "2015-05-12",
    turma: "SUB-11",
    frequencia: "2x na semana",
    habilidade: "⭐⭐⭐⭐",
    horario: "Ter e Qui - 09:00",
    posicao: "Centroavante",
    pe: "Destro",
    camiseta: "10",
    short: "M",
    meiao: "34-38",
    dataMatricula: "2024-01-10",
    cpfCrianca: "123.456.789-00",
    responsavel: "Carlos Silva",
    cpfResp: "987.654.321-11",
    whatsapp: "(16) 99999-8888",
    emergencia: "(16) 98888-7777",
    retirada: "Mãe ou Pai",
    temIrmao: false,
    atestadoDia: true,
    usoImagem: true,
    restricoesSaude: "Nenhuma",
    alergias: "Nenhuma",
    convenio: "Unimed",
    carteirinha: "0012345"
  }
];

const CONFIG_PADRAO = {
  mensalidade1xP1: "R$ 90,00",
  mensalidade2xP1: "R$ 150,00",
  mensalidade1xP2: "R$ 100,00",
  mensalidade2xP2: "R$ 160,00",
  mensalidade1xP3: "R$ 110,00",
  mensalidade2xP3: "R$ 170,00",
  descontoIrmao1x: "R$ 5,00",
  descontoIrmao2x: "R$ 10,00",
  uniformeVista: "R$ 130,00",
  uniformePrazo: "R$ 140,00",
  meiaoA: "R$ 40,00",
  meiaoB: "R$ 30,00",
  shortsA: "R$ 55,00",
  camisetaFut10: "R$ 65,00"
};

// 0. GESTÃO DE SESSÃO / AUTENTICAÇÃO
export function getUsuarioSessao() {
  return localStorage.getItem(CHAVE_SESSAO);
}

export function salvarSessao(usuario) {
  localStorage.setItem(CHAVE_SESSAO, usuario);
}

export function limparSessao() {
  localStorage.removeItem(CHAVE_SESSAO);
}

// 1. GESTÃO DE ALUNOS
export function getAlunos() {
  const dados = localStorage.getItem(CHAVE_ALUNOS);
  if (!dados) {
    localStorage.setItem(CHAVE_ALUNOS, JSON.stringify(ALUNOS_PADRAO));
    return ALUNOS_PADRAO;
  }
  try {
    return JSON.parse(dados);
  } catch (e) {
    return ALUNOS_PADRAO;
  }
}

export function salvarAlunos(alunos) {
  localStorage.setItem(CHAVE_ALUNOS, JSON.stringify(alunos));
}

// 2. GESTÃO DE MENSALIDADES
export function getMensalidades() {
  const dados = localStorage.getItem(CHAVE_MENSALIDADES);
  if (!dados) {
    localStorage.setItem(CHAVE_MENSALIDADES, JSON.stringify({}));
    return {};
  }
  try {
    return JSON.parse(dados);
  } catch (e) {
    return {};
  }
}

export function salvarMensalidade(alunoId, ano, mesIndex, dadosPagamento) {
  const mensalidades = getMensalidades();
  
  if (!mensalidades[alunoId]) {
    mensalidades[alunoId] = {};
  }
  if (!mensalidades[alunoId][ano]) {
    mensalidades[alunoId][ano] = {};
  }

  mensalidades[alunoId][ano][mesIndex] = dadosPagamento;
  localStorage.setItem(CHAVE_MENSALIDADES, JSON.stringify(mensalidades));
}

// 3. GESTÃO DE CONFIGURAÇÕES
export function getConfiguracoes() {
  const dados = localStorage.getItem(CHAVE_CONFIG);
  if (!dados) {
    localStorage.setItem(CHAVE_CONFIG, JSON.stringify(CONFIG_PADRAO));
    return CONFIG_PADRAO;
  }
  try {
    return JSON.parse(dados);
  } catch (e) {
    return CONFIG_PADRAO;
  }
}

export function salvarConfiguracoes(novasConfig) {
  localStorage.setItem(CHAVE_CONFIG, JSON.stringify(novasConfig));
}