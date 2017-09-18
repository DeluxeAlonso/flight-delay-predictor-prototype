module.exports = function (sequelize, DataTypes) {
  var Airport = sequelize.define('Airport', {
  	name: DataTypes.STRING,
  	status: {type:DataTypes.INTEGER, defaultValue: 1}
  });
  Airport.associate = function (models) {
  };
  return Airport;
};