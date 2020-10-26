/* eslint-disable camelcase */
const db = require('../utils/database');

const obterJogosPorRodada = async (rodada) => {
	const q = {
		text: 'SELECT * FROM jogos WHERE rodada = $1;',
		values: [rodada],
	};
	const query = await db.query(q);
	return query.rows;
};

const editarJogo = async (id, golsCasa, golsVisitante) => {
	const q = {
		text:
			'UPDATE jogos set gols_casa = $1, gols_visitante = $2 where id = $3 returning *',
		values: [golsCasa, golsVisitante, id],
	};
	const query = await db.query(q);
	return query.rows.shift();
};

const pegarClassificacao = async () => {
	const query = await db.query('SELECT * FROM jogos');
	const dados = query.rows;
	return dados;
};

const pegarNumeroDeJogos = async () => {
	const query = await db.query('SELECT count(*) FROM jogos');
	const dados = query;
	return dados;
};

const criarJogo = async (
	time_casa,
	time_visitante,
	gols_casa,
	gols_visitante,
	rodada
) => {
	const q = {
		text:
			'INSERT INTO jogos (time_casa, gols_casa, gols_visitante, time_visitante, rodada) VALUES ($1, $2, $3, $4, $5)',
		values: [time_casa, gols_casa, gols_visitante, time_visitante, rodada],
	};
	const query = await db.query(q);
	return query.rows;
};

const deletarJogo = async (id) => {
	const q = {
		text: 'DELETE FROM jogos where id = $1',
		values: [id],
	};
	const query = await db.query(q);
	return query.rows;
};

module.exports = {
	obterJogosPorRodada,
	editarJogo,
	pegarClassificacao,
	pegarNumeroDeJogos,
	criarJogo,
	deletarJogo,
};
