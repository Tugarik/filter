import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

export default function AddProduct() {
    const [validated, setValidated] = useState(false);
    const [categories, setCategories] = useState();
    const [brands, setBrands] = useState();

    useEffect(() => {
        try {
            axios
            .get(
                `http://localhost:5000/products/categories`
            )
            .then((res) => setCategories(res.data));
        } catch (error) {
            console.log(error.message);
        }
        }, [setCategories]);
    
    useEffect(() => {
        try {
            axios
            .get(
                `http://localhost:5000/products/brands`
            )
            .then((res) => setBrands(res.data));
        } catch (error) {
            console.log(error.message);
        }
        }, [setBrands]);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            console.log('need more info')
        } else {

            console.log('submited');
        }
        setValidated(true);
    
        };

    return (
        <div>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="m-5">
                    <Form.Group as={Col} md="6" controlId="validationCustom01">
                    
                    <Form.Control
                        required
                        type="text"
                        placeholder="Product name"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="validationCustom02">
                    
                    <Form.Control
                        required
                        type="text"
                        placeholder="Price"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>   
                </Row>
                <Row className="m-5">
                    <Form.Group as={Col} md="12" controlId="validationCustom03">
                    
                    <Form.Control type="text" placeholder="Image url" required />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid url.
                    </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                
                <Row className="m-5">
                    <Form.Group as={Col} md="6" controlId="validationCustom04">
                        <Form.Select aria-label="Select category" >
                            <option value="">Category select</option>
                            {categories && categories.map((category, index)=>(
                                <option value={category.categoryName} key={index}>{category.categoryName}</option>
                                ))}

                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            Please choose a category.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="validationCustom05">
                        <Form.Select aria-label="Default select example">
                            <option>Brand select</option>
                            {brands && brands.map((brand, index)=>(
                                <option value={brand.brandName} key={index}>{brand.brandName}</option>
                                ))}

                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            Please choose a brand.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
            
                <Button type="submit">+ Add product</Button>

            </Form>
            
            <hr/>

            <Row className="m-5">

                <Form.Group as={Col} md="6" controlId="validationCustom06">
                
                <Form.Control
                    required
                    type="text"
                    placeholder="Add Category Name"
                    className="mb-5"
                    
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Button type="button">+ Add category</Button>
                </Form.Group>   

                <Form.Group as={Col} md="6" controlId="validationCustom07">
                
                <Form.Control
                    required
                    type="text"
                    placeholder="Add Brand Name"
                    className="mb-5"
                    
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Button type="button">+ Add Brand</Button>
                </Form.Group>   
            </Row>

            
            
        </div>
    );
}