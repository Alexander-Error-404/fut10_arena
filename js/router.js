// ==========================================================================
// ROTEADOR DE NAVEGAÇÃO ENTRE TELAS (SPA)
// ==========================================================================

function navegarPara(idTelaAlvo) {
  // 1. Seleciona todas as seções de telas do sistema
  const telas = document.querySelectorAll('#main-content > div, #main-content > section');

  // 2. Esconde todas as telas adicionando a classe screen-hidden
  telas.forEach(tela => {
    tela.classList.add('screen-hidden');
    tela.classList.remove('screen-active');
  });

  // 3. Procura a tela de destino solicitada
  const telaDestino = document.getElementById(idTelaAlvo);

  if (telaDestino) {
    // Exibe a tela alvo removendo o esconde e ativando o display
    telaDestino.classList.remove('screen-hidden');
    telaDestino.classList.add('screen-active');
  } else {
    console.warn(`Aviso: A tela com o ID "${idTelaAlvo}" não foi encontrada no HTML.`);
  }

  // 4. Atualiza os botões ativos na barra de navegação inferior
  const botoesNav = document.querySelectorAll('.bottom-nav .nav-bottom-item');
  botoesNav.forEach(botao => {
    // Se o botão apontar para a tela aberta, ganha a classe active
    if (botao.getAttribute('data-target') === idTelaAlvo) {
      botao.classList.add('active');
    } else {
      botao.classList.remove('active');
    }
  });
}