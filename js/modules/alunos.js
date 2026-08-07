/* ==========================================================================
   FUT 10 ARENA - MÓDULO DE GESTÃO DE ALUNOS (js/modules/alunos.js)
   ========================================================================== */

import { renderizarDashboard } from "./dashboard.js";

// 1. CONTROLE DE ABERTURA E FECHAMENTO DO MODAL
export function abrirModalAluno() {
  const modal = document.getElementById("modal-aluno");
  if (modal) {
    modal.classList.add("active");
    modal.style.display = "flex";
  }
}

export function fecharModalAluno() {
  const modal = document.getElementById("modal-aluno");
  if (modal) {
    modal.classList.remove("active");
    modal.style.display = "none";
  }
  const form = document.getElementById("formAluno");
  if (form) form.reset();

  const inputId = document.getElementById("aluno-id");
  if (inputId) inputId.value = "";

  const preview = document.getElementById("foto-preview");
  if (preview) {
    preview.innerHTML = "📸";
    delete preview.dataset.fotoBase64;
  }
}

// 2. PROCESSAMENTO DA FOTO DO ALUNO
export function processarFotoAluno(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const preview = document.getElementById("foto-preview");
      if (preview) {
        preview.innerHTML = `<img src="${e.target.result}" alt="Foto do Aluno" style="width:100%; height:100%; border-radius:50%; object-fit:cover;">`;
        preview.dataset.fotoBase64 = e.target.result;
      }
    };
    reader.readAsDataURL(file);
  }
}

// 3. CÁLCULO AUTOMÁTICO DA IDADE
export function calcularIdadeAutomatica(dataNascimento) {
  if (!dataNascimento) return "";
  const hoje = new Date();
  const nasc = new Date(dataNascimento);
  let idade = hoje.getFullYear() - nasc.getFullYear();
  const mes = hoje.getMonth() - nasc.getMonth();
  if (mes < 0 || (mes === 0 && hoje.getDate() < nasc.getDate())) {
    idade--;
  }
  return idade >= 0 ? `${idade} anos` : "";
}

