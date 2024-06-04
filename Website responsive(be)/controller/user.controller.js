const { json } = require("body-parser");
const knex = require("../config/database");
const bcrypt = require("bcrypt");

module.exports = class {
  static getAllUser = async (req, res, next) => {
    try {
      const users = await knex("users").select("*");
      return res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  static addUser = async (req, res, next) => {
    try {
      // const { name, phone_number, email_user, psw_user } = req.body;
      // if (!name || !phone_number || !email_user || !psw_user) {
      //   errors.push({ message: "Please enter all field" });
      // }
      // if (psw_user.length < 8) {
      //   errors.push({ message: "Password should be at least 8 characters" });
      // }
      const psw_user = req.body.psw_user;
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(psw_user, salt);
      console.log(hashedPassword);
      const [id] = await knex("users")
        .insert({
          name: req.body.name,
          phone_number: req.body.phone_number,
          email_user: req.body.email_user,
          psw_user: hashedPassword,
        })
        .returning("user_id");
      res.status(201).json({ id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  static getUserbyId = async (req, res, next) => {
    try {
      const userId = await knex("users").where("user_id", req.params.id);
      res.status(200).json(userId);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  static loginUser = async (req, res, next) => {
    const { email_user } = req.body;
    const { psw_user } = req.body;

    try {
      const user = await knex("users").where("email_user", email_user);

      if (user) {
        const isPasswordCorrect = await bcrypt.compare(
          psw_user,
          user[0].psw_user
        );
        if (isPasswordCorrect) {
          res.status(201).json({
            status: 201,
            message: "login success",
            user,
          });
        } else if (!isPasswordCorrect) {
          res.status(401).json({
            status: 401,
            message: "Wrong Password",
          });
        }
      } else {
        res.status(401).json({
          status: 401,
          message: "Not Allowed",
        });
      }
    } catch (error) {
      res.status(500).send();
      // return res.json(user.psw_user);
    }
  };
  static putUserbyId = async (req, res, next) => {
    try {
      const userId = await knex("users")
        .where("user_id", req.params.id)
        .update({ phone_number: req.body.phone_number });
      res.status(200).json(userId);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  static deleteUserbyId = async (req, res, next) => {
    try {
      const userId = await knex("users").where("user_id", req.params.id).del();
      res.status(200).json(userId);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
};
