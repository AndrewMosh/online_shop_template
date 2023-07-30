const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const productRoutes = require("./routes/ProductsRoutes");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = "тут адрес бд";

app.use(express.json());
app.use(cors());

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

app.use("/", productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
