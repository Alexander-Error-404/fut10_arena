/* ==========================================================================
   FUT 10 ARENA - MÓDULO DE GESTÃO DE ALUNOS (js/modules/alunos.js) - PARTE 1
   ========================================================================== */

// BLOCO 1: CONTROLE DE ABERTURA E FECHAMENTO DO MODAL
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
}

// BLOCO 2: PROCESSAMENTO E CONVERSÃO DA FOTO DO ALUNO
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

// BLOCO 3: CÁLCULO DE IDADE AUTOMÁTICO
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

// BLOCO 4: CAPTURA COMPLETA DOS DADOS DO FORMULÁRIO
function capturarDadosFormulario() {
  const fotoPreview = document.getElementById("foto-preview");
  const campoDataNasc = document.getElementById("data-nasc") || document.getElementById("aluno-nascimento");
  const dataNasc = campoDataNasc?.value || "";

  // Se nao houver foto enviada, atribui a foto padrao da bola (SVG/Emoji formatado)
  const fotoPadraoBola = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><circle cx='50' cy='50' r='50' fill='%2313335c'/><text x='50%' y='55%' dominant-baseline='middle' text-anchor='middle' font-size='50'>⚽</text></svg>";

  return {
    id: document.getElementById("aluno-id")?.value || Date.now().toString(),
    foto: fotoPreview?.dataset?.fotoBase64 || fotoPadraoBola,
    temFotoEnviada: !!fotoPreview?.dataset?.fotoBase64,
    nome: document.getElementById("aluno-nome")?.value || "",
    status: document.getElementById("aluno-status-exibicao")?.value || "ATIVO",
    dataNascimento: dataNasc,
    idade: calcularIdadeAutomatica(dataNasc),
    turma: document.getElementById("aluno-turma")?.value || "",
    frequencia: document.getElementById("aluno-frequencia")?.value || "",
    habilidade: document.getElementById("select-habilidade")?.value || "⭐",
    horario: document.getElementById("aluno-horario")?.value || "",
    posicao: document.getElementById("aluno-posicao")?.value || "",
    pe: document.getElementById("aluno-pe")?.value || "",
    camiseta: document.getElementById("aluno-camiseta")?.value || "",
    short: document.getElementById("aluno-short")?.value || "",
    meiao: document.getElementById("aluno-meiao")?.value || "",
    dataMatricula: (document.getElementById("aluno-matricula") || document.getElementById("aluno-data-matricula"))?.value || "",
    cpfCrianca: (document.getElementById("aluno-cpf-crianca") || document.getElementById("aluno-cpf"))?.value || "",
    responsavel: document.getElementById("aluno-responsavel")?.value || "",
    cpfResponsavel: (document.getElementById("aluno-cpf-resp") || document.getElementById("aluno-cpf-responsavel"))?.value || "",
    whatsapp: document.getElementById("aluno-whatsapp")?.value || "",
    emergencia: document.getElementById("aluno-emergencia")?.value || "",
    retirada: document.getElementById("aluno-retirada")?.value || "",
    temIrmao: document.getElementById("tem-irmao")?.checked || false,
    atestadoDia: document.getElementById("atestado-dia")?.checked || false,
    usoImagem: document.getElementById("uso-imagem")?.checked || false,
    restricoesSaude: document.getElementById("aluno-saude")?.value || "",
    alergias: document.getElementById("aluno-alergias")?.value || "",
    convenio: document.getElementById("aluno-convenio")?.value || "",
    carteirinha: document.getElementById("aluno-carteirinha")?.value || ""
  };
}
/* ==========================================================================
   FUT 10 ARENA - MÓDULO DE GESTÃO DE ALUNOS (js/modules/alunos.js) - PARTE 2
   ========================================================================== */

