import express from "express";
import {
  addBrand,
  addCategory,
  addProduct,
  byBrand,
  byCategory,
  delProduct,
  getBrands,
  getCategories,
  getMore,
  getPagination,
  getProducts,
  getSort,
} from "../services/product-service.js";

const ProductRouter = express.Router();

ProductRouter.get("/products", async (req, res) => {
  console.log("Product avah huselt orj irlee");
  const result = await getProducts();
  res.send(result);
});

ProductRouter.get("/products/sort", async (req, res) => {
  console.log("Product sort huselt orj irlee");
  const { query } = req;
  const result = await getSort(query.isDesc);
  res.send(result);
});

ProductRouter.get("/products/more", async (req, res) => {
  console.log("More avah huselt orj irlee");
  const { query } = req;
  const result = await getMore(query.limit || 10, query.isDesc || "asc");
  res.send(result);
});

ProductRouter.post("/product", async (req, res) => {
  console.log("Product nemeh huselt orj irlee");
  const { query } = req;
  console.log(query);
  const result = await addProduct(
    query.name,
    query.price,
    query.image_url,
    query.category,
    query.brand
  );
  res.send(result);
});

ProductRouter.get("/products/pagination", async (req, res) => {
  console.log("Pagination avah huselt orj irlee");
  const { query } = req;
  const result = await getPagination(
    query.limit || 10,
    query.portion || 0,
    query.isDesc || "asc"
  );
  res.send(result);
});

ProductRouter.get("/products/categories", async (req, res) => {
  console.log("Categories avah huselt orj irlee");
  const { query } = req;
  const result = await getCategories();
  res.send(result);
  console.log(result);
});

ProductRouter.get("/products/category", async (req, res) => {
  console.log("Category avah huselt orj irlee");
  const { query } = req;
  console.log("Param: ", query.param);
  const result = await byCategory(query.param);
  res.send(result);
});

ProductRouter.get("/products/brands", async (req, res) => {
  console.log("Brands avah huselt orj irlee");
  const { query } = req;
  const result = await getBrands();
  res.send(result);
  console.log(result);
});

ProductRouter.get("/products/brand", async (req, res) => {
  console.log("Brand avah huselt orj irlee");
  const { query } = req;
  console.log("Param: ", query.param);
  const result = await byBrand(query.param);
  res.send(result);
});

ProductRouter.post("/products/category", async (req, res) => {
  console.log("Category nemeh huselt orj irlee");
  const { query } = req;
  console.log("Param: ", query.param);
  await addCategory(query.param);
});

ProductRouter.post("/products/brand", async (req, res) => {
  console.log("Brand nemeh huselt orj irlee");
  const { query } = req;
  console.log("Param: ", query.param);
  await addBrand(query.param);
});

ProductRouter.delete("/products", async (req, res) => {
  console.log("Product ustgah huselt orj irlee");
  const { query } = req;
  await delProduct(query.id);
});

export default ProductRouter;
