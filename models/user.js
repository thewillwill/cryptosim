module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    facebook_id: {
      type: DataTypes.STRING,
      allowNull: false,
    }
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  User.associate = function(models) {
    User.hasMany(models.Transaction, {
      onDelete: "CASCADE"
    });
  };

  User.associate = function(models) {
    User.hasMany(models.Portfolio, {
      onDelete: "CASCADE"
    });
  };

  return User;
}; 
 