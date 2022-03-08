
   
module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('Posts',
      [
        {
          id: 1,
          title: 'Post da Seeder 01',
          content: 'Melhor post da seeder',
          user_id: 1,
          published: new Date('2017-09-02T07:45:00.000Z'),
          updated: new Date('2017-10-01T09:43:51.000Z'),
        },
        {
          id: 2,
          title: 'Post da Seeder 02',
          content: 'Não é o melhor post da seeder',
          user_id: 1,
          published: new Date('2018-10-20T20:45:00.000Z'),
          updated: new Date('2019-01-13T15:30:51.000Z'),
        },
      ]);
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Posts', null, {});
  },
};