const express = require("express");

const { connection } = require("./config/db");
const app = express();
const cors = require("cors");
require("dotenv").config();
const { AdminuserRoute } = require("./router/AdminuserRoute");

const { Authentication } = require("./middleware/Authenticate");

const { AdminProductsRoute } = require("./router/AdminproductRoute");
const { UserProductRoute } = require("./router/UserProductsRoutes");
const { CustomerUserRoute } = require("./router/CustomerUserRoute");
const { CartRoute } = require("./router/UserCartRoute");
const { OrderRoute } = require("./router/OrderRoute");
app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("This API is Private -*Made By Tarak* ");
});

app.use("/admin", AdminuserRoute);
app.use("/customerproducts", UserProductRoute);
app.use("/orders", OrderRoute);
app.use("/cart", CartRoute);
app.use("/customerUser", CustomerUserRoute);
app.use(Authentication);

app.use("/adminproducts", AdminProductsRoute);
app.listen(process.env.port, async () => {
  try {
   

    await connection;

    console.log("connected to Db");
  } catch (err) {
    console.log(err, "unable to connect");
  }
  console.log("server is running");
});
