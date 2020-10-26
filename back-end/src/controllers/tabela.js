/* eslint-disable camelcase */
const jogos = require('../repositories/jogos');
const utils = require('../utils/tabela');
const response = require('../utils/response');

const obterJogosPorRodada = async (ctx) => {
	const { rodada = null } = ctx.params;
	if (rodada) {
		const pedido = await jogos.obterJogosPorRodada(rodada);
		response(ctx, 200, pedido);
	} else if (rodada >= 39 || rodada < 1) {
		response(ctx, 404, 'Rodada não existe!');
	} else {
		response(ctx, 404, 'Pedido mal-formatado.');
	}
};

const editarJogo = async (ctx) => {
	const {
		id = null,
		golsCasa = null,
		golsVisitante = null,
	} = ctx.request.body;
	if (id && golsCasa !== null && golsVisitante !== null) {
		const jogo = await jogos.editarJogo(id, golsCasa, golsVisitante);
		response(ctx, 200, jogo);
	} else {
		response(ctx, 404, 'Pedido mal-formatado!');
	}
};

const pegarClassificacao = async (ctx) => {
	const tabela = [];
	const classificacao = await jogos.pegarClassificacao();
	utils.calcularTabela(classificacao, tabela);
	utils.ordernarTabela(tabela);
	response(ctx, 200, tabela);
};

const criarJogo = async (ctx) => {
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
		gols_casa !== null &&
		gols_visitante !== null &&
		rodada
	) {
		const novoJogo = await jogos.criarJogo(
			time_casa,
			time_visitante,
			gols_casa,
			gols_visitante,
			rodada
		);
		response(ctx, 200, novoJogo);
	} else {
		response(ctx, 404, 'Pedido mal-formatado!');
	}
};

const deletarJogo = async (ctx) => {
	const { id = null } = ctx.params;
	if (id) {
		const deletado = await jogos.deletarJogo(id);
		response(ctx, 200, deletado);
	} else {
		response(ctx, 404, 'Pedido mal-formatado!');
	}
};

module.exports = {
	obterJogosPorRodada,
	editarJogo,
	pegarClassificacao,
	criarJogo,
	deletarJogo,
};
