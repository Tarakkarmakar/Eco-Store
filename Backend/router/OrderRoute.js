const express = require("express");

const { OrderModel } = require("../models/OrderModel");

const OrderRoute = express.Router();

OrderRoute.get("/", async (req, res) => {
  const email = req.headers.authorization.split(" ")[0];

  const products = await OrderModel.find({ email: email });

  res.send(products);
});
OrderRoute.get("/All", async (req, res) => {
  const products = await OrderModel.find();

  res.send(products);
});

OrderRoute.post("/create", async (req, res) => {
  const payload = req.body;

  try {
    payload.map(async (ele) => {
      const new_product = new OrderModel(ele);

      await new_product.save();
    });

    res.send({ msg: "products has been save" });
  } catch (err) {
    res.send({ msg: "invalid" });
  }
});

OrderRoute.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await OrderModel.findByIdAndDelete({ _id: id });

    res.send({ msg: "products is deleted" });
  } catch (err) {
    console.log(err);
  }
});
module.exports = {
  OrderRoute,
};
