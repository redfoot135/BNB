'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('pictures', [{
      url: "https://i.ibb.co/mvPpfqY/pngwing-com-1.png",
      diary_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      url: "https://i.ibb.co/mvPpfqY/pngwing-com-1.png",
      diary_id: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      url: "https://i.ibb.co/mvPpfqY/pngwing-com-1.png",
      diary_id: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      url: "https://i.ibb.co/mvPpfqY/pngwing-com-1.png",
      diary_id: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      url: "https://i.ibb.co/mvPpfqY/pngwing-com-1.png",
      diary_id: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      url: "https://i.ibb.co/mvPpfqY/pngwing-com-1.png",
      diary_id: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
