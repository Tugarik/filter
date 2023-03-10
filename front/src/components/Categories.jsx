import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

import { useDataContext } from "../context/DataContext";
import ByCategory from "./ByCategory";

export default function Categories() {
  const { data, setData } = useDataContext();
  const [show, setShow] = useState(false);
  const [toggle, setToggle] = useState(true);
  const [param, setParam] = useState();

  useEffect(() => {
    setToggle(true);
    try {
      axios
        .get(`http://localhost:5000/products/categories`)
        .then((res) => setData(res.data));
    } catch (error) {
      console.log(error.message);
    }
  }, [setData]);
  return (
    <>
      {toggle && (
        <div className="cardBox d-flex flex-wrap">
          {data &&
            data.map((data, index) => {
              return (
                <Card className="card" key={index}>
                  <Card.Img
                    variant="top"
                    src={`${data.categoryImage}`}
                    className="cardImage"
                  />
                  <Card.Body>
                    <button
                      key={index}
                      className="menuBtn menuBtn-active"
                      onClick={(e) => {
                        e.preventDefault();
                        setToggle(false);
                        setShow(true);
                        setParam(data.categoryName);
                      }}
                    >
                      {data.categoryName}
                    </button>
                  </Card.Body>
                </Card>
              );
            })}
        </div>
      )}
      {show && <ByCategory param={param} />}
    </>
  );
}
