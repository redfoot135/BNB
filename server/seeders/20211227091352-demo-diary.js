'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('diaries', [{
      title: '예쁜 금쪽이',
      writer: 1,
      createdAt: new Date().toLocaleDateString('en-US'),
      updatedAt: new Date()
    },
    {
      title: '얼큰이 금쪽이',
      writer: 1,
      createdAt: new Date().toLocaleDateString('en-US'),
      updatedAt: new Date()
    },
    {
      title: '우리 금쪽이',
      writer: 1,
      createdAt: new Date().toLocaleDateString('en-US'),
      updatedAt: new Date()
    },
    {
      title: '다리좀봐라',
      writer: 1,
      createdAt: new Date().toLocaleDateString('en-US'),
      updatedAt: new Date()
    },
    {
      title: '아들이냐 딸이냐',
      writer: 1,
      createdAt: new Date().toLocaleDateString('en-US'),
      updatedAt: new Date()
    },
    {
      title: '아들이냐 딸이냐',
      writer: 1,
      createdAt: new Date().toLocaleDateString('en-US'),
      updatedAt: new Date()
    },
    {
      title: '아들이냐 딸이냐',
      writer: 1,
      createdAt: new Date().toLocaleDateString('en-US'),
      updatedAt: new Date()
    },
    {
      title: '아들이냐 딸이냐',
      writer: 1,
      createdAt: new Date().toLocaleDateString('en-US'),
      updatedAt: new Date()
    },
    {
      title: '아들이냐 딸이냐',
      writer: 1,
      createdAt: new Date().toLocaleDateString('en-US'),
      updatedAt: new Date()
    },
    {
      title: '아들이냐 딸이냐',
      writer: 1,
      createdAt: new Date().toLocaleDateString('en-US'),
      updatedAt: new Date()
    },
    {
      title: '아들이냐 딸이냐',
      writer: 1,
      createdAt: new Date().toLocaleDateString('en-US'),
      updatedAt: new Date()
    },
    {
      title: '아들이냐 딸이냐',
      writer: 1,
      createdAt: new Date().toLocaleDateString('en-US'),
      updatedAt: new Date()
    },
    {
      title: '아들이냐 딸이냐',
      writer: 1,
      createdAt: new Date().toLocaleDateString('en-US'),
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
