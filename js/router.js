/* ==========================================================================
   FUT 10 ARENA - NAVEGAÇÃO DE TELAS (js/router.js)
   ========================================================================== */

function navegarPara(idTela) {
  // Esconde todas as seções/telas do sistema
  const telas = document.querySelectorAll("#main-content > div, #main-content > section");
  telas.forEach((tela) => {
    tela.classList.add("screen-hidden");
    tela.style.display = "none";
  });

  // Exibe a tela de destino
  const telaDestino = document.getElementById(idTela);
  if (telaDestino) {
    telaDestino.classList.remove("screen-hidden");
    telaDestino.style.display = "block";
  }

  // Atualiza a barra de navegação inferior (active)
  document.querySelectorAll(".bottom-nav button").forEach((btn) => {
    btn.classList.remove("active");
    if (btn.getAttribute("data-target") === idTela) {
      btn.classList.add("active");
    }
  });
}

// Torna a função visível para os onclicks do HTML
window.navegarPara = navegarPara;