module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define('Products', {
    amaunt: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter product name',
        },
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter product category',
        },
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter product description',
        },
      }
    },
    minimun: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      }
    },
    received_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    received_in: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    product_validity: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Products'
  });
  /*
  People.associate = (models) => {
    People.belongsTo(models.Accounts, { foreignKey: 'account_id', as: 'account' });
  }
  */
  return Products;
};
