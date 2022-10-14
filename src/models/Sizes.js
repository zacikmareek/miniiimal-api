module.exports = (sequelize, DataTypes) => {
    const Sizes = sequelize.define('Sizes', {
        size: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
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

    Sizes.associate = (models) => {
        Sizes.belongsTo(models.products, {foreignKey: 'id', as: 'product'});
      };

    return Sizes
}