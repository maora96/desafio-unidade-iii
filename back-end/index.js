const Koa = require("koa");
const bodyparser = require("koa-bodyparser");
const server = new Koa();
const router = require("./src/routes");
const cors = require("@koa/cors");
server.use(cors({ origin: "*" }));
server.use(bodyparser());

server.use(router.routes()).use(router.allowedMethods());

server.listen(8081);
