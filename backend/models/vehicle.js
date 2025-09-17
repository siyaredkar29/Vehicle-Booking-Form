'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Vehicle extends Model {
   
    static associate(models) {
      
      Vehicle.belongsTo(models.VehicleType, { foreignKey: 'typeId' });

     
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
