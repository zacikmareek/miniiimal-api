module.exports = (sequelize, DataTypes) => {
    const Applications = sequelize.define('Applications', {
        application: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fileName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        mimeType: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        path: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Products',
                key: 'id',
            }
        },
        
    });

    Applications.associate = (models) => {
        Applications.belongsTo(models.products, {foreignKey: 'id', as: 'product'});
      };

    return Applications
}
