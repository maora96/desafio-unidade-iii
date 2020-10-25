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
  const { id = null, golsCasa = null, golsVisitante = null } = ctx.request.body;
  console.log(id, golsCasa, golsVisitante);
  if (id && golsCasa !== null && golsVisitante !== null) {
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

const criarJogo = async (ctx) => {
  const total = await jogos.pegarNumeroDeJogos();
  const id = total + 1;
  const {
    time_casa,
    time_visitante,
    gols_casa,
    gols_visitante,
    rodada,
  } = ctx.request.body;

  if (
    time_casa &&
    time_visitante &&
    (gols_casa !== null) & (gols_visitante !== null) &&
    rodada
  ) {
    const novoJogo = await jogos.criarJogo(
      time_casa,
      time_visitante,
      gols_casa,
      gols_visitante,
      rodada
    );
    ctx.body = novoJogo;
  } else {
    // response
  }
};

const deletarJogo = async (ctx) => {
  const { id = null } = ctx.params;
  if (id) {
    const deletado = await jogos.deletarJogo(id);
    ctx.body = deletado;
  } else {
    // response
  }
};

module.exports = {
  obterJogosPorRodada,
  editarJogo,
  pegarClassificacao,
  criarJogo,
  deletarJogo,
};
