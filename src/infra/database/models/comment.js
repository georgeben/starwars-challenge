module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("Comment", {
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ipAddress: {
      type: DataTypes.INET,
      allowNull: false,
    },
  });
  return Comment;
};