// 4. CAPTURA E PADRONIZAÇÃO DE DADOS (MAIÚSCULAS)
function capturarDadosFormulario() {
  const fotoPreview = document.getElementById("foto-preview");
  const campoDataNasc = document.getElementById("data-nasc");
  const dataNasc = campoDataNasc?.value || "";

  const maiusculo = (id) => (document.getElementById(id)?.value || "").toUpperCase().trim();

  const fotoPadraoBola = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><circle cx='50' cy='50' r='50' fill='%2313335c'/><text x='50%' y='55%' dominant-baseline='middle' text-anchor='middle' font-size='50'>⚽</text></svg>";

  return {
    id: document.getElementById("aluno-id")?.value || Date.now().toString(),
    foto: fotoPreview?.dataset?.fotoBase64 || fotoPadraoBola,
    nome: maiusculo("aluno-nome"),
    status: document.getElementById("aluno-status-exibicao")?.value || "ATIVO",
    dataNascimento: dataNasc,
    idade: calcularIdadeAutomatica(dataNasc),
    turma: maiusculo("aluno-turma"),
    frequencia: document.getElementById("aluno-frequencia")?.value || "",
    habilidade: document.getElementById("select-habilidade")?.value || "⭐",
    horario: maiusculo("aluno-horario"),
    posicao: document.getElementById("aluno-posicao")?.value || "",
    pe: document.getElementById("aluno-pe")?.value || "",
    camiseta: maiusculo("aluno-camiseta"),
    short: maiusculo("aluno-short"),
    meiao: maiusculo("aluno-meiao"),
    dataMatricula: document.getElementById("aluno-matricula")?.value || "",
    cpfCrianca: document.getElementById("aluno-cpf-crianca")?.value || "",
    responsavel: maiusculo("aluno-responsavel"),
    cpfResponsavel: document.getElementById("aluno-cpf-resp")?.value || "",
    whatsapp: document.getElementById("aluno-whatsapp")?.value || "",
    emergencia: document.getElementById("aluno-emergencia")?.value || "",
    retirada: maiusculo("aluno-retirada"),
    temIrmao: document.getElementById("tem-irmao")?.checked || false,
    atestadoDia: document.getElementById("atestado-dia")?.checked || false,
    usoImagem: document.getElementById("uso-imagem")?.checked || false,
    restricoesSaude: maiusculo("aluno-saude"),
    alergias: maiusculo("aluno-alergias"),
    convenio: maiusculo("aluno-convenio"),
    carteirinha: maiusculo("aluno-carteirinha")
  };
}
// 5. SALVAR OU EDITAR ALUNO COM VALIDAÇÃO E FOCO NO CAMPO VAZIO
export function salvarAluno(event) {
  if (event) event.preventDefault();

  // Mapeamento dos campos com o ID do campo, ID da aba correspondente e Nome do Campo
  const camposObrigatorios = [
    // Aba Técnico
    { id: "aluno-nome", tab: "dados-tecnicos", nome: "Nome Completo" },
    { id: "data-nasc", tab: "dados-tecnicos", nome: "Data de Nascimento" },
    { id: "aluno-turma", tab: "dados-tecnicos", nome: "Turma" },
    { id: "aluno-frequencia", tab: "dados-tecnicos", nome: "Frequência" },
    { id: "aluno-horario", tab: "dados-tecnicos", nome: "Dia / Horário" },
    { id: "aluno-posicao", tab: "dados-tecnicos", nome: "Posição" },
    { id: "aluno-pe", tab: "dados-tecnicos", nome: "Pé Chutador" },
    { id: "aluno-camiseta", tab: "dados-tecnicos", nome: "Camiseta" },
    { id: "aluno-short", tab: "dados-tecnicos", nome: "Short" },
    { id: "aluno-meiao", tab: "dados-tecnicos", nome: "Meião" },
    
    // Aba Família
    { id: "aluno-matricula", tab: "dados-responsaveis", nome: "Data da Matrícula" },
    { id: "aluno-cpf-crianca", tab: "dados-responsaveis", nome: "CPF da Criança" },
    { id: "aluno-responsavel", tab: "dados-responsaveis", nome: "Nome do Responsável" },
    { id: "aluno-cpf-resp", tab: "dados-responsaveis", nome: "CPF do Responsável" },
    { id: "aluno-whatsapp", tab: "dados-responsaveis", nome: "WhatsApp" },
    { id: "aluno-emergencia", tab: "dados-responsaveis", nome: "Número de Emergência" },
    { id: "aluno-retirada", tab: "dados-responsaveis", nome: "Quem pode retirar" },

    // Aba Saúde
    { id: "aluno-saude", tab: "dados-saude", nome: "Restrições de Saúde" },
    { id: "aluno-alergias", tab: "dados-saude", nome: "Alergias" },
    { id: "aluno-convenio", tab: "dados-saude", nome: "Convênio" },
    { id: "aluno-carteirinha", tab: "dados-saude", nome: "Nº Carteirinha" }
  ];

  // Procura o PRIMEIRO campo que está vazio
  for (const item of camposObrigatorios) {
    const el = document.getElementById(item.id);
    if (!el || !el.value.trim()) {
      alert(`⚠️ Por favor, preencha o campo "${item.nome}"!`);

      // 1. Alterna visualmente para a aba correta se ela não estiver ativa
      const tabBtn = document.querySelector(`.tab-btn[data-tab="${item.tab}"]`);
      if (tabBtn) tabBtn.click();

      // 2. Coloca o cursor no campo vazio
      if (el) {
        el.focus();
        
        // Efeito de destaque rápido no campo faltante
        const bordaOriginal = el.style.borderColor;
        el.style.borderColor = "#ff5252";
        setTimeout(() => {
          el.style.borderColor = bordaOriginal;
        }, 3000);
      }
      return; // Interrompe o salvamento aqui
    }
  }

  // Se passou por tudo sem estar vazio, lê os dados e salva
  const a = capturarDadosFormulario();

  try {
    let listaAlunos = JSON.parse(localStorage.getItem("fut10_alunos") || "[]");
    const indexExistente = listaAlunos.findIndex((item) => item.id === a.id);

    if (indexExistente >= 0) {
      listaAlunos[indexExistente] = a;
      alert("✅ Alterações do aluno salvas com sucesso!");
    } else {
      listaAlunos.unshift(a);
      alert("✅ Novo aluno cadastrado com sucesso!");
    }

    localStorage.setItem("fut10_alunos", JSON.stringify(listaAlunos));
  } catch (erro) {
    alert("Erro ao salvar os dados no navegador.");
    return;
  }

  fecharModalAluno();
  renderizarListaAlunos();
}

