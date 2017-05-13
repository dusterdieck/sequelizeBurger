module.exports = function(sequelize, DataTypes) { 
  var Burger = sequelize.define("Burger", {
    burger_name: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    devoured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
    {
      classMethods: {
        associate: function(models) {
          //saying that a burger can belong to a diner, but is allowed to just be a burger sometimes
          Burger.belongsTo(models.Diner, {
            foreignKey: {
              allowNull: true
            }
          });
        }
      }
    }
  );
  return Burger;
};
