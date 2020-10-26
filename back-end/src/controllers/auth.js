const Password = require("../utils/password");
const jwt = require("jsonwebtoken");
const user = require("../repositories/users");
const response = require("../utils/response");
require("dotenv").config();

const autenticar = async (ctx) => {
  const { email = null, password = null } = ctx.request.body;
  if (!email || !password) {
    response(ctx, 404, "Pedido mal-formatado!");
  } else {
    const query = await user.pegarUser(email);

    if (query.length != 0) {
      const hash = query[0].senha;
      const comparison = await Password.check(password, hash);
      if (comparison) {
        const token = await jwt.sign(
          { email: email },
          process.env.JWT_SECRET || "cubos",
          {
            expiresIn: "1h",
          }
        );
        response(ctx, 200, token);
      } else {
        response(ctx, 404, "Email encontrado, mas senha incorreta.");
      }
    } else {
      response(ctx, 404, "E-mail não cadastrado.");
    }
  }
};

module.exports = { autenticar };
