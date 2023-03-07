import axios from "axios";
import { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDataContext } from "../context/DataContext";


export default function ByBrand() {
    const { param } = useParams();
    const {data, setData, isDesc, setIsDesc} = useDataContext();
    const sortPrice = () => {
        console.log("sort");
        setIsDesc(!isDesc);
        console.log(isDesc);
      };
    
      const handleDelete = (id) => {
        console.log("delete: ", id);
      };
    useEffect(() => {
        try {
          axios
            .get(
              `http://localhost:5000/products/brand?param=${param}`
            )
            .then((res) => setData(res.data));
        } catch (error) {
          console.log(error.message);
        }
      }, [setData, param]);
    return (
        <>
            
            <h3 className="my-3">Category table: {param}</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>
                        <div className="tableHead">URL</div>
                    </th>
                    <th>
                        <div className="tableHead">Name</div>
                    </th>
                    <th>
                        Price
                        <button className="sortBtn" onClick={sortPrice} type="text">
                        <i className="bi bi-sort-down-alt"></i>
                        <i className="bi bi-sort-down"></i>
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
                            <span className="delBtn" onClick={() => handleDelete(data.id)}>
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