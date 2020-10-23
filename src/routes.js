const Router = require("koa-router");
const router = new Router();

const Session = require("./middlewares/session");
const Auth = require("./controllers/auth");
const db = require("./utils/database");

router.get("/jogos/:rodada", async (ctx) => {
  const { rodada = null } = ctx.params;
  const q = {
    text: `SELECT * FROM jogos WHERE rodada = $1;`,
    values: [rodada],
  };
  const query = await db.query(q);
  ctx.body = query.rows;
});

router.post("/jogos", Session.verify, async (ctx) => {
  const id = ctx.request.body.id;
  const golsCasa = ctx.request.body.golsCasa;
  const golsVisitante = ctx.request.body.golsVisitante;
  const q2 = {
    text: `UPDATE jogos set gols_casa = $1, gols_visitante = $2 where id = $3 returning *`,
    values: [golsCasa, golsVisitante, id],
  };
  const query2 = await db.query(q2);
  ctx.body = query2;
  // update jogos set gols etc etc [x]
  // update classificação ?? []
});

router.get("/classificacao", async (ctx) => {
  const query = await db.query(`SELECT * FROM jogos`);
  const dados = query.rows;
  const tabela = [];

  const ordernarTabela = () => {
    tabela.sort((a, b) => {
      if (a.pontos > b.pontos) {
        return -1;
      } else if (b.pontos > a.pontos) {
        return 1;
      } else {
        // mesma quantidade de pontos -> checar vitórias
        if (a.vitorias > b.vitorias) {
          return -1;
        } else if (b.vitorias > a.vitorias) {
          return 1;
        } else {
          // mesma quantidade de vitórias -> checar saldo de gols
          const saldoA = a.golsFeitos - a.golsSofridos;
          const saldoB = b.golsFeitos - b.golsSofridos;
          if (saldoA > saldoB) {
            return -1;
          } else if (saldoB > saldoA) {
            return 1;
          } else {
            // mesmo saldo de gols -> checar gols feitos
            if (a.golsFeitos > b.golsFeitos) {
              return -1;
            } else if (b.golsFeitos > a.golsFeitos) {
              return 1;
            } else {
              // mesmo número de gols feitos -> checar alfabeticamente
              a.time.localeCompare(b.time);
            }
          }
        }
      }
    });
  };

  const inserirOuAtualizarTime = (time, pontos, golsFeitos, golsSofridos) => {
    const timeEncontrado = tabela.find((t) => t.time === time);
    if (timeEncontrado) {
      timeEncontrado.pontos += pontos;
      timeEncontrado.jogos++;
      timeEncontrado.vitorias += pontos === 3 ? 1 : 0;
      timeEncontrado.derrotas += pontos === 0 ? 1 : 0;
      timeEncontrado.empates += pontos === 1 ? 1 : 0;
      timeEncontrado.golsFeitos += golsFeitos;
      timeEncontrado.golsSofridos += golsSofridos;
    } else {
      tabela.push({
        time,
        pontos,
        jogos: 1,
        vitorias: pontos === 3 ? 1 : 0,
        derrotas: pontos === 0 ? 1 : 0,
        empates: pontos === 1 ? 1 : 0,
        golsFeitos,
        golsSofridos,
      });
    }
  };

  const calcularTabela = (dados) => {
    for (jogo of dados) {
      if (jogo.gols_casa > jogo.gols_visitante) {
        // time casa ganhou
        inserirOuAtualizarTime(
          jogo.time_casa,
          3,
          jogo.gols_casa,
          jogo.gols_visitante
        );
        inserirOuAtualizarTime(
          jogo.time_visitante,
          0,
          jogo.gols_visitante,
          jogo.gols_casa
        );
      } else if (jogo.gols_casa < jogo.gols_visitante) {
        // time visitante ganhou
        inserirOuAtualizarTime(
          jogo.time_casa,
          0,
          jogo.gols_casa,
          jogo.gols_visitante
        );
        inserirOuAtualizarTime(
          jogo.time_visitante,
          3,
          jogo.gols_visitante,
          jogo.gols_casa
        );
      } else {
        //empate
        inserirOuAtualizarTime(
          jogo.time_casa,
          1,
          jogo.gols_casa,
          jogo.gols_visitante
        );
        inserirOuAtualizarTime(
          jogo.time_visitante,
          1,
          jogo.gols_visitante,
          jogo.gols_casa
        );
      }
    }
  };
  calcularTabela(dados);
  ordernarTabela();
  ctx.body = tabela;
});

router.post("/auth", Auth.autenticar);

module.exports = router;
// criar tabelas com dbeaver [x]
// acessar/editar tabelas [x]
// criar tabela de classificação [x]
// criar autenticação
// organizar projeto []
