'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [{
      idName: "asdf",
      name: '금쪽이 엄마',
      password: '$2a$10$nqRk5nHsyecWmn6bWCdqdOEKN.Txhp2w5NU4UYdDOgJCJWrJyuDXm',
      social: null,
      email: 'tlswogns135@naver.com',
      gender: "female",
      spouse: null,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
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
