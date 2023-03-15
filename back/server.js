import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import ProductRouter from "./routes/products.js";

const PORT = 5000;
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(ProductRouter);

app.listen(PORT, () => {
  console.log("Server started at port: ", PORT);
});
