const express = require("express");
const bodyParser = require("body-parser");
const cloudinary = require("../utils/cloudinary");
const { Product } = require("../Models/ProductSchema");

const router = express.Router();

router.use(bodyParser.json({ limit: '5mb' }));
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post("/", async (req, res) => {
  const { name, brand, desc, price, image } = req.body;

  try {
    if (image) {
 
   const uploadRes = await cloudinary.uploader.upload(image, {
  upload_preset: "urhnnqjz",
        

      });
      console.log('Cloudinary Upload Response:', uploadRes);


      if (uploadRes) {
        const product = new Product({
          name,
          brand,
          desc,
          price,
          Image: uploadRes.secure_url,  
        });

        const savedProduct = await product.save();
        res.status(200).send(savedProduct);
      }
    } else {
      // Handle case when no image is provided
      res.status(400).send("No image provided");
    }
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send(error.message);
  }
  
});

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
