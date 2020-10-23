const bcrypt = require("bcryptjs");

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash("B4c0//", salt, (err2, hash) => {
    // store hash in your password db
    console.log(hash);
  });
});

const check = async (password, hash) => {
  const comparison = await bcrypt.compare(password, hash);
  console.log(comparison);
  return comparison;
};

const encrypt = async (password) => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

module.exports = { check, encrypt };
