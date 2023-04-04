import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createPage } from "../../actions/page_action";

import linearCategoriesList from "../../helpers/linearCategories";
import NewModal from "../../components/UI/Modal";
import { Input } from "../../components/UI/Input";
import Layout from "../../components/Layout";

const NewPage = () => {
  const [createModal, setCreateModal] = useState(false);
  const [title, setTitle] = useState("");
  const category = useSelector((state) => state.category);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoriesId] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("");
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const page = useSelector((state) => state.page);

  useEffect(() => {
    console.log("Page Categories", category);
    setCategories(linearCategoriesList(category.categories));
  }, [category]);
  console.log("Categories of Page", categories);

  useEffect(() => {
    console.log("page data is useeffect", page);

    if (!page.loading) {
      setCreateModal(false);
      setTitle("");
      setCategoriesId("");
      setDesc("");
      setBanners([]);
      setProducts([]);
    }
  }, [page]);

  //*******onCategoryChange********//

  const onCategoryChange = (e) => {
    const category = categories.find(
      (category) => category._id === e.target.value
    );

    setCategoriesId(e.target.value);
    setType(category.type);
    console.log("Selected Category:", e.target.value);
  };

  const handlebannerImages = (e) => {
    console.log(e);
    setBanners([...banners, e.target.files[0]]);
  };

  const handleProductImages = (e) => {
    console.log(e);
    setProducts([...products, e.target.files[0]]);
  };

  const submitPageForm = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (title === "") {
      alert("title is required");
      setCreateModal(false);
      return;
    }

    const form = new FormData();
    form.append("title", title);
    form.append("description", desc);
    form.append("category", categoryId);
    form.append("type", type);

    banners.forEach((banner, index) => {
      form.append("banners", banner);
    });
    products.forEach((product, index) => {
      form.append("products", product);
    });

    dispatch(createPage(form));
    console.log("Form submitted:", title, desc, categoryId, banners, products);
  };

  const renderCreatePageModal = () => {
    return (
      <>
        <NewModal
          show={createModal}
          ModalTitle={"Create New page"}
          handleClose={() => setCreateModal(false)}
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
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </Col>
            </Row>

            <Row>
              <Col>
                <Input
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Page Title"
                  className="form-control-sm"
                />
              </Col>
            </Row>

            <Row>
              <Col>
                <Input
                  name="description"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Description"
                  className="form-control-sm"
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
                  className="form-control"
                  type="file"
                  name="banners"
                  onChange={handlebannerImages}
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
                  className="form-control form-control-sm"
                  type="file"
                  name="products"
                  onChange={handleProductImages}
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
        {page.loading ? (
          <p>Creating Page ...Please wait</p>
        ) : (
          <>
            {renderCreatePageModal()}
            <button onClick={() => setCreateModal(true)}>CreatePage</button>
          </>
        )}
      </Layout>
    </>
  );
};

export default NewPage;
