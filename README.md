# 📋 REGRAS DE EXTREMA IMPORTANCIA – SISTEMA 'FUT 10 Arena' (MOBILE-FIRST)

> **Objetivo:** Sistema leve focado 100% em uso por celular para escolinha de futebol infantil (Vinícius no campo) e cantina/financeiro (Alessandra). Hospedagem planejada na Hostinger com banco PostgreSQL.

## 📌 1: Focar primeiro no front-end
*Como eu estou fazendo um pouco e mostrando pra minha irmã se esta bom eu vou focar no frontend e usando o localstorage pra ver funcionando

## 📌 2: ter uma tela de login
*Ter uma tela de login para escolher entre minha irmã (Alessandra) e meu cunhado (Vinícius)

## 📌 3: Tudo separadinho
Quando for passar os códigos se a quantidade de linhas ultrapassar 100 divida. para sempre mandar 100 linhas de código ou menos.

## 📌 4: os códigos
SO ME MANDA CÓDIGO QUANDO EU MANDAR!!! E ANTES DE MANDAR ME PERGUNTE PELO MENOS 5 COISAS PRA VOCê NÃO TER QUE FICAR ADIVINHANDO O QUE EU QUERO.

## 📌 5: Tudo EXPLICADINHO
QUERO MUITOS COMENTARIOS PARA SE UM OUTRO PROGRAMADOR PEGAR O CODIGO PEGAR DE PRIMEIRA O QUE CADA COISA FAZ. BEMMMM MASTIGADINHO. JUNTO COM COMENTÁRIOS DE DIVISÃO DE BLOCO. EX: ESSE BLOCO TODO FAZ ISSO. PRA NA HORA DE DAR UM ERRO EU SABER ONDE ESTA DANDO O ERRO E TAMBÉM PRA VC ME SUGERIR QUAL BLOCO DEVO MUDAR CASO ACONTEÇA ALGO.

## 📌 6: NUNCA ESQUEÇA QUE SOU LEIGO. SEMPRE ME PASSE UMA COISA DE CADA VEZ. SE DEU CERTO BORA PRO PRÓXIMO PASSO. e que estou programando no linux mint versão cinnamon


# 📋 REGRAS DE EXTREMA IMPORTANCIA 2

1. Escrever código limpo e legível
Usar nomes claros para variáveis, funções e classes.
Criar funções pequenas e com uma única responsabilidade.
Evitar código duplicado (princípio DRY).

Exemplo:

// Ruim
function calc(a, b) { ... }

// Bom
function calcularMensalidade(valorBase, desconto) { ... }
2. Pensar na manutenção antes da implementação

Um sênior escreve código pensando em quem dará manutenção no futuro (inclusive ele mesmo).

Organizar o projeto em camadas.
Evitar acoplamento excessivo.
Seguir princípios como SOLID quando fizer sentido.
3. Fazer tratamento de erros adequado

Não ignorar exceções ou retornar erros genéricos.

Validar entradas.
Registrar logs úteis.
Exibir mensagens amigáveis ao usuário.
Nunca deixar a aplicação falhar silenciosamente.
4. Testar o código

Antes de entregar uma funcionalidade:

Criar testes unitários quando apropriado.
Validar cenários positivos e negativos.
Testar casos extremos.
Garantir que mudanças não quebrem funcionalidades existentes.
5. Utilizar controle de versão corretamente

Um sênior domina ferramentas como Git.

Boas práticas incluem:

Commits pequenos e objetivos.
Mensagens descritivas.
Uso de branches para novas funcionalidades.
Revisão de código (Code Review) antes do merge.
Evitar commits desnecessários ou com arquivos temporários.


📄 VISÃO GERAL DO PROGRAMA

1. Perfil & Visão Geral
Público-Alvo/Operadores: Alessandra (Gestão Financeira/Cantina/Configurações) e Vinícius (Campo/Treinos/Frequência).

Filosofia do Sistema: Interface simples, visual e com foco total em filtros e facilidade de navegação rápida.

2. Gestão de Alunos (Ficha Completa)
Técnico: Fotos dos alunos, posições em campo (goleiro a centroavante), pé dominante, habilidade avaliada em estrelas (1 a 10) e tamanhos de uniforme (camisa, short, meião).

Família: Responsável legal, CPF, WhatsApp principal, telefone de emergência e pessoas autorizadas para retirada da criança.

Saúde & Legal: Controle de atestado médico em dia, autorização de uso de imagem, restrições médicas/alergias, convênio e número de carteirinha.

Filtros e Buscas: Filtros combinados por Nome, Turma, Status (Ativo/Inativo) e Nível de Habilidade.

3. Chamada & Campo (Módulo Vinícius)
Controle Diário: Chamada rápida via interruptor (Presente / Ausente) com exibição da foto do aluno na lista para evitar erros por nomes iguais.

Faltas Justificadas: Campo para registrar o motivo de ausências (ex: atestado médico, viagem, doença).

Frequência: Geração de relatório de assiduidade mensal do aluno.

4. Cantina & PDV (Módulo Alessandra)
Formas de Pagamento: Venda imediata (Pix, Cartão, Dinheiro) ou Comanda Pendente (Fiado) vinculada ao aluno/responsável.

Controle de Fiado: Alerta visual em vermelho ao ultrapassar o limite, permitindo que a Alessandra decida manualmente se autoriza a compra (sem bloqueios rígidos e travamentos de tela).

5. Financeiro & Mensalidades
Planos Flexíveis: Planos customizáveis cadastrados pela Alessandra (dias por semana, uniformes inclusos, descontos para irmãos, etc.).

