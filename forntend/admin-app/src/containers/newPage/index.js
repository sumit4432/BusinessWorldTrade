import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import NewModal from "../../components/UI/Modal";
import { Col, Container, Row } from "react-bootstrap";
import { Input } from "../../components/UI/Input";
import linearCategoriesList from "../../helpers/linearCategories";
import { useDispatch, useSelector } from "react-redux";
import { createPage } from "../../actions";

const NewPage = () => {
  const [createModal, setCreateModal] = useState(false);
  const [title, setTitle] = useState("");
  const category = useSelector((state) => state.category);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);
  const [type, setType] = useState("");
  const dispatch = useDispatch();
  console.log("here is dispatch", dispatch);

  //use Effect

  useEffect(() => {
    console.log("useEffect PAge Category", category);
    setCategories(linearCategoriesList(category.categories));
  }, [category]);
  console.log("Page categories", categories);

  // onCategoryChange

  const onCategoryChange = (e) => {
    const category = categories.find(
      (category) => category.value === e.target.value
    );
    setCategoryId(e.target.value);
    setType(category ? category.type : "");
  };
  // handle Form Banners
  const handleBannersChange = (e) => {
    console.log("Banners Images", e.target.files);
    setBanners([...banners, ...e.target.files]);
  };

  // handle For Products
  const handleProductsChange = (e) => {
    console.log("Products images", e.target.files);
    setProducts([...products, ...e.target.files]);
  };

  //  submitPage Form

  const submitPageForm = (e) => {
    // e.preventDefault();

    if (title === "") {
      alert("Title is required");
      setCreateModal(false);
      return;
    }

    const form = new FormData();
    form.append("title", title);
    form.append("description", description);
    form.append("category", categoryId);
    form.append("type", type);
    banners.forEach((banner, index) => {
      form.append("banners", banner);
    });
    products.forEach((product, index) => {
      form.append("products", product);
    });
    dispatch(createPage(form));
  };

  const renderCategoryPageModal = () => {
    return (
      <>
        <NewModal
          show={createModal}
          ModalTitle={"Create New Page"}
          handleClose={submitPageForm}
          onSubmit={submitPageForm}
        >
          <Container>
            <Row>
              <Col>
                <select
                  className="form-control form-control-sm"
                  value={categoryId}
                  onChange={onCategoryChange}
                >
                  <option value="">Select Category</option>
                  {categories.map((cat, _id) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </Col>
            </Row>

            <Row>
              <Col>
                <Input
                  className="form-control-sm"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={`PageTitle`}
                />
              </Col>
            </Row>

            <Row>
              <Col>
                <Input
                  className="form-control-sm"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={`Description`}
                />
              </Col>
            </Row>

            <Row>
              {banners.length > 0
                ? banners.map((banner, index) => (
                    <Row key={index}>
                      <Col>{banner.name}</Col>
                    </Row>
                  ))
                : null}

              <Col>
                <Input
                  className="form-control-sm"
                  type="file"
                  name="banners"
                  onChange={handleBannersChange}
                />
              </Col>
            </Row>

            <Row>
              {products.length > 0
                ? products.map((product, index) => (
                    <Row key={index}>
                      <Col>{product.name}</Col>
                    </Row>
                  ))
                : null}
              <Col>
                <Input
                  className="form-control-sm"
                  type="file"
                  name="products"
                  onChange={handleProductsChange}
                />
              </Col>
            </Row>
          </Container>
        </NewModal>
      </>
    );
  };

  return (
    <>
      <Layout sidebar>
        {renderCategoryPageModal()}

        <button onClick={() => setCreateModal(true)}>Create Page</button>
      </Layout>
    </>
  );
};

export default NewPage;
