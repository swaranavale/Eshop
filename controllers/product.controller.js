const ProductModel = require("../models/product.model");
const validator = require("validator");

// create a new product in database.
exports.saveProduct = async (req, res) => {
  const productObj = {
    name: req.body.name,
    availableItems: req.body.availableItems,
    price: parseFloat(req.body.price).toFixed(1),
    category: req.body.category,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    manufacturer: req.body.manufacturer,
  };

  try {
    const productAdded = await ProductModel.create(productObj);

    res.status(200).send(productAdded);
  } catch (err) {
    console.log("Some error while adding the product in db", err.message);
    res.status(500).send({
      message: "Some internal error while inserting the product",
    });
  }
};

// update product in the database.
exports.updateProduct = async (req, res) => {
  try {
    const product = await ProductModel.findOne({ _id: req.params.productId });

    if (!product) {
      return res.status(404).send({
        message: `No Product found for ID - ${req.params.productId}`,
      });
    }

    product.name = req.body.name ?? product.name;
    product.availableItems = req.body.availableItems ?? product.availableItems;
    product.price = req.body.price ?? product.price;
    product.category = req.body.category ?? product.category;
    product.description = req.body.description ?? product.description;
    product.imageUrl = req.body.imageUrl ?? product.imageUrl;
    product.manufacturer = req.body.manufacturer ?? product.manufacturer;

    const updatedProduct = await product.save({ new: true });

    res.status(200).send(updatedProduct);
  } catch (err) {
    console.log("Some error while updating the product in db", err.message);
    res.status(500).send({
      message: "Some internal error while updating the product",
    });
  }
};

// delete a product from the database.
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await ProductModel.findByIdAndDelete({
      _id: req.params.productId,
    });

    if (!deletedProduct) {
      return res.status(404).send({
        message: `No Product found for ID - ${req.params.productId}`,
      });
    }

    res.status(200).send({
      message: `Product with ID - ${req.params.productId} deleted successfully!`,
    });
  } catch (err) {
    console.log("Some error while deleting the product in db", err.message);
    res.status(500).send({
      message: "Some internal error while deleting the product",
    });
  }
};

// get single product from the database by ID.
exports.getProductById = async (req, res) => {
  try {
    if (!validator.isMongoId(req.params.productId)) {
      return res.status(400).send({
        message: "Failed! Invalid productId!",
      });
    }

    const product = await ProductModel.findById({ _id: req.params.productId });

    if (!product) {
      return res.status(404).send({
        message: `No Product found for ID - ${req.params.productId}!`,
      });
    }

    res.status(200).send(product);
  } catch (err) {
    console.log("Some error while fetching the product in db", err.message);
    res.status(500).send({
      message: "Some internal error while fetching the product",
    });
  }
};

// get all unique categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await ProductModel.distinct("category").exec();

    res.status(200).send(categories);
  } catch (err) {
    console.log(
      "Some error while fetching the category of products in db",
      err.message
    );
    res.status(500).send({
      message: "Some internal error while fetching the category of products",
    });
  }
};

// searching for products based on certain query parameters
exports.searchProducts = async (req, res) => {
  try {
    const {
      category = "",
      direction = "DESC",
      name = "",
      sortBy = "_id",
      pageNo = 1,
      pageSize = 5,
    } = req.query;

    
    const skip = (pageNo - 1) * pageSize;


    const products = await ProductModel.aggregate([
      {
        $match: {
          $and: [
            { category: { $regex: category, $options: "i" } },
            { name: { $regex: name, $options: "i" } },
          ],
        },
      },
      {
        $sort: { [sortBy]: direction === "ASC" ? 1 : -1 },
      },
      {
        $skip: skip,
      },
      {
        $limit: parseInt(pageSize),
      },
    ]);


    const totalProducts = await ProductModel.find({
      $and: [
        { category: { $regex: category, $options: "i" } },
        { name: { $regex: name, $options: "i" } },
      ],
    }).countDocuments();

    
    const totalPages = Math.ceil(totalProducts / pageSize);

    // create response
    const response = {
      content: products,
      pageable: {
        sort: {
          sorted: true,
          unsorted: false,
          empty: false,
        },
        offset: skip,
        pageNumber: parseInt(pageNo),
        pageSize: parseInt(pageSize),
        unpaged: false,
        paged: true,
      },
      totalPages: totalPages,
      totalElements: totalProducts,
      last: parseInt(pageNo) === totalPages,
      size: parseInt(pageSize),
      number: parseInt(pageNo),
      sort: {
        sorted: true,
        unsorted: false,
        empty: false,
      },
      numberOfElements: products.length,
      first: parseInt(pageNo) === 1,
      empty: products.length === 0,
    };

    res.status(200).send(response);
  } catch (err) {
    console.log("Some error while fetching products in db", err.message);
    res.status(500).send({
      message: "Some internal error while fetching products",
    });
  }
};
