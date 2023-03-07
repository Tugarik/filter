import axios from "axios";
import { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDataContext } from "../context/DataContext";

export default function Categories() {
    const {data, setData} = useDataContext();
    const navigate = useNavigate();
    useEffect(() => {
        try {
          axios
            .get(
              `http://localhost:5000/products/categories`
            )
            .then((res) => setData(res.data));
        } catch (error) {
          console.log(error.message);
        }
      }, [setData]);
    return (
        <>
            <div className="cardBox d-flex flex-wrap">
                {data && data.map((data, index)=>{
                    return (
                        
                        <Card className="card" key={index}>
                            <Card.Img variant="top" src={`${data.categoryImage}`} className="cardImage"/>
                            <Card.Body>
                                <button key={index} className="menuBtn menuBtn-active" 
                                onClick={(e)=>{
                                    e.preventDefault(); 
                                    navigate(`/category/${data.categoryName}`);
                                }}>{data.categoryName}</button>
                            </Card.Body>
                        </Card>  
                    )
                })}
                
            </div>
        </>
    );
}