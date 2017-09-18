module.exports = function (sequelize, DataTypes) {
  var Flight = sequelize.define('Flight', {
  	number: DataTypes.STRING,
  	departure: DataTypes.STRING,
  	date: DataTypes.DOUBLE,
  	score: DataTypes.FLOAT,
  	status: {type:DataTypes.INTEGER, defaultValue: 1}
  });
  Flight.associate = function (models) {
  	Flight.belongsTo(models.Airport, {as: 'originAirport'});
    Flight.belongsTo(models.Airport, {as: 'destinationAirport'});
  };
  return Flight;
};