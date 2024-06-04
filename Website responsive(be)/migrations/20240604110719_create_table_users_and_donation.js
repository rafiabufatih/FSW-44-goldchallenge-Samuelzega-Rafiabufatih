exports.up = function (knex) {
  return knex.schema
    .createTable("users", function (table) {
      table.increments("user_id");
      table.string("name", 255).notNullable();
      table.string("phone_number", 255).notNullable();
      table.string("email_user", 255).notNullable();
      table.string("psw_user", 255).notNullable();
    })
    .createTable("donation_category", function (table) {
      table.string("donation_cd", 50).notNullable();
      table.string("donation_name", 100).notNullable();
    })
    .createTable("users_donation", function (table) {
      table.increments("donation_id");
      table.integer("user_id");
      table.string("name", 255).notNullable();
      table.string("total_donation", 18.2).notNullable();
      table.string("donation_cd", 255).notNullable();
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTable("users_donation")
    .dropTable("donation_category")
    .dropTable("users");
};

exports.config = { transaction: false };
