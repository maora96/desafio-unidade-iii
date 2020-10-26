const Router = require('koa-router');

const router = new Router();
const tabela = require('./controllers/tabela');
const Session = require('./middlewares/session');
const Auth = require('./controllers/auth');

router.get('/jogos/:rodada', tabela.obterJogosPorRodada);

router.post('/jogos', Session.verify, tabela.editarJogo);

router.get('/classificacao', tabela.pegarClassificacao);

router.post('/auth', Auth.autenticar);

router.post('/jogo', tabela.criarJogo);

router.delete('/jogo/:id', tabela.deletarJogo);

module.exports = router;
// criar tabelas com dbeaver [x]
// acessar/editar tabelas [x]
// criar tabela de classificação [x]
// criar autenticação [x]
// organizar projeto [x]
