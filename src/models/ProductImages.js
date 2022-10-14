module.exports = (sequelize, DataTypes) => {
    const ProductImages = sequelize.define('ProductImages', {
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

    ProductImages.associate = (models) => {
        ProductImages.belongsTo(models.products, {foreignKey: 'id', as: 'product'});
      };

    return ProductImages
}