'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Vehicle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Vehicle belongs to a VehicleType
      Vehicle.belongsTo(models.VehicleType, { foreignKey: 'typeId' });

      // Vehicle has many Bookings
      Vehicle.hasMany(models.Booking, { foreignKey: 'vehicleId' });
    }
  }

  Vehicle.init(
    {
      name: DataTypes.STRING,
      typeId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Vehicle',
    }
  );

  return Vehicle;
};
