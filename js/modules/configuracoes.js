import { getConfiguracoes, salvarConfiguracoes } from '../data/storage.js';

/**
 * Formata a digitação para o padrão monetário brasileiro em tempo real
 */
export function aplicarMascaraMoeda(input) {
  let valor = input.value.replace(/\D/g, "");
  if (valor === "") {
    input.value = "";
    return;
  }
  let valorNumerico = (parseFloat(valor) / 100).toFixed(2);
  let valorFormatado = valorNumerico.replace(".", ",").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  input.value = "R$ " + valorFormatado;
}

/**
 * Carrega as configurações do armazenamento e preenche os campos do formulário
 */
export function carregarCamposConfiguracoes() {
  const config = getConfiguracoes() || {};

  const campos = [
    'mensalidade-1x-p1', 'mensalidade-2x-p1',
    'mensalidade-1x-p2', 'mensalidade-2x-p2',
    'mensalidade-1x-p3', 'mensalidade-2x-p3',
    'desconto-irmao-1x', 'desconto-irmao-2x',
    'uniforme-vista', 'uniforme-prazo',
    'meiao-a', 'meiao-b', 'shorts-a', 'camiseta-fut10'
  ];

  const mapeamentoChaves = {
    'mensalidade-1x-p1': config.mensalidade1xP1 || "R$ 90,00",
    'mensalidade-2x-p1': config.mensalidade2xP1 || "R$ 150,00",
    'mensalidade-1x-p2': config.mensalidade1xP2 || "R$ 100,00",
    'mensalidade-2x-p2': config.mensalidade2xP2 || "R$ 160,00",
    'mensalidade-1x-p3': config.mensalidade1xP3 || "R$ 110,00",
    'mensalidade-2x-p3': config.mensalidade2xP3 || "R$ 170,00",
    'desconto-irmao-1x': config.descontoIrmao1x || "R$ 5,00",
    'desconto-irmao-2x': config.descontoIrmao2x || "R$ 10,00",
    'uniforme-vista': config.uniformeVista || "R$ 130,00",
    'uniforme-prazo': config.uniformePrazo || "R$ 140,00",
    'meiao-a': config.meiaoA || "R$ 40,00",
    'meiao-b': config.meiaoB || "R$ 30,00",
    'shorts-a': config.shortsA || "R$ 55,00",
    'camiseta-fut10': config.camisetaFut10 || "R$ 65,00"
  };

  campos.forEach(id => {
    const input = document.getElementById(id);
    if (input) {
      input.value = mapeamentoChaves[id];
    }
  });
}

/**
 * Inicializa os manipuladores de evento da tela de configurações
 */
export function initConfiguracoes() {
  carregarCamposConfiguracoes();

  const form = document.getElementById('form-configuracoes');
  const todosInputsMoeda = document.querySelectorAll('.campo-moeda');

  todosInputsMoeda.forEach(input => {
    input.addEventListener('input', () => aplicarMascaraMoeda(input));
    
    input.addEventListener('focus', () => {
      if (!input.value) input.value = "R$ 0,00";
    });
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const novasConfiguracoes = {
        mensalidade1xP1: document.getElementById('mensalidade-1x-p1')?.value || "R$ 0,00",
        mensalidade2xP1: document.getElementById('mensalidade-2x-p1')?.value || "R$ 0,00",
        mensalidade1xP2: document.getElementById('mensalidade-1x-p2')?.value || "R$ 0,00",
        mensalidade2xP2: document.getElementById('mensalidade-2x-p2')?.value || "R$ 0,00",
        mensalidade1xP3: document.getElementById('mensalidade-1x-p3')?.value || "R$ 0,00",
        mensalidade2xP3: document.getElementById('mensalidade-2x-p3')?.value || "R$ 0,00",
        descontoIrmao1x: document.getElementById('desconto-irmao-1x')?.value || "R$ 0,00",
        descontoIrmao2x: document.getElementById('desconto-irmao-2x')?.value || "R$ 0,00",
        uniformeVista: document.getElementById('uniforme-vista')?.value || "R$ 0,00",
        uniformePrazo: document.getElementById('uniforme-prazo')?.value || "R$ 0,00",
        meiaoA: document.getElementById('meiao-a')?.value || "R$ 0,00",
        meiaoB: document.getElementById('meiao-b')?.value || "R$ 0,00",
        shortsA: document.getElementById('shorts-a')?.value || "R$ 0,00",
        camisetaFut10: document.getElementById('camiseta-fut10')?.value || "R$ 0,00"
      };

      salvarConfiguracoes(novasConfiguracoes);
      alert('⚡ Configurações do FUT10 salvas com sucesso! As novas regras já estão valendo no sistema.');
    });
  }
}