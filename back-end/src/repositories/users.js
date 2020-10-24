const db = require("../utils/database");

const pegarUser = async (email) => {
  const q = {
    text: `SELECT * FROM users where email = $1`,
    values: [email],
  };
  const query = await db.query(q);
  return query.rows;
};

module.exports = { pegarUser };