// 6. CARREGAR ALUNO NO MODAL PARA EDIÇÃO
export function preencherModalParaEdicao(alunoId) {
  const listaAlunos = JSON.parse(localStorage.getItem("fut10_alunos") || "[]");
  const aluno = listaAlunos.find((item) => item.id === alunoId);
  if (!aluno) return;

  document.getElementById("aluno-id").value = aluno.id;
  document.getElementById("aluno-nome").value = aluno.nome || "";
  document.getElementById("aluno-status-exibicao").value = aluno.status || "ATIVO";
  document.getElementById("data-nasc").value = aluno.dataNascimento || "";
  document.getElementById("idade-aluno").value = aluno.idade || "";
  document.getElementById("aluno-turma").value = aluno.turma || "";
  document.getElementById("aluno-frequencia").value = aluno.frequencia || "1x na semana";
  document.getElementById("select-habilidade").value = aluno.habilidade || "⭐";
  document.getElementById("aluno-horario").value = aluno.horario || "";
  document.getElementById("aluno-posicao").value = aluno.posicao || "Goleiro";
  document.getElementById("aluno-pe").value = aluno.pe || "Destro";
  document.getElementById("aluno-camiseta").value = aluno.camiseta || "";
  document.getElementById("aluno-short").value = aluno.short || "";
  document.getElementById("aluno-meiao").value = aluno.meiao || "";
  document.getElementById("aluno-matricula").value = aluno.dataMatricula || "";
  document.getElementById("aluno-cpf-crianca").value = aluno.cpfCrianca || "";
  document.getElementById("aluno-responsavel").value = aluno.responsavel || "";
  document.getElementById("aluno-cpf-resp").value = aluno.cpfResponsavel || "";
  document.getElementById("aluno-whatsapp").value = aluno.whatsapp || "";
  document.getElementById("aluno-emergencia").value = aluno.emergencia || "";
  document.getElementById("aluno-retirada").value = aluno.retirada || "";
  document.getElementById("tem-irmao").checked = !!aluno.temIrmao;
  document.getElementById("atestado-dia").checked = !!aluno.atestadoDia;
  document.getElementById("uso-imagem").checked = !!aluno.usoImagem;
  document.getElementById("aluno-saude").value = aluno.restricoesSaude || "";
  document.getElementById("aluno-alergias").value = aluno.alergias || "";
  document.getElementById("aluno-convenio").value = aluno.convenio || "";
  document.getElementById("aluno-carteirinha").value = aluno.carteirinha || "";

  const preview = document.getElementById("foto-preview");
  if (preview && aluno.foto) {
    preview.innerHTML = `<img src="${aluno.foto}" style="width:100%; height:100%; border-radius:50%; object-fit:cover;">`;
    preview.dataset.fotoBase64 = aluno.foto;
  }

  abrirModalAluno();
}

