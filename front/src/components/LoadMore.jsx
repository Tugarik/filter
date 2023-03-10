import axios from "axios";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useDataContext } from "../context/DataContext";

export default function LoadMore() {
  const { data, setData, filter, setFilter, isDesc, setIsDesc } =
    useDataContext();
  const [toggle, setToggle] = useState(true);

  const sortPrice = () => {
    console.log("sort");
    setIsDesc(!isDesc);
    console.log(isDesc);
  };

  const handleDelete = (id) => {
    console.log("delete: ", id);
    setToggle(!toggle);
    try {
      axios.delete(`http://localhost:5000/products?id=${id}`);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    try {
      axios
        .get(
          `http://localhost:5000/products/more?limit=${filter}&isDesc=${isDesc}`
        )
        .then((res) => setData(res.data));
    } catch (error) {
      console.log(error.message);
    }
  }, [filter, isDesc, setData, toggle]);

  return (
    <>
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
      {data && data.length >= filter && (
        <button
          className="menuBtn menuBtn-active"
          onClick={(e) => {
            e.preventDefault();
            setFilter((prev) => Number(prev) + 5);
          }}
        >
          View More
        </button>
      )}
    </>
  );
}
