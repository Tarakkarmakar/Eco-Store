const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");
const { AdminUserModel } = require("../models/AdminUserModel");

const AdminuserRoute = express.Router();

AdminuserRoute.post("/register", async (req, res) => {
  const { name, email, gender, password } = req.body;

  try {
    bcrypt.hash(password, 8, async (err, hash) => {
      const user = new AdminUserModel({ name, email, gender, password: hash });

      await user.save();

      res.send("successfully Registered");
    });
  } catch (err) {
    console.log(err);

    res.send("Invalid");
  }
});
AdminuserRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await AdminUserModel.find({ email });

    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, function (err, result) {
        if (result) {
          const token = jwt.sign({ mode: "admin" }, process.env.key);

          res.send({ msg: "login successfull", token: token });
        } else {
          res.send("wrong crediential");
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.send("Something is wrong try again");
  }
});

module.exports = {
  AdminuserRoute,
};
