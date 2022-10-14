const ApplicationsController = require('./controllers/ApplicationsController');
const AuthenticationController = require('./controllers/AuthenticationController');
const ColorsController = require('./controllers/ColorsController');
const ProductsController = require('./controllers/ProductsController');
const ProductsImagesController = require('./controllers/ProductsImagesController');
const SizesController = require('./controllers/SizesController');

module.exports = (app) => {
  /***************************** LOGIN REGISTER LOGOUT *****************************/
    app.post('/api/v1/register', 
      AuthenticationController.register
    )

    app.post('/api/v1/login',
      AuthenticationController.login
    )

    app.post('/api/v1/logout',
      AuthenticationController.logout
    )

  /***************************** PRODUCTS *****************************/

    app.get('/api/v1/products', 
      ProductsController.index
    )
    app.get('/api/v1/products/product/:id', 
      ProductsController.getProductByID
    )
    app.post('/api/v1/products/new', 
      ProductsController.post
    )
    app.put('/api/v1/products/update/:id', 
      ProductsController.put
    )
    app.delete('/api/v1/products/delete/:id', 
      ProductsController.delete
    )

    /***************************** PRODUCTS IMAGES *****************************/
    app.get('/api/v1/products/images/all/:product_id', 
      ProductsImagesController.index
    )

    app.get('/api/v1/products/images/one/:product_id/id/:id', 
      ProductsImagesController.getOneProductImage
    )

    app.delete('/api/v1/products/images/delete/:product_id/id/:id', 
      ProductsImagesController.deleteProductImage
    )

    app.delete('/api/v1/products/images/delete/:product_id/', 
      ProductsImagesController.deleteProductImages
    )

    app.post('/api/v1/products/images/new/:product_id', 
      ProductsImagesController.post
    )

    /***************************** PRODUCTS APPLICATIONS *****************************/
    app.get('/api/v1/products/applications/all/:product_id', 
      ApplicationsController.index
    )

    app.get('/api/v1/products/applications/one/:product_id/id/:id', 
      ApplicationsController.getOneProductApplication
    )

    app.delete('/api/v1/products/applications/delete/:product_id/id/:id', 
      ApplicationsController.deleteProductApplication
    )

    app.delete('/api/v1/products/applications/delete/:product_id/', 
      ApplicationsController.deleteProductApplications
    )

    app.post('/api/v1/products/applications/new/:product_id', 
      ApplicationsController.post
    )

    /***************************** PRODUCTS COLORS *****************************/
    app.get('/api/v1/products/colors/all/:product_id', 
      ColorsController.index
    )

    app.get('/api/v1/products/colors/one/:product_id/id/:id', 
      ColorsController.getOneProductColor
    )

    app.delete('/api/v1/products/colors/delete/:product_id/id/:id', 
      ColorsController.deleteProductColor
    )

    app.delete('/api/v1/products/colors/delete/:product_id/', 
      ColorsController.deleteProductColors
    )

    app.post('/api/v1/products/colors/new/:product_id', 
      ColorsController.post
    )

    /***************************** PRODUCTS SIZES *****************************/
    app.get('/api/v1/products/sizes/all/:product_id', 
      SizesController.index
    )

    app.get('/api/v1/products/sizes/one/:product_id/id/:id', 
      SizesController.getOneProductSize
    )

    app.delete('/api/v1/products/sizes/delete/:product_id/id/:id', 
      SizesController.deleteProductSize
    )

    app.delete('/api/v1/products/sizes/delete/:product_id/', 
      SizesController.deleteProductSizes
    )

    app.post('/api/v1/products/sizes/new/:product_id', 
      SizesController.post
    )
}
