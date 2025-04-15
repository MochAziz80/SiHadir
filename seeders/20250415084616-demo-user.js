'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      const hashedPassword = await bcrypt.hash('adminadmin', 10);

      await queryInterface.bulkInsert('users', [
        {
          nama: 'admin',
          email: 'admin@kantor.com',
          password: hashedPassword,
          role: 'admin',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ], {});
    } catch (error) {
      console.error("Seeder error:", error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
