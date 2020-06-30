
exports.up = function (knex) {
  return knex.schema.createTable("clucks", (table) => {
    
    table.increments("id").primary();
    table.string("username").defaultTo("Ian");
    table.text("content");
    table.string("imageUrl");
    table.timestamp("createdAt").defaultTo(knex.fn.now());
    table.timestamp("updatedAt").defaultTo(knex.fn.now());
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("clucks");
};
