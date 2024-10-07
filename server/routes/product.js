const Product = require("../models/Product");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//Create

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update
router.patch("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Delete
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//get product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});
//find product by name
router.post("/find", async (req, res) => {
  const name = req.body.name;
  try {
    const products = await Product.find({
      $or: [
        { name: { $regex: new RegExp("^" + name, "i") } },
        { category: { $regex: new RegExp("^" + name, "i") } },
      ],
    });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});
//GET ALL PRODUCTS
router.get("/", async (req, res) => {
  const Country = req.query.country;
  const Category = req.query.category;
  const Status = req.query.status;
  try {
    let products;
    if (Country) {
      products = await Product.find({
        country: {
          $in: Country,
        },
      });
    } else if (Category) {
      products = await Product.find({
        category: {
          $in: Category,
        },
      });
    } else if (Status) {
      products = await Product.find({
        status: {
          $in: Status,
        },
      });
    } else {
      products = await Product.find().sort({ createdAt: 1 });
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
