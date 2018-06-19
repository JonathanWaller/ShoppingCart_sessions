const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const {
  getCart,
  addToCart,
  deleteFromCart,
  updateCartItem
} = require("./controllers/cartCtrl");

const app = express();

app.use(json());
app.use(cors());

app.use(
  session({
    secret: "Super Duper Secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 7 * 2 * 100
    }
  })
);

app.use((req, res, next) => {
  console.log("req.body:", req.body);
  console.log("req.session:", req.session);
  console.log("req.params: ", req.params);
  next();
});

//creating this to use in cartCtrl.js
app.use((req, res, next) => {
  if (!req.session.cart) {
    req.session.cart = [];
  }
  next();
});

app.get("/api/cart", getCart);
app.post("/api/cart", addToCart);
app.delete("/api/cart/:id", deleteFromCart);
app.patch("/api/cart/:id", updateCartItem);

// testing initial connection
// app.get("/api/test", (req, res) => {
//   res.sendStatus(200);
//   res.status(200).send("Yippee!");
// });

const port = 3001;
app.listen(port, () => console.log(`listening on port ${port}`));
