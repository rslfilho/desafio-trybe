module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('Users',
      [{
        id: 1,
        display_name: 'Usuário Seeder 01',
        email: 'usuário_seeder_01@email.com',
        password: '123456',
        image: 'http://foto.do.seeder.1.com',
      },
      {
        id: 2,
        display_name: 'Usuário Seeder 02',
        email: 'usuário_seeder_02@email.com',
        password: '123456',
        image: 'http://foto.do.seeder.2.com',
      },
      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};