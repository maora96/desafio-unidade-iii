const db = require("../utils/database");
const Password = require("../utils/password");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const autenticar = async (ctx) => {
  const { email = null, password = null } = ctx.request.body;
  if (!email || !password) {
    ctx.body = "Pedido mal-formatado!";
  } else {
    // procurar usuário na database
    const q = {
      text: `SELECT * FROM users where email = $1`,
      values: [email],
    };
    const query = await db.query(q);
    if (query.rows.length != 0) {
      const hash = query.rows[0].senha;
      const comparison = await Password.check(password, hash);
      if (comparison) {
        const token = await jwt.sign(
          { email: email },
          process.env.JWT_SECRET || "cubos",
          {
            expiresIn: "1h",
          }
        );
        ctx.body = `${token}, Success! Email encontrado e senha correta!!`;
      } else {
        ctx.body = "Success! Email encontrado, mas senha incorreta!";
      }
    } else {
      ctx.body = "Success! Mas esse email não está cadastrado :/";
    }
  }
};

module.exports = { autenticar };
