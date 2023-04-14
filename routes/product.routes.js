const productController = require("../controllers/product.controller");
const { verifyProductReqBody, authjwt } = require("../middlewares");

// route to save a new product to the database
module.exports = (app) => {
  app.post(
    "/eshop/api/v1/products",
    [
      verifyProductReqBody.validateProductReqBody,
      authjwt.verifyToken,
      authjwt.isAdmin,
    ],
    productController.saveProduct
  );

  // route to update an existing product
  app.put(
    "/eshop/api/v1/products/:productId",
    [
      verifyProductReqBody.validateProductUpdateBody,
      authjwt.verifyToken,
      authjwt.isAdmin,
    ],
    productController.updateProduct
  );

  // route to delete an existing product
  app.delete(
    "/eshop/api/v1/products/:productId",
    [authjwt.verifyToken, authjwt.isAdmin],
    productController.deleteProduct
  );

  // route to search for products using query parameters
  app.get("/eshop/api/v1/products", productController.searchProducts);

  // route to get all available categories of products
  app.get("/eshop/api/v1/products/categories", productController.getCategories);

  // route to get a specific product by ID
  app.get(
    "/eshop/api/v1/products/:productId",
    productController.getProductById
  );
};
