const knex = require("../config/database");
const bcrypt = require("bcrypt");
module.exports = class {
  static checkIfUserExist = async (req, res, next) => {
    const { email_user } = req.body;
    const user = await knex("users").where("email_user", email_user);
    console.log(email_user);
    if (user.length == 0) {
      next();
    } else {
      res.statusCode = 400;
      res.json({
        status: 400,
        message: "email already exist",
      });
    }
  };
  static loginUserCheck = async (req, res, next) => {
    const { email_user } = req.body;
    const { psw_user } = req.body;
    // console.log(email_user);
    const user = await knex("users").where("email_user", email_user);
    if (user.length === 0) {
      res.statusCode = 400;
      res.json({
        status: 400,
        message: "cannot find user",
      });
      // return res.status(200).send("user found");
    } else {
      // res.statusCode = 201;
      // res.status(201).json({
      //   message: "User Found",
      // });
      next();
    }
  };
};
