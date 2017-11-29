module.exports = function(sequelize, DataTypes) {
  var Coin = sequelize.define("Coin", {
    coin_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    key_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    base_url: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.STRING,
    },
    image_url: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    symbol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    coin_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sort_order: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  return Coin;
}
