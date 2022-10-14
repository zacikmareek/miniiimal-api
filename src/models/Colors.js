module.exports = (sequelize, DataTypes) => {
    const Colors = sequelize.define('Colors', {
        color: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fileName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        mimeType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        path: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Products',
                key: 'id',
            }
        }, 
    })

    Colors.associate = (models) => {
        Colors.belongsTo(models.products, {foreignKey: 'id', as: 'product'});
    };

    return Colors
}
