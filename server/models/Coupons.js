module.exports = (sequelize, DataTypes) => {
  const Coupons = sequelize.define("Coupons", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    couponText: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    }

  });


  return Coupons;
};
