'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('VehicleTypes', [
      { name: 'Hatchback', wheels: 4, createdAt: new Date(), updatedAt: new Date() },
      { name: 'SUV', wheels: 4, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Sedan', wheels: 4, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Cruiser', wheels: 2, createdAt: new Date(), updatedAt: new Date() }
    ]);

    await queryInterface.bulkInsert('Vehicles', [
      { name: 'Swift', typeId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Vitara', typeId: 2, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Civic', typeId: 3, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Harley', typeId: 4, createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Vehicles', null, {});
    await queryInterface.bulkDelete('VehicleTypes', null, {});
  }
};
