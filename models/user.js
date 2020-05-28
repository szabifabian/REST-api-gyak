'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  user.associate = function (models) {
    // associations can be defined here
    user.hasMany(models.track) //1<->N user.setTracks([])...

  };
  return user;
};