const Koa = require("koa");
const bodyparser = require("koa-bodyparser");
const server = new Koa();
const router = require("./src/routes");

server.use(bodyparser());

server.use(router.routes());

server.use(async (ctx) => {
  ctx.body = "Olá";
});

server.listen(8081);
