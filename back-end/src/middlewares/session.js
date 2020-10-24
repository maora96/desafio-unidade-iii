const jwt = require("jsonwebtoken");

require("dotenv").config();

const verify = async (ctx, next) => {
  const [bearer, token] = ctx.headers.authorization.split(" ");
  try {
    const verification = await jwt.verify(token, process.env.JWT_SECRET);

    ctx.state.email = verification.email;
  } catch (err) {
    console.log("resposta em breve");
  }
  return next();
};

module.exports = { verify };
