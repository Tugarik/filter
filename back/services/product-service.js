import {pool} from "../config/mysql-config.js";

export async function getProducts(limit, isDesc) {
    const [rows] = await pool.query(`SELECT * FROM product order by price ${isDesc? 'desc' : 'asc'} limit ${limit}`);
    console.log(`SELECT * FROM product order by price ${isDesc==true? 'desc' : 'asc'} limit ${limit}`);
    console.log(isDesc);
    return rows;
  }

  export async function byLoad(limit, portion) {
    const [rows] = await pool.query(
      `SELECT * FROM product order by price ${isDesc==true? 'desc' : 'asc'} limit ${(0-portion)*limit, limit})`
    );
    return rows;
  }

  export async function byCategory(categoryName) {
    const [rows] = await pool.query(
      `select id, name from product where category = (select id from category where categoryName = '${categoryName}')`
    );
    return rows;
  }

  
  export async function delProduct(id) {
    const [rows] = await pool.query(
      `DELETE FROM product WHERE id = ${id}; ALTER TABLE product AUTO_INCREMENT=4000`
    );
    return rows;
  }