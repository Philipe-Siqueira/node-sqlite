module.exports = (sequelize, DataTypes) => {
  const People = sequelize.define('People', {
   name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2,10],
      notNull: {
        msg: 'Please enter your name',
      },
    }
   },
   surname: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Please enter your Surname',
      },
    }
   },
   birth: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: true,
      isAfter: "1930-01-01",
      isBefore:"2015-01-01",
    }
   },
   gender: {
    type: DataTypes.INTEGER,
    allowNull: false,
   },
  },
  {
   sequelize,
   modelName: 'People'
  });

  People.associate = (models) => {
    People.belongsTo(models.Accounts, { foreignKey: 'account_id', as: 'account' });
  }

  return People;
 };
