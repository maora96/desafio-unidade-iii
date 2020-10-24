const db = require("../utils/database");

const obterJogosPorRodada = async (rodada) => {
  const q = {
    text: `SELECT * FROM jogos WHERE rodada = $1;`,
    values: [rodada],
  };
  const query = await db.query(q);
  return query.rows;
};

const editarJogo = async (id, golsCasa, golsVisitante) => {
  const q = {
    text: `UPDATE jogos set gols_casa = $1, gols_visitante = $2 where id = $3 returning *`,
    values: [golsCasa, golsVisitante, id],
  };
  const query = await db.query(q);
  return query.rows.shift();
};

const pegarClassificacao = async () => {
  const query = await db.query(`SELECT * FROM jogos`);
  const dados = query.rows;
  return dados;
};

module.exports = { obterJogosPorRodada, editarJogo, pegarClassificacao };