// 7. EXCLUIR ALUNO COM CONFIRMAÇÃO
export function excluirAluno(alunoId, nomeAluno) {
  const confirmou = confirm(`⚠️ Tem certeza que deseja EXCLUIR o cadastro de "${nomeAluno}"?\nEsta ação não poderá ser desfeita.`);
  if (!confirmou) return;

  try {
    let listaAlunos = JSON.parse(localStorage.getItem("fut10_alunos") || "[]");
    listaAlunos = listaAlunos.filter((item) => item.id !== alunoId);
    localStorage.setItem("fut10_alunos", JSON.stringify(listaAlunos));
    renderizarListaAlunos();
    alert("🗑️ Aluno removido com sucesso!");
  } catch (erro) {
    alert("Erro ao excluir aluno.");
  }
}

// 8. COMBOBOX DINÂMICO DE TURMAS
function atualizarFiltroTurmas(listaAlunos) {
  const selectTurma = document.getElementById("filtro-turma");
  if (!selectTurma) return;

  const turmaAtual = selectTurma.value;
  const turmasUnicas = [...new Set(listaAlunos.map((a) => a.turma).filter(Boolean))];

  selectTurma.innerHTML = `<option value="">Todas as Turmas</option>` +
    turmasUnicas.map((t) => `<option value="${t}" ${t === turmaAtual ? "selected" : ""}>${t}</option>`).join("");
}
// 9. RENDERIZAR CARDS DOS ALUNOS COM FILTROS CORRIGIDOS E LINK DO WHATSAPP
export function renderizarListaAlunos() {
  const container = document.getElementById("alunos-lista");
  if (!container) return;

  const listaAlunos = JSON.parse(localStorage.getItem("fut10_alunos") || "[]");

  atualizarFiltroTurmas(listaAlunos);

  // Captura os valores de cada filtro ajustando para os IDs reais do index.html
  const termoBusca = (document.getElementById("busca-nome")?.value || "").toLowerCase().trim();
  const turmaSelecionada = document.getElementById("filtro-turma")?.value || "";
  const statusSelecionado = (document.getElementById("filtro-status-busca")?.value || "").toUpperCase().trim();
  const habilidadeSelecionada = document.getElementById("filtro-habilidade")?.value || "";

  // Filtra os alunos combinando todas as condições
  const alunosFiltrados = listaAlunos.filter((aluno) => {
    const atendeNome = (aluno.nome || "").toLowerCase().includes(termoBusca);
    const atendeTurma = !turmaSelecionada || aluno.turma === turmaSelecionada;
    
    // Filtro por Status (ATIVO / INATIVO)
    const atendeStatus = !statusSelecionado || (aluno.status || "ATIVO").toUpperCase() === statusSelecionado;
    
    // Filtro por Habilidade: Conta quantas estrelas '⭐' existem no cadastro do aluno
    const qtdEstrelasAluno = (aluno.habilidade || "").split("⭐").length - 1;
    const atendeHabilidade = !habilidadeSelecionada || 
      aluno.habilidade === habilidadeSelecionada || 
      qtdEstrelasAluno.toString() === habilidadeSelecionada;

    return atendeNome && atendeTurma && atendeStatus && atendeHabilidade;
  });

  if (alunosFiltrados.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:30px 15px; color:#dae3ef;">
        <p style="font-size: 16px; margin-bottom: 5px;">Nenhum aluno encontrado.</p>
        <small>Verifique os filtros ou cadastre um novo aluno.</small>
      </div>
    `;
    renderizarDashboard();
    return;
  }

  container.innerHTML = alunosFiltrados
    .map((aluno) => {
      const fotoHtml = `<img src="${aluno.foto}" style="width:50px; height:50px; border-radius:50%; object-fit:cover;">`;
      const numeroLimpo = (aluno.whatsapp || "").replace(/\D/g, "");
      const linkWhatsapp = numeroLimpo ? `https://wa.me/55${numeroLimpo}` : "#";

      return `
        <div class="aluno-card" style="background:#0b1d3a; border-radius:12px; padding:15px; margin-bottom:12px; border:1px solid #1e3a63; position:relative;">
          <div style="display:flex; align-items:flex-start; gap:12px;">
            <div class="aluno-foto-perfil" style="flex-shrink:0;">
              ${fotoHtml}
            </div>
            
            <div style="flex:1; min-width:0;" onclick="window.preencherModalParaEdicao('${aluno.id}')">
              <h4 style="margin:0; font-size:1rem; color:#ffffff; font-weight:bold; word-break:break-word;">
                ${aluno.nome}
              </h4>
              <div style="font-size:0.85rem; margin:4px 0; color:#ffd700;">
                ${aluno.habilidade}
              </div>
              <span class="badge-categoria" style="display:inline-block; background:#d32f2f; color:#fff; font-size:0.7rem; padding:2px 6px; border-radius:4px; font-weight:bold;">
                ${aluno.turma || "SEM TURMA"}
              </span>
            </div>

            <button onclick="window.excluirAluno('${aluno.id}', '${aluno.nome}')" title="Excluir Aluno" style="background:transparent; border:none; color:#ff5252; font-size:1.2rem; cursor:pointer; padding:2px 6px;">
              🗑️
            </button>
          </div>

          <div style="font-size:0.82rem; color:#dae3ef; border-top:1px solid #1a3356; margin-top:10px; padding-top:8px;">
            <p style="margin:3px 0;" onclick="window.preencherModalParaEdicao('${aluno.id}')">
              <strong>Posição:</strong> ${aluno.posicao || 'N/A'} | <strong>Pé:</strong> ${aluno.pe || 'N/A'}
            </p>
            <p style="margin:5px 0;">
              <strong>Responsável:</strong> ${aluno.responsavel} 
              ${
                numeroLimpo 
                  ? `<a href="${linkWhatsapp}" target="_blank" style="color:#25d366; text-decoration:none; font-weight:bold; margin-left:5px; background:rgba(37,211,102,0.15); padding:2px 6px; border-radius:4px;">
                      💬 ${aluno.whatsapp}
                     </a>`
                  : `(${aluno.whatsapp})`
              }
            </p>
          </div>
        </div>
      `;
    })
    .join("");
    renderizarDashboard();
}

