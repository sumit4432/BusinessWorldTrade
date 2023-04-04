import React, { useState } from "react";

import { Col, Container, Row, Table } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../actions";

import "./style.css";
import { genratePublicUrl } from "../../UrlConfig";
import NewModal from "../../components/UI/Modal";
import { Input } from "../../components/UI/Input";
import Layout from "../../components/Layout";

export const Products = () => {
  const [name, setName] = useState("");
  const [qunatity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productPicture, setProdcutPicture] = useState([]);
  const [productDetailsModal, setProdctDetailsModal] = useState(false);
  const [productDetails, setProductDetaisl] = useState(null);
  const [show, setShow] = useState(false);
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const category = useSelector((state) => state.category);

  const handleClose = () => {
    const form = new FormData();
    form.append("name", name);
    form.append("quntity", qunatity);
    form.append("price", price);
    form.append("description", description);
    form.append("category", categoryId);

    for (let pic of productPicture) {
      form.append("productPicture", pic);
    }

    dispatch(addProduct(form));

    setShow(false);
  };

  const handleShow = () => setShow(true);

  // create Category List

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
      });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  const handleProductPicture = (e) => {
    setProdcutPicture([...productPicture, e.target.files[0]]);
  };
  console.log(productPicture);

  const renderProducts = () => {
    return (
      <>
        <Table responsive="sm" style={{ fontSize: 12 }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {product.products.length > 0
              ? product.products.map((product) => (
                  <tr
                    onClick={() => showProductDetailsModal(product)}
                    key={product._id}
                  >
                    <td>2</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.quntity}</td>
                    <td>{product.category.name}</td>
                  </tr>
                ))
              : null}
          </tbody>
        </Table>
      </>
    );
  };
  // add product modal
  // add product modal
  const renderAddProductModal = () => (
    <NewModal
      show={show}
      handleClose={handleClose}
      ModalTitle={"Add new Product"}
    >
      <Input
        label="Name"
        value={name}
        placeholder={`Product Name`}
        onChange={(e) => setName(e.target.value)}
      />

      <Input
        label="Quantity"
        value={qunatity}
        placeholder={`quantity Name`}
        onChange={(e) => setQuantity(e.target.value)}
      />

      <Input
        label="Price"
        value={price}
        placeholder={`Price`}
        onChange={(e) => setPrice(e.target.value)}
      />

      <Input
        label="Description"
        value={description}
        placeholder={`Description`}
        onChange={(e) => setDescription(e.target.value)}
      />

      <select
        className="form-control"
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
      >
        <option>select Category</option>
        {createCategoryList(category.categories).map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>

      {productPicture.length > 0 ? (
        <div>
          {productPicture.map((pic, index) => (
            <div key={index}>{pic.name}</div>
          ))}
        </div>
      ) : null}

      <input
        type="file"
        name="productPicture"
        onChange={handleProductPicture}
      />
    </NewModal>
  );

  // product details modal
  const showProductDetailsModal = (product) => {
    setProductDetaisl(product);
    setProdctDetailsModal(true);
  };
  const renderProductDetails = () => {
    if (!productDetails) {
      return null;
    }
    const handleCloseDetailsModal = () => {
      setProdctDetailsModal(false);
    };

    return (
      <>
        <NewModal
          show={productDetailsModal}
          handleClose={handleCloseDetailsModal}
          ModalTitle={"Add new Category"}
          size="lg"
        >
          <Row>
            <Col md={6}>
              <label className="key">Name</label>
              <p className="value">{productDetails.name}</p>
            </Col>
            <Col md={6}>
              <label className="key">price</label>
              <p className="value">{productDetails.price}</p>
            </Col>
            <Col md={6}>
              <label className="key">quantity</label>
              <p className="value">{productDetails.quntity}</p>
            </Col>

            <Col md={6}>
              <label className="key">Categories</label>
              <p className="value">{productDetails.category.name}</p>
            </Col>

            <Col md={12}>
              <label className="key">Description</label>
              <p className="value">{productDetails.description}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <label className="key">Product Picture</label>
              <div style={{ display: "flex" }}>
                {productDetails.productPicture.map((picture) => (
                  <div className="productImgCatiner">
                    <img src={genratePublicUrl(picture.img)} />
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </NewModal>
      </>
    );
  };

  return (
    <>
      <Layout sidebar>
        <Container>
          <Row>
            <Col md={12}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>Product</h3>
                <button onClick={handleShow}>Add</button>
              </div>
            </Col>
          </Row>

          <Row>
            <Col>{renderProducts()}</Col>
          </Row>
        </Container>

        {renderAddProductModal()}
        {renderProductDetails()}
      </Layout>
    </>
  );
};
