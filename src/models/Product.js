module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        //nazov - ciapka, bunda...
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        //nazov bez diakritiky
        slug: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
    })

    Product.associate = (models) => {
        Product.hasMany(models.Colors, {foreignKey: 'id', as: 'colors'});
        Product.hasMany(models.Sizes, {foreignKey: 'id', as: 'sizes'});
        Product.hasMany(models.Applications, {foreignKey: 'id', as: 'applications'});
    };

    return Product
}
