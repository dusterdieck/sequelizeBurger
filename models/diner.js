module.exports = function(sequelize, DataTypes) { 
  var Diner = sequelize.define("Diner", {
    // Giving the Author model a name of type STRING
    name: { 
      type: DataTypes.STRING,
      allowNull: false
    }
  },
    {
      classMethods: {
        associate: function(models) {
          //a diner can have as many burgers as he wants, but when he leaves the shop (is deleted), so do his burgers
          Diner.hasMany(models.Burger, {
            onDelete: "cascade"
          });
        }
      }
    }
  );
  return Diner;
};