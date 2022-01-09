module.exports = (sequelize, DataTypes) => {
    const Offers = sequelize.define("Offers", {
      couponid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    return Offers;
  };