Gestão de Vencimentos & Juros: Datas de vencimento flexíveis por aluno. Em caso de atraso, lançamento de juros/multas manuais e valores arredondados (sem cobrança picada de centavos).

Comprovantes & Cobrança: Envio de mensagem de cobrança formatada e recibos de pagamento em 1 clique direto para o WhatsApp do responsável, além da baixa automática no sistema.

6. Relatórios & Configurações
Exportação: Geração de relatórios em PDF e Planilha (Excel/CSV) para listas de alunos, chamadas, vendas da cantina e inadimplência.

Aba Configurações: Central para a Alessandra definir limites de fiado da cantina, valores de planos, parâmetros de cobrança e regras gerais do sistema.

[FUT 10 Arena]
 ├── 📊 DASHBOARD (Painel Principal)
 │    ├── Resumo de Receitas (Escolinha + Cantina)
 │    ├── Indicador de Alunos Ativos vs. Inadimplentes
 │    ├── Aniversariantes do Mês
 │    └── Atalhos Rápidos (Iniciar Chamada / Nova Venda)
 │
 ├── 👥 GESTÃO DE ALUNOS
 │    ├── ⚽ Aba Técnico (Foto, Posição, Pé, Estrelas 1-10, Kit Uniforme)
 │    ├── 👥 Aba Família (Responsáveis, WhatsApp, Emergência, Quem Retira)
 │    ├── 🏥 Aba Saúde/Legal (Atestado, Imagem, Alergias, Convênio)
 │    └── 🔍 Filtros (Nome, Turma, Status Ativo/Inativo, Habilidade)
 │
 ├── 📋 CAMPO & CHAMADA (Módulo Vinícius)
 │    ├── Lista da Turma do Dia (com Foto do Aluno)
 │    ├── Interruptor Rápido (Presente / Ausente)
 │    ├── Campo para Justificativa de Falta (Atestado / Viagem)
 │    └── Relatório Mensal de Frequência
 │
 ├── 🛒 CANTINA / PDV (Módulo Alessandra)
 │    ├── Venda Rápida (Pix, Cartão, Dinheiro)
 │    ├── Lançamento de Comanda Pendente (Fiado no Nome do Aluno)
 │    ├── Alerta Visual em Vermelho (Limite de Fiado Excedido)
 │    └── Histórico de Consumo por Aluno
 │
 ├── 💰 FINANCEIRO & MENSALIDADES
 │    ├── Gestão de Planos da Escolinha
 │    ├── Controle de Vencimentos e Baixa Automática
 │    ├── Lançamento Manual de Juros/Acréscimos (Valores Arredondados)
 │    ├── Cobrança via WhatsApp (Mensagem Formatada em 1 Clique)
 │    └── Emissão de Comprovante / Recibo (PDF ou WhatsApp)
 │
 ├── 📈 RELATÓRIOS (Exportação PDF / Excel)
 │    ├── Relatório de Alunos Matriculados (por Turma)
 │    ├── Relatório de Frequência / Assiduidade
 │    ├── Relatório do Caixa da Cantina
 │    └── Relatório de Inadimplência e Comandas Pendentes
 │
 └── ⚙️ CONFIGURAÇÕES (Módulo Administrativo)
      ├── Cadastro e Ajuste dos Limites de Fiado por Aluno
      ├── Cadastro de Planos e Valores de Mensalidade
      ├── Gestão de Turmas e Horários
      └── Parâmetros Gerais e Mensagens Padrão do WhatsApp

ORGANIZAÇÃO DOS ARQUIVOS DENTRO DO VS CODE

FUT 10 Arena/
├── 📁 assets/
│   ├── 📁 css/
│   │   ├── 📄 global.css
│   │   ├── 📄 layout.css
│   │   ├── 📄 components.css
│   │   ├── 📄 login.css              # 🔑 Estilos específicos da tela de Login
│   │   └── 📄 utilities.css
│   ├── 📁 icons/
│   └── 📁 images/
│
├── 📁 js/
│   ├── 📁 components/
│   │   ├── 📄 modal.js
│   │   ├── 📄 filterBar.js
│   │   ├── 📄 table.js
│   │   └── 📄 whatsappButton.js
│   │
│   ├── 📁 modules/
│   │   ├── 📄 auth.js                 # 🔑 Lógica de Login, Logout e Permissões (Perfis)
│   │   ├── 📄 dashboard.js
│   │   ├── 📄 alunos.js
│   │   ├── 📄 chamada.js
│   │   ├── 📄 cantina.js
│   │   ├── 📄 financeiro.js
│   │   ├── 📄 relatorios.js
│   │   └── 📄 configuracoes.js
│   │
│   ├── 📁 data/
│   │   ├── 📄 mockData.js             # Inclui os usuários iniciais (ex: Alessandra / Vinícius)
│   │   └── 📄 storage.js              # Salva o token/sessão ativa do usuário logado
│   │
│   ├── 📁 utils/
│   │   ├── 📄 formatters.js
│   │   ├── 📄 pdfExport.js
│   │   └── 📄 excelExport.js
│   │
│   ├── 📄 router.js                   # 🛡️ Guarda de rotas: impede acesso às abas sem estar logado
│   └── 📄 app.js                      # Inicializa a verificação de login antes de abrir a SPA
│
├── 📄 index.html                      # Contém a <section id="login-screen"> e o <main id="app-screen">
└── 📄 README.md




===ONDE ESTAMOS E PRA ONDE VAMOS====
