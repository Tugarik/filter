import express from "express";
import { byCategory, getProducts } from "../services/product-service.js";

const ProductRouter = express.Router();



ProductRouter.get("/products", async (req, res) => {
  console.log("Product avah huselt orj irlee");
  const { query } = req;
  const result = await getProducts(query.limit || 100, query.isDesc);
  res.send(result);
});

ProductRouter.get("/products/load", async (req, res) => {
    console.log("Product avah huselt orj irlee");
    const { query } = req;
    const result = await byLoad(query.limit || 10);
    res.send(result);
  });



export default ProductRouter;