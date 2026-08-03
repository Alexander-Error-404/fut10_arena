/* ==========================================================================
   SISTEMA FUT 10 ARENA - GERENCIADOR DE ROTAS / ALTERNÂNCIA DE TELAS
   Objetivo: Ocultar e exibir as telas do sistema dependendo de onde
   o usuário clicar (no Dashboard ou na barra de navegação).
   ========================================================================== */

/**
 * Função responsável por alternar a visibilidade das telas principais.
 * @param {string} idTelaDesejada - O ID da seção HTML que deve ser exibida.
 */
function navegarPara(idTelaDesejada) {
    // ----------------------------------------------------------------------
    // BLOCO 1: Mapeamento de todas as telas principais do sistema
    // Lista com os IDs das telas para garantir que ocultaremos todas antes de abrir a certa.
    // ----------------------------------------------------------------------
    const telasDoSistema = [
        'dashboard-screen',
        'alunos-screen',
        'chamada-screen',
        'cantina-screen',
        'financeiro-screen',
        'relatorios-screen',
        'configuracoes-screen'
    ];

    // ----------------------------------------------------------------------
    // BLOCO 2: Esconder todas as telas
    // Percorre a lista e adiciona a classe 'd-none' (ocultar no CSS/Bootstrap)
    // ----------------------------------------------------------------------
    telasDoSistema.forEach(idTela => {
        const elementoTela = document.getElementById(idTela);
        if (elementoTela) {
            elementoTela.classList.add('d-none');
        }
    });

    // ----------------------------------------------------------------------
    // BLOCO 3: Exibir a tela solicitada
    // Remove a classe 'd-none' apenas da tela que o usuário quer ver no momento.
    // ----------------------------------------------------------------------
    const telaAlvo = document.getElementById(idTelaDesejada);
    if (telaAlvo) {
        telaAlvo.classList.remove('d-none');
        // Rola a tela suavemente para o topo para garantir boa visualização no celular
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        console.warn(`Aviso: A tela com o ID "${idTelaDesejada}" ainda não foi encontrada no HTML.`);
    }

    // ----------------------------------------------------------------------
    // BLOCO 4: Atualizar destaque dos botões da barra inferior
    // Marca o botão da barra do rodapé como ativo conforme a tela aberta.
    // ----------------------------------------------------------------------
    atualizarBarraNavegacaoAtiva(idTelaDesejada);
}

/**
 * Destaca visualmente o ícone ativo na barra inferior do celular.
 * @param {string} idTela 
 */
function atualizarBarraNavegacaoAtiva(idTela) {
    const botoesNavegacao = document.querySelectorAll('.nav-bottom-item');
    botoesNavegacao.forEach(botao => {
        if (botao.dataset.target === idTela) {
            botao.classList.add('active');
        } else {
            botao.classList.remove('active');
        }
    });
}