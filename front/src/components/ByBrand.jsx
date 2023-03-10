import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useDataContext } from "../context/DataContext";

export default function ByBrand(param) {
  const { data, setData, isDesc, setIsDesc } = useDataContext();
  const [brands, setBrands] = useState();
  const [toggle, setToggle] = useState(true);

  const [brandName, setBrandName] = useState(param.param);

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
        .get(`http://localhost:5000/products/brand?param=${brandName}`)
        .then((res) => setData(res.data));
    } catch (error) {
      console.log(error.message);
    }
  }, [setData, brandName, isDesc, toggle]);

  useEffect(() => {
    try {
      axios
        .get(`http://localhost:5000/products/brands`)
        .then((res) => setBrands(res.data));
    } catch (error) {
      console.log(error.message);
    }
  }, [setBrands]);

  return (
    <>
      <hr />
      <div>
        {brands &&
          brands.map((brand, index) => {
            return (
              <span
                key={index}
                className="subMenu"
                onClick={(e) => {
                  e.preventDefault();
                  setBrandName(brand.brandName);
                }}
              >
                {" "}
                {brand.brandName} |
              </span>
            );
          })}
      </div>
      <hr />
      <h3 className="my-3">Category table: {brandName}</h3>
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
