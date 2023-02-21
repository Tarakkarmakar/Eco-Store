const express = require("express");

const { productModel } = require("../models/ProductsModel");

const UserProductRoute = express.Router();

UserProductRoute.get("/", async (req, res) => {
  try {
    const serach = req.query.search || "";

    const products = await productModel.find({
      title: { $regex: serach },
    });

    res.send(products);
  } catch (err) {
    console.log(err);
    res.send("error");
  }
});

UserProductRoute.get("/single/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const products = await productModel.findOne({
      _id: id,
    });

    res.send(products);
  } catch (err) {
    console.log(err);
    res.send("error");
  }
});
/////---kitchen--////////
UserProductRoute.get("/kitchen", async (req, res) => {
  try {
    const brandOptions = [];
    const serach = req.query.search || "";
    const intitialProduct = await productModel.find({ category: "kitchen" });

    intitialProduct.map((document) => {
      brandOptions.push(document.brand);
    });

    let brand = req.query.brand || "All";

    let discount = parseInt(req.query.off) || 0;
    let sort = req.query.sort || "price";
    let order = req.query.order;
    brand === "All"
      ? (brand = [...brandOptions])
      : (brand = req.query.brand.split(","));

    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

    let sortBy = {};

    if (order) {
      sortBy[sort[0]] = order;
    } else {
      sortBy[sort[0]] = "asc";
    }

    const products = await productModel
      .find({
        category: "kitchen",
        title: { $regex: serach },
        off: { $gte: discount },
        brand: [...brand],
      })
      .sort(sortBy);

    res.send(products);
  } catch (err) {
    console.log(err);
    res.send({ "error occurd": err });
  }
});
/////---fashion---//
UserProductRoute.get("/fashion", async (req, res) => {
  try {
    const brandOptions = [];
    const serach = req.query.search || "";
    const intitialProduct = await productModel.find({ category: "fashion" });

    intitialProduct.map((document) => {
      brandOptions.push(document.brand);
    });

    let brand = req.query.brand || "All";

    let discount = parseInt(req.query.off) || 0;
    let sort = req.query.sort || "price";
    let order = req.query.order;
    brand === "All"
      ? (brand = [...brandOptions])
      : (brand = req.query.brand.split(","));

    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

    let sortBy = {};

    if (order) {
      sortBy[sort[0]] = order;
    } else {
      sortBy[sort[0]] = "asc";
    }

    const products = await productModel
      .find({
        category: "fashion",
        title: { $regex: serach },
        off: { $gte: discount },
        brand: [...brand],
      })
      .sort(sortBy);

    res.send(products);
  } catch (err) {
    console.log(err);
    res.send("error");
  }
});
////plants---///
UserProductRoute.get("/plants", async (req, res) => {
  try {
    const brandOptions = [];
    const serach = req.query.search || "";
    const intitialProduct = await productModel.find({ category: "plants" });

    intitialProduct.map((document) => {
      brandOptions.push(document.brand);
    });

    let brand = req.query.brand || "All";

    let discount = parseInt(req.query.off) || 0;
    let sort = req.query.sort || "price";
    let order = req.query.order;
    brand === "All"
      ? (brand = [...brandOptions])
      : (brand = req.query.brand.split(","));

    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

    let sortBy = {};

    if (order) {
      sortBy[sort[0]] = order;
    } else {
      sortBy[sort[0]] = "asc";
    }

    const products = await productModel
      .find({
        category: "plants",
        title: { $regex: serach },
        off: { $gte: discount },
        brand: [...brand],
      })
      .sort(sortBy);

    res.send(products);
  } catch (err) {
    console.log(err);
    res.send("error");
  }
});

module.exports = {
  UserProductRoute,
};
