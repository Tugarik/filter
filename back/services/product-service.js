import { pool } from "../config/mysql-config.js";

export async function getProducts() {
  const [rows] = await pool.query(`SELECT * FROM product`);
  console.log(`SELECT * FROM product`);
  return rows;
}

export async function addProduct(name, price, image_url, category, brand) {
  const [rows] = await pool.query(
    `INSERT INTO product (
      name,
      price,
      image_url,
      category,
      brand,
      stock,
      sale
  ) VALUES ('${name}','${price}','${image_url}','${category}','${brand}', '1','0')`
  );
  console.log(`INSERT INTO product (
    name,
    price,
    image_url,
    category,
    brand,
    stock,
    sale
) VALUES ('${name}','${price}','${image_url}','${categoryName}','${brandName}', '1','0')`);
  return rows;
}

export async function getSort(isDesc) {
  const [rows] = await pool.query(
    `SELECT * FROM product order by price ${isDesc == "true" ? "desc" : "asc"}`
  );
  return rows;
}

export async function getPagination(limit, portion, isDesc) {
  const [rows] = await pool.query(
    `SELECT * FROM product order by price ${
      isDesc == "true" ? "desc" : "asc"
    } limit ${portion * limit - limit}, ${limit}`
  );
  return rows;
}

export async function getMore(limit, isDesc) {
  const [rows] = await pool.query(
    `SELECT * FROM product order by price ${
      isDesc == "true" ? "desc" : "asc"
    } limit ${limit}`
  );
  console.log(
    `SELECT * FROM product order by price ${
      isDesc == "true" ? "desc" : "asc"
    } limit ${limit}`
  );
  return rows;
}

export async function getCategories() {
  const [rows] = await pool.query(
    `SELECT c.categoryName, (SELECT p.image_url FROM product p WHERE p.category = c.id LIMIT 1) AS categoryImage from category c`
  );
  return rows;
}

export async function byCategory(categoryName) {
  console.log(
    `select * from product where category = (select id from category where categoryName = '${categoryName}')`
  );
  const [rows] = await pool.query(
    `select * from product where category = (select id from category where categoryName = '${categoryName}')`
  );
  return rows;
}

export async function addCategory(categoryName) {
  const [rows] = await pool.query(
    `INSERT INTO category(categoryName) VALUES ('${categoryName}')`
  );
  return rows;
}

export async function getBrands() {
  const [rows] = await pool.query(`SELECT brandName, brandImage from brand`);
  return rows;
}

export async function byBrand(brandName) {
  console.log(
    `select * from product where brand = (select id from brand where brandName = '${brandName}')`
  );
  const [rows] = await pool.query(
    `select * from product where brand = (select id from brand where brandName = '${brandName}')`
  );
  return rows;
}

export async function addBrand(brandName) {
  console.log(
    `select * from product where brand = (select id from brand where brandName = '${brandName}')`
  );
  const [rows] = await pool.query(
    `INSERT INTO brand (brandName, brandImage) VALUES ('${brandName}', '')`
  );
  return rows;
}

export async function delProduct(id) {
  const [rows] = await pool.query(
    `DELETE FROM product WHERE id = ${id}; ALTER TABLE product AUTO_INCREMENT=4000`
  );
  return rows;
}
