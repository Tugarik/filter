import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

export default function AddProduct() {
  const [validated, setValidated] = useState(false);
  const [categories, setCategories] = useState();
  const [brands, setBrands] = useState();
  const [newBrand, setNewBrand] = useState();
  const [newCategory, setNewCategory] = useState();
  const [toggle, setToggle] = useState(true);

  const sendNewCategory = (newCategory) => {
    console.log(newCategory);
    setToggle(!toggle);
    try {
      axios
        .post(`http://localhost:5000/products/category?param=${newCategory}`)
        .then((res) => setCategories(res.data));
    } catch (error) {
      console.log(error.message);
    }
  };

  const sendNewBrand = (newBrand) => {
    console.log(newBrand);

    try {
      axios
        .post(`http://localhost:5000/products/brand?param=${newBrand}`)
        .then((res) => setToggle(!toggle));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    try {
      axios
        .get(`http://localhost:5000/products/categories`)
        .then((res) => setCategories(res.data));
    } catch (error) {
      console.log(error.message);
    }
  }, [setCategories, setToggle]);

  useEffect(() => {
    try {
      axios
        .get(`http://localhost:5000/products/brands`)
        .then((res) => setBrands(res.data));
    } catch (error) {
      console.log(error.message);
    }
  }, [setBrands, toggle]);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      console.log("need more info");
    } else {
      console.log("submited");
    }
    setValidated(true);
  };

  return (
    <div>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="m-5">
          <Form.Group
            as={Col}
            md="6"
            controlId="validationCustom01"
            className="mt-5"
          >
            <Form.Control required type="text" placeholder="Product name" />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            as={Col}
            md="6"
            controlId="validationCustom02"
            className="mt-5"
          >
            <Form.Control required type="text" placeholder="Price" />
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
          <Form.Group
            as={Col}
            md="6"
            controlId="validationCustom04"
            className="mt-5"
          >
            <Form.Select aria-label="Select category">
              <option value="">Category select</option>
              {categories &&
                categories.map((category, index) => (
                  <option value={category.categoryName} key={index}>
                    {category.categoryName}
                  </option>
                ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please choose a category.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            as={Col}
            md="6"
            controlId="validationCustom05"
            className="mt-5"
          >
            <Form.Select aria-label="Default select example">
              <option>Brand select</option>
              {brands &&
                brands.map((brand, index) => (
                  <option value={brand.brandName} key={index}>
                    {brand.brandName}
                  </option>
                ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please choose a brand.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Button type="submit">+ Add product</Button>
      </Form>
      <hr />

      <Row className="m-5">
        <Form.Group as={Col} md="6">
          <Form.Control
            type="text"
            placeholder="Add Category Name"
            className="mt-5"
            name="addCategory"
            onChange={(e) => setNewCategory(e.target.value)}
          />

          <Button
            type="button"
            className="mt-3"
            onClick={(e) => {
              e.preventDefault();
              sendNewCategory(newCategory);
            }}
          >
            + Add category
          </Button>
        </Form.Group>

        <Form.Group as={Col} md="6">
          <Form.Control
            type="text"
            placeholder="Add Brand Name"
            className="mt-5"
            name="addBrand"
            onChange={(e) => setNewBrand(e.target.value)}
          />

          <Button
            type="button"
            className="mt-3"
            onClick={(e) => {
              e.preventDefault();
              sendNewBrand(newBrand);
            }}
          >
            + Add Brand
          </Button>
        </Form.Group>
      </Row>
    </div>
  );
}
