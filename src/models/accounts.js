const {Model} = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
 const Accounts = sequelize.define('Accounts', {
  email: {
   type: DataTypes.STRING,
   allowNull: false,
   unique: true,
   validate: {
    isEmail: true,
   }
  },
  password_hash: {
   type: DataTypes.STRING,
  },
  password: {
   type: DataTypes.VIRTUAL,
   allowNull: false,
   set: function (val) {
    this.setDataValue('password', val);
    this.setDataValue('password_hash', bcrypt.hashSync(val, 8));
   },
  },
 },
 {
  sequelize,
  modelName: 'Accounts'
 });

 Accounts.prototype.toJSON = function () {
  const values = { ...this.get() };
  delete values.password_hash;
  delete values.password;
  return values;
 }
 return Accounts;
};
