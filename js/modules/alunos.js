/* ==========================================================================
   FUT 10 ARENA - MÓDULO DE GESTÃO DE ALUNOS (js/modules/alunos.js)
   ========================================================================== */

// BLOCO 1: CONTROLE DE ABERTURA E FECHAMENTO DO MODAL
// Responsavel por alterar o estado visual da janela sobreposta (modal) do aluno
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

// BLOCO 2: PROCESSAMENTO DA FOTO DO ALUNO
// Le o arquivo selecionado no input de imagem e converte para Base64 para exibir preview
export function processarFotoAluno(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const preview = document.getElementById("foto-preview");
      if (preview) {
        preview.innerHTML = `<img src="${e.target.result}" alt="Foto do Aluno" style="width:100%; height:100%; border-radius:50%; object-fit:cover;">`;
        preview.dataset.fotoBase64 = e.target.result; // Armazena a imagem codificada no atributo de dados
      }
    };
    reader.readAsDataURL(file);
  }
}

// BLOCO 3: UTILITÁRIO DE CÁLCULO DE IDADE AUTOMÁTICO
// Calcula a idade com base na data de nascimento fornecida no input
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

// BLOCO 4: CAPTURA E CONSTRUÇÃO DO OBJETO ALUNO
// Coleta todos os campos preenchidos nas 3 abas do formulario
function capturarDadosFormulario() {
  const fotoPreview = document.getElementById("foto-preview");
  const dataNasc = document.getElementById("data-nasc")?.value || "";

  return {
    id: document.getElementById("aluno-id")?.value || Date.now().toString(),
    foto: fotoPreview?.dataset?.fotoBase64 || "",
    nome: document.getElementById("aluno-nome")?.value || "",
    status: document.getElementById("aluno-status-exibicao")?.value || "ATIVO",
    dataNascimento: dataNasc,
    idade: calcularIdadeAutomatica(dataNasc),
    turma: document.getElementById("aluno-turma")?.value || "",
    frequencia: document.getElementById("aluno-frequencia")?.value || "1x na semana",
    habilidade: document.getElementById("select-habilidade")?.value || "⭐",
    horario: document.getElementById("aluno-horario")?.value || "",
    posicao: document.getElementById("aluno-posicao")?.value || "Goleiro",
    pe: document.getElementById("aluno-pe")?.value || "Destro",
    camiseta: document.getElementById("aluno-camiseta")?.value || "",
    short: document.getElementById("aluno-short")?.value || "",
    meiao: document.getElementById("aluno-meiao")?.value || "",
    dataMatricula: document.getElementById("aluno-matricula")?.value || "",
    cpfCrianca: document.getElementById("aluno-cpf-crianca")?.value || "",
    responsavel: document.getElementById("aluno-responsavel")?.value || "",
    cpfResponsavel: document.getElementById("aluno-cpf-resp")?.value || "",
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
   FUT 10 ARENA - MÓDULO DE GESTÃO DE ALUNOS (js/modules/alunos.js) - CONTINUAÇÃO
   ========================================================================== */

// BLOCO 5: SALVAMENTO NO LOCALSTORAGE E ATUALIZAÇÃO DA LISTA
export function salvarAluno(event) {
  if (event) event.preventDefault();

  const alunoData = capturarDadosFormulario();

  if (!alunoData.nome.trim()) {
    alert("Por favor, preencha o nome do aluno.");
    return;
  }

  // Obtem os alunos ja cadastrados no localStorage
  let listaAlunos = JSON.parse(localStorage.getItem("fut10_alunos") || "[]");

  // Verifica se e edicao de um aluno existente ou insercao de um novo
  const indexExistente = listaAlunos.findIndex((a) => a.id === alunoData.id);

  if (indexExistente >= 0) {
    listaAlunos[indexExistente] = alunoData;
  } else {
    listaAlunos.unshift(alunoData); // Adiciona o novo aluno no inicio do array
  }

  // Persiste a lista atualizada no armazenamento local
  localStorage.setItem("fut10_alunos", JSON.stringify(listaAlunos));

  // Reseta os campos do formulario e o preview da foto
  const form = document.getElementById("formAluno");
  if (form) form.reset();
  
  const preview = document.getElementById("foto-preview");
  if (preview) {
    preview.innerHTML = "📸";
    delete preview.dataset.fotoBase64;
  }

  fecharModalAluno();
  renderizarListaAlunos();
}

// BLOCO 6: RENDERIZAR CARDS DOS ALUNOS NA TELA
export function renderizarListaAlunos() {
  const container = document.getElementById("alunos-lista");
  if (!container) return;

  const listaAlunos = JSON.parse(localStorage.getItem("fut10_alunos") || "[]");

  if (listaAlunos.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:30px 15px; color:#666;">
        <p style="font-size: 16px; margin-bottom: 5px;">Nenhum aluno cadastrado ainda.</p>
        <small>Clique no botão <strong>+</strong> acima para realizar o primeiro cadastro.</small>
      </div>
    `;
    return;
  }

  // Gera o HTML formatado para cada card na tela de alunos
  container.innerHTML = listaAlunos
    .map((aluno) => {
      const fotoHtml = aluno.foto
        ? `<img src="${aluno.foto}" style="width:50px; height:50px; border-radius:50%; object-fit:cover; margin-right:12px;">`
        : `<div style="width:50px; height:50px; border-radius:50%; background:#eee; display:flex; align-items:center; justify-content:center; font-size:20px; margin-right:12px;">⚽</div>`;

      return `
        <div class="card-aluno" style="background:#fff; border-radius:10px; padding:12px; margin-bottom:12px; box-shadow: 0 2px 6px rgba(0,0,0,0.08); display:flex; align-items:center;">
          ${fotoHtml}
          <div style="flex:1;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <h4 style="margin:0; font-size:16px; color:#333;">${aluno.nome}</h4>
              <span style="font-size:12px; font-weight:bold; color:#2e7d32; background:#e8f5e9; padding:2px 6px; border-radius:4px;">${aluno.turma || "SEM TURMA"}</span>
            </div>
            <p style="margin:4px 0 2px 0; font-size:13px; color:#555;">
              <strong>Posição:</strong> ${aluno.posicao} | <strong>Hab:</strong> ${aluno.habilidade}
            </p>
            <p style="margin:0; font-size:13px; color:#777;">
              <strong>Resp:</strong> ${aluno.responsavel} (${aluno.whatsapp})
            </p>
          </div>
        </div>
      `;
    })
    .join("");
}

// BLOCO 7: INICIALIZADOR DE EVENTOS DE FILTROS (RESERVADO PARA PRÓXIMA ETAPA)
export function inicializarEventosFiltros() {
  const buscaNome = document.getElementById("busca-nome");
  if (buscaNome) {
    buscaNome.addEventListener("input", renderizarListaAlunos);
  }
}