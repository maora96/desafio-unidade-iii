const jogos = require("../repositories/jogos");
const utils = require("../utils/tabela");

const obterJogosPorRodada = async (ctx) => {
  const { rodada = null } = ctx.params;
  if (rodada) {
    const pedido = await jogos.obterJogosPorRodada(rodada);
    ctx.body = pedido;
  } else {
    // resposta
  }
};

const editarJogo = async (ctx) => {
  console.log("hello");
  const { id = null, golsCasa = null, golsVisitante = null } = ctx.request.body;
  console.log(id, golsCasa, golsVisitante);
  if (id && golsCasa !== null && golsVisitante !== null) {
    console.log("oi");
    const jogo = await jogos.editarJogo(id, golsCasa, golsVisitante);
    ctx.body = jogo;
  } else {
    // resposta
  }
};

const pegarClassificacao = async (ctx) => {
  const tabela = [];
  const classificacao = await jogos.pegarClassificacao();
  utils.calcularTabela(classificacao, tabela);
  utils.ordernarTabela(tabela);
  ctx.body = tabela;
};

module.exports = { obterJogosPorRodada, editarJogo, pegarClassificacao };
