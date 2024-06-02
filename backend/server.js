require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const productRoutes = require("./routes/productRouter");
const userRoutes = require("./routes/user");

//express app
const app = express();

//middleware
app.use(express.json());
//parse JSON bodies Body Parsing Middleware: This middleware parses incoming request bodies in a middleware before your handlers, and makes it available under req.body. It's typically used to parse JSON, urlencoded, and multipart bodies. You can use middleware like express.json() or express.urlencoded() to achieve this.
app.use(cors());
//CORS Middleware: Cross-Origin Resource Sharing (CORS) is a security feature implemented by browsers to restrict scripts running in a browser from making requests to a different domain than the one that served the original web page. CORS middleware helps in enabling CORS requests and configuring its behavior. You can use middleware like cors to handle CORS in your Express.js application.
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes(attaching them to the app)
app.use("/api/products", productRoutes);
app.use("/api/user", userRoutes);

//connect to db
mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
      console.log("listening on port & connected to db ", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
//Error Handling: You have good error handling in place, checking for valid ObjectId and returning appropriate error responses.

//Validation: You're checking for empty fields when creating a new product, which is good. However, consider adding more validation, such as checking for the length of title and description, or if they meet certain criteria.
