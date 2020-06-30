const faker = require("faker");


exports.seed = function (knex) {

  return knex("clucks")
    .del()
    .then(function () {
      const clucks = Array.from({ length: 50 }).map(() => {
        return {
          username: faker.name.findName(),
          content: faker.lorem.sentences(),
          imageUrl: faker.image.imageUrl(),
          createdAt: faker.date.past(),
          updatedAt: faker.date.past(),

        };
      });

      return knex("clucks").insert(clucks);
    });
};
