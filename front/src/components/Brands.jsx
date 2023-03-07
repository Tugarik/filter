import axios from "axios";
import { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDataContext } from "../context/DataContext";

export default function Brands() {
    const {data, setData} = useDataContext();
    const navigate = useNavigate();
    useEffect(() => {
        try {
          axios
            .get(
              `http://localhost:5000/products/brands`
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
                            <Card.Img variant="top" src={`${data.brandImage}`} className="cardImage"/>
                            <Card.Body>
                                <button key={index} className="menuBtn menuBtn-active" 
                                onClick={(e)=>{
                                    e.preventDefault(); 
                                    navigate(`/brand/${data.brandName}`);
                                }}>{data.brandName}</button>
                            </Card.Body>
                        </Card>  
                    )
                })}
                
            </div>
        </>
    );
}