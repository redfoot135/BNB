'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('diary_comments', [{
      diary_id: 1,
      user_id: 1,
      comment: "오늘은 어1111도 길고 코로나도 걱정이고 걱정걱정걱정 투성이다.",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      diary_id: 1,
      user_id: 1,
      comment: "오늘은 어1111도 길고 코로나도 걱정이고 걱정걱정걱정 투성이다.",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      diary_id: 1,
      user_id: 1,
      comment: "오늘은 어1111도 길고 코로나도 걱정이고 걱정걱정걱정 투성이다.",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      diary_id: 1,
      user_id: 1,
      comment: "오늘은 어1111도 길고 코로나도 걱정이고 걱정걱정걱정 투성이다.",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      diary_id: 1,
      user_id: 1,
      comment: "오늘은 어1111도 길고 코로나도 걱정이고 걱정걱정걱정 투성이다.",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      diary_id: 1,
      user_id: 1,
      comment: "오늘은 어1111도 길고 코로나도 걱정이고 걱정걱정걱정 투성이다.",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      diary_id: 1,
      user_id: 1,
      comment: "오늘은 어1111도 길고 코로나도 걱정이고 걱정걱정걱정 투성이다.",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      diary_id: 1,
      user_id: 1,
      comment: "오늘은 어1111도 길고 코로나도 걱정이고 걱정걱정걱정 투성이다.",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      diary_id: 2,
      user_id: 1,
      comment: "오늘은 어1111도 길고 코로나도 걱정이고 걱정걱정걱정 투성이다.",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      diary_id: 2,
      user_id: 1,
      comment: "오늘은 어1111도 길고 코로나도 걱정이고 걱정걱정걱정 투성이다.",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      diary_id: 2,
      user_id: 1,
      comment: "오늘은 어1111도 길고 코로나도 걱정이고 걱정걱정걱정 투성이다.",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      diary_id: 2,
      user_id: 1,
      comment: "오늘은 어1111도 길고 코로나도 걱정이고 걱정걱정걱정 투성이다.",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      diary_id: 2,
      user_id: 1,
      comment: "오늘은 어1111도 길고 코로나도 걱정이고 걱정걱정걱정 투성이다.",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      diary_id: 2,
      user_id: 1,
      comment: "오늘은 어1111도 길고 코로나도 걱정이고 걱정걱정걱정 투성이다.",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      diary_id: 2,
      user_id: 1,
      comment: "오늘은 어1111도 길고 코로나도 걱정이고 걱정걱정걱정 투성이다.",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      diary_id: 2,
      user_id: 1,
      comment: "오늘은 어1111도 길고 코로나도 걱정이고 걱정걱정걱정 투성이다.",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      diary_id: 2,
      user_id: 1,
      comment: "오늘은 어1111도 길고 코로나도 걱정이고 걱정걱정걱정 투성이다.",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      diary_id: 3,
      user_id: 1,
      comment: "오늘은 어1111도 길고 코로나도 걱정이고 걱정걱정걱정 투성이다.",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      diary_id: 4,
      user_id: 1,
      comment: "오늘은 어1111도 길고 코로나도 걱정이고 걱정걱정걱정 투성이다.",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      diary_id: 4,
      user_id: 1,
      comment: "오늘은 어1111도 길고 코로나도 걱정이고 걱정걱정걱정 투성이다.",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      diary_id: 4,
      user_id: 1,
      comment: "오늘은 어1111도 길고 코로나도 걱정이고 걱정걱정걱정 투성이다.",
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
