module.exports = function(sequelize, DataTypes) {
  var Transaction = sequelize.define("Transaction", {
    currency: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    price_paid: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    transaction_type: {
      type: DataTypes.STRING(1),
      allowNull: false
    }
  });

  Transaction.associate = function(model) {
    Transaction.belongsTo(model.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Transaction;
};
