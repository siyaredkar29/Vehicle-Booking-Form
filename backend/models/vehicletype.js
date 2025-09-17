'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class VehicleType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // VehicleType has many Vehicles
      VehicleType.hasMany(models.Vehicle, { foreignKey: 'typeId' });
    }
  }

  VehicleType.init(
    {
      name: DataTypes.STRING,
      wheels: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'VehicleType',
    }
  );

  return VehicleType;
};
