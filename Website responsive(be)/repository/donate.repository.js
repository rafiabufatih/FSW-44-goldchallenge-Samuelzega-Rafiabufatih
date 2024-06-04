const knex = require("../config/database");

const getZakat = async (user) => {
  const users = await knex.raw("SELECT * FROM users_donation");
  console.log(users);
  return users.rows;
};

const postZakat = async (zakat) => {
  const { name, total_donation, donation_cd, user_id } = zakat;
  console.log(zakat);
  const newZakat = await knex("users_donation").insert(zakat, ["*"]);
  return newZakat;
};

module.exports = {
  postZakat,
  getZakat,
};
