const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const accountRoute = require("./routes/account");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const wishlistRoute = require("./routes/wishlist");
const cors = require("cors");

// const path = require('path');
// const __filename = __filename; // Tự động có sẵn trong môi trường Node.js khi dùng CommonJS
// const __dirname = __dirname;   // Tự động có sẵn trong môi trường Node.js khi dùng CommonJS
// Sử dụng trực tiếp __filename và __dirname có sẵn
// console.log(__filename);  // Đường dẫn đầy đủ tới file hiện tại
// console.log(__dirname);   // Đường dẫn tới thư mục chứa file hiện tại

mongoose
  .set("strictQuery", false)
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/accounts", accountRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);
app.use("/api/wishlist", wishlistRoute);

//Use  the client app
// app.use(express.static('/client/'))
// app.use(express.static(path.join(__dirname, 'client/build')));
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
// });




app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});
