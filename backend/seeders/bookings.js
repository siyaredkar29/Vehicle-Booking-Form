'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Sample bookings
    await queryInterface.bulkInsert('Bookings', [
      {
        firstName: 'John',
        lastName: 'Doe',
        vehicleId: 1, // Swift
        startDate: new Date('2025-09-20'),
        endDate: new Date('2025-09-22'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        vehicleId: 2, // Vitara
        startDate: new Date('2025-09-21'),
        endDate: new Date('2025-09-23'),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Bookings', null, {});
  }
};
