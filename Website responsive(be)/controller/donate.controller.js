const donateRepository = require("../repository/donate.repository");
const knex = require("../config/database");

const getZakat = async (req, res) => {
  const user = req.query.user;
  console.log(user);
  if (!user) {
    const users = await donateRepository.getZakat();
    return res.json(users);
  }
};

const getZakatbyId = async (req, res, next) => {
  const id = req.params.id;
  try {
    const userId = await knex("users_donation").where("user_id", id);
    res.status(200).json(userId);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const postZakat = async (req, res) => {
  const zakat = req.body;
  const newZakat = await donateRepository.postZakat(zakat);
  return res.json(newZakat);
};

module.exports = {
  postZakat,
  getZakat,
  getZakatbyId,
};