// BLOCO 5: VALIDAÇÃO RIGOROSA E SALVAMENTO NO LOCALSTORAGE
export function salvarAluno(event) {
  if (event) event.preventDefault();

  const a = capturarDadosFormulario();

  // 1. Validação da Aba Técnico + Foto
  if (!a.nome.trim() || !a.dataNascimento || !a.turma || !a.frequencia || !a.horario || 
      !a.posicao || !a.pe || !a.camiseta || !a.short || !a.meiao || !a.dataMatricula || !a.cpfCrianca) {
    alert("⚠️ Preencha TODOS os campos obrigatórios da aba TÉCNICO!");
    return;
  }

  // 2. Validação da Aba Família
  if (!a.responsavel.trim() || !a.cpfResponsavel.trim() || !a.whatsapp.trim() || !a.emergencia.trim() || !a.retirada.trim()) {
    alert("⚠️ Preencha TODOS os campos obrigatórios da aba FAMÍLIA!");
    return;
  }

  // Gravação no localStorage
  try {
    let listaAlunos = JSON.parse(localStorage.getItem("fut10_alunos") || "[]");
    const indexExistente = listaAlunos.findIndex((item) => item.id === a.id);

    if (indexExistente >= 0) {
      listaAlunos[indexExistente] = a;
    } else {
      listaAlunos.unshift(a);
    }

    localStorage.setItem("fut10_alunos", JSON.stringify(listaAlunos));
  } catch (erro) {
    alert("Erro ao salvar os dados no navegador.");
    return;
  }

  // Limpeza do formulário
  const form = document.getElementById("formAluno");
  if (form) form.reset();

  const preview = document.getElementById("foto-preview");
  if (preview) {
    preview.innerHTML = "📸";
    delete preview.dataset.fotoBase64;
  }

  fecharModalAluno();
  renderizarListaAlunos();

  alert("✅ Aluno cadastrado com sucesso!");
}

// BLOCO 6: RENDERIZAR CARDS DOS ALUNOS NA TELA (FOTO DA BOLA POR PADRÃO)
export function renderizarListaAlunos() {
  const container = document.getElementById("alunos-lista");
  if (!container) return;

  const listaAlunos = JSON.parse(localStorage.getItem("fut10_alunos") || "[]");

  if (listaAlunos.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:30px 15px; color:#dae3ef;">
        <p style="font-size: 16px; margin-bottom: 5px;">Nenhum aluno cadastrado ainda.</p>
        <small>Clique no botão <strong>+</strong> acima para realizar o primeiro cadastro.</small>
      </div>
    `;
    return;
  }

  container.innerHTML = listaAlunos
    .map((aluno) => {
      // Exibe a foto cadastrada ou a foto da bola de futebol por padrão
      const fotoHtml = `<img src="${aluno.foto}" style="width:50px; height:50px; border-radius:50%; object-fit:cover;">`;

      return `
        <div class="aluno-card">
          <div class="aluno-header">
            <div class="aluno-foto-perfil ${aluno.status === 'ATIVO' ? 'status-ativo' : 'status-inativo'}">
              ${fotoHtml}
            </div>
            <div>
              <h4 style="margin:0; font-size:1rem; color:#ffffff;">${aluno.nome}</h4>
              <span class="badge-categoria">${aluno.turma || "SEM TURMA"}</span>
            </div>
            <div class="aluno-estrelas">${aluno.habilidade}</div>
          </div>
          <div class="aluno-detalhes">
            <p><strong>Posição:</strong> ${aluno.posicao} | <strong>Pé:</strong> ${aluno.pe}</p>
            <p><strong>Responsável:</strong> ${aluno.responsavel} (${aluno.whatsapp})</p>
          </div>
        </div>
      `;
    })
    .join("");
}

// BLOCO 7: ESCUTADOR DE EVENTOS DE FILTROS E BUSCA
export function inicializarEventosFiltros() {
  const buscaNome = document.getElementById("busca-nome");
  if (buscaNome) {
    buscaNome.addEventListener("input", renderizarListaAlunos);
  }
}