// 10. MÁSCARAS DE ENTRADA E ESCUTADORES DE EVENTOS
export function inicializarEventosFiltros() {
  const buscaNome = document.getElementById("busca-nome");
  if (buscaNome) buscaNome.addEventListener("input", renderizarListaAlunos);

  const filtroTurma = document.getElementById("filtro-turma");
  if (filtroTurma) filtroTurma.addEventListener("change", renderizarListaAlunos);

  // Escutador ajustado com o ID real do HTML
  const filtroStatus = document.getElementById("filtro-status-busca");
  if (filtroStatus) filtroStatus.addEventListener("change", renderizarListaAlunos);

  const filtroHabilidade = document.getElementById("filtro-habilidade");
  if (filtroHabilidade) filtroHabilidade.addEventListener("change", renderizarListaAlunos);

  aplicarMascaraInput("aluno-cpf-crianca", mascararCPF);
  aplicarMascaraInput("aluno-cpf-resp", mascararCPF);
  aplicarMascaraInput("aluno-whatsapp", mascararTelefone);
  aplicarMascaraInput("aluno-emergencia", mascararTelefone);
}

function aplicarMascaraInput(id, funcaoMascara) {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener("input", (e) => {
      e.target.value = funcaoMascara(e.target.value);
    });
  }
}

function mascararCPF(v) {
  v = v.replace(/\D/g, "").slice(0, 11);
  v = v.replace(/(\d{3})(\d)/, "$1.$2");
  v = v.replace(/(\d{3})(\d)/, "$1.$2");
  v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  return v;
}

function mascararTelefone(v) {
  v = v.replace(/\D/g, "").slice(0, 11);
  v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
  v = v.replace(/(\d{5})(\d)/, "$1-$2");
  return v;
}

// EXPOSIÇÃO GLOBAL DE FUNÇÕES
window.preencherModalParaEdicao = preencherModalParaEdicao;
window.excluirAluno = excluirAluno;