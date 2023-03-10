import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

import { useDataContext } from "../context/DataContext";

export default function ByCategory(param) {
  const { data, setData, isDesc, setIsDesc } = useDataContext();
  const [categories, setCategories] = useState();
  const [toggle, setToggle] = useState(true);
  const [catName, setCatName] = useState(param.param);

  const sortPrice = () => {
    console.log("sort");
    setIsDesc(!isDesc);
    console.log(isDesc);
  };

  const handleDelete = (id) => {
    console.log("delete: ", id);
    setToggle(!toggle);
    try {
      axios
        .delete(`http://localhost:5000/products?id=${id}`)
        .then((res) => setData(res.data));
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    try {
      axios
        .get(`http://localhost:5000/products/category?param=${catName}`)
        .then((res) => setData(res.data));
    } catch (error) {
      console.log(error.message);
    }
  }, [setData, catName, isDesc, toggle]);

  useEffect(() => {
    try {
      axios
        .get(`http://localhost:5000/products/categories`)
        .then((res) => setCategories(res.data));
    } catch (error) {
      console.log(error.message);
    }
  }, [setCategories]);

  return (
    <>
      <hr />
      <div>
        {categories &&
          categories.map((category, index) => {
            return (
              <span
                key={index}
                className="subMenu"
                onClick={(e) => {
                  e.preventDefault();
                  setCatName(category.categoryName);
                }}
              >
                {" "}
                {category.categoryName} |
              </span>
            );
          })}
      </div>
      <hr />
      <h3 className="my-3">Category table: {catName} </h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <div className="tableHead">Image</div>
            </th>
            <th>
              <div className="tableHead">Name</div>
            </th>
            <th>
              Price
              <button className="sortBtn" onClick={sortPrice} type="text">
                {isDesc ? (
                  <i className="bi bi-sort-down-alt"></i>
                ) : (
                  <i className="bi bi-sort-down"></i>
                )}
              </button>
            </th>
            <th>
              <div className="tableHead">Brand</div>
            </th>
            <th>
              <div className="tableHead">Category</div>
            </th>
            <th>
              <div className="tableHead">Sale</div>
            </th>
            <th>
              <div className="tableHead">Options</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((data, index) => (
              <tr key={index} id={data.id}>
                <td>
                  <img
                    className="prodImage"
                    src={data.image_url}
                    alt="prod_image"
                  />
                </td>
                <td>{data.name}</td>
                <td>{data.price}</td>
                <td>{data.brand}</td>
                <td>{data.category}</td>
                <td>{!data.sale || data.sale === 0 ? `-` : `${data.sale}%`}</td>
                <td>
                  Edit /{" "}
                  <span
                    className="delBtn"
                    onClick={() => handleDelete(data.id)}
                  >
                    Delete
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
}
