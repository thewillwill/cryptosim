module.exports = function(sequelize, DataTypes) {
  var Portfolio = sequelize.define("Portfolio", {
    currency: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    expired: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false
    },
  });

  Portfolio.associate = function(models) {
    Portfolio.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Portfolio;
};
