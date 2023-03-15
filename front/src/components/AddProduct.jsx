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
    if (!newCategory || newCategory.trim() === "") {
      console.log("need more info");
    } else {
      console.log(newCategory);
      setToggle(!toggle);
      try {
        axios
          .post(
            `http://localhost:5000/products/category?param=${newCategory.trim()}`
          )
          .then((res) => setCategories(res.data));
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const sendNewBrand = (newBrand) => {
    if (!newBrand || newBrand.trim() === "") {
      console.log("need more info");
    } else {
      console.log(newBrand);

      try {
        axios
          .post(`http://localhost:5000/products/brand?param=${newBrand.trim()}`)
          .then((res) => setToggle(!toggle));
      } catch (error) {
        console.log(error.message);
      }
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
  }, [setCategories, toggle]);

  useEffect(() => {
    try {
      axios
        .get(`http://localhost:5000/products/brands`)
        .then((res) => setBrands(res.data));
    } catch (error) {
      console.log(error.message);
    }
  }, [setBrands, toggle]);

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      console.log("need more info");
    } else {
      try {
        axios
          .post(
            `http://localhost:5000/product?
          name=${form.productName.value.trim()}&
          price=${form.productPrice.value}&
          image_url=${form.productUrl.value}&
          category=${form.selectedCategory.value}&
          brand=${form.selectedBrand.value}
          `
          )
          .then((res) => setToggle(!toggle));
      } catch (error) {
        console.log(error.message);
      }
      console.log("name: ", form.productName.value);
      console.log("price: ", form.productPrice.value);
      console.log("url: ", form.productUrl.value);
      console.log("category: ", form.selectedCategory.value);
      console.log("brand: ", form.selectedBrand.value);
      alert("Product created");
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
            <Form.Control
              required
              type="text"
              placeholder="Product name"
              name="productName"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Field is empty!
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            as={Col}
            md="6"
            controlId="validationCustom02"
            className="mt-5"
          >
            <Form.Control
              required
              type="text"
              placeholder="Price"
              name="productPrice"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Field is empty!
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="m-5">
          <Form.Group as={Col} md="12" controlId="validationCustom03">
            <Form.Control
              type="text"
              placeholder="Image url"
              required
              name="productUrl"
            />
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
            <Form.Select
              required
              type="select"
              aria-label="Select category"
              name="selectedCategory"
            >
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
            <Form.Control.Feedback>Look good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            as={Col}
            md="6"
            controlId="validationCustom05"
            className="mt-5"
          >
            <Form.Select
              required
              aria-label="Select brand"
              name="selectedBrand"
            >
              <option value="">Brand select</option>
              {brands &&
                brands.map((brand, index) => (
                  <option value={brand.brandName} key={index}>
                    {brand.brandName}
                  </option>
                ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please choose a category.
            </Form.Control.Feedback>
            <Form.Control.Feedback>Look good!</Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Button type="submit">+ Add product</Button>
      </Form>
      <hr />
      <Row className="m-5">
        <Form.Group as={Col} md="6" controlId="validationCustom06">
          <Form.Control
            required
            type="text"
            placeholder="Add Category Name"
            className="mt-5"
            name="addCategory"
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <Form.Control.Feedback>Look good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Field is empty!
          </Form.Control.Feedback>
          <Button
            type="button"
            className="mt-3"
            onClick={(e) => {
              e.preventDefault();
              sendNewCategory(newCategory);
              setToggle(!toggle);
            }}
          >
            + Add category
          </Button>
        </Form.Group>

        <Form.Group as={Col} md="6" controlId="validationCustom07">
          <Form.Control
            required
            type="text"
            placeholder="Add Brand Name"
            className="mt-5"
            name="addBrand"
            onChange={(e) => setNewBrand(e.target.value)}
          />
          <Form.Control.Feedback>Look good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Field is empty!
          </Form.Control.Feedback>
          <Button
            type="button"
            className="mt-3"
            onClick={(e) => {
              e.preventDefault();
              sendNewBrand(newBrand);
              setToggle(!toggle);
            }}
          >
            + Add Brand
          </Button>
        </Form.Group>
      </Row>
    </div>
  );
}
