

module.exports = {
  development: {
    client: "pg",

    connection: {
      database: "cluck_app",

      username: "qazal",
      password: "1234"
    },

    migrations: {
      tableName: "migrations",
      directory: "./db/migrations",
    },

    seeds: {
      directory: "./db/seeds",
    },
  },
};
