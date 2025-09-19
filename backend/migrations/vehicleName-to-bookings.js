'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Bookings', 'vehicleName', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '' 
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Bookings', 'vehicleName');
  }
};
