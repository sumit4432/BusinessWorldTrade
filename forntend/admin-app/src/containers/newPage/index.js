import React, { useEffect, useState } from "react";
// import { Col, Container, Row } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { createPage } from "../../actions/page_action";

// import linearCategoriesList from "../../helpers/linearCategories";
// import { Input } from "../../components/UI/Input";
import Layout from "../../components/Layout";
import NewModal from "../../components/UI/Modal";
import { Col, Collapse, Container, Row } from "react-bootstrap";
import { Input } from "../../components/UI/Input";
import linearCategoriesList from "../../helpers/linearCategories";
import { useSelector } from "react-redux";

const NewPage = () => {
  const [createModal, setCreateModal] = useState(false);
  const [title, setTitle] = useState("");
  const category = useSelector((state) => state.category);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);

  //use Effect

  useEffect(() => {
    console.log("useEffect PAge Category", category);
    setCategories(linearCategoriesList(category.categories));
  }, [category]);
  console.log("Page categories", categories);

  // handle Form Banners

  const handleBannersChange = (e) => {
    console.log("Banners Images", e);
  };

  // handle For Products
  const handleProductsChange = (e) => {
    console.log("Products images", e);
  };
  const renderCategoryPageModal = () => {
    return (
      <>
        <NewModal
          show={createModal}
          ModalTitle={"Create New Page"}
          handClose={() => setCreateModal(false)}
        >
          <Container>
            <Row>
              <Col>
                <select
                  className="form-control form-control-sm"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
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
              <Col>
                <Input
                  className="form-control-sm"
                  type="file"
                  value={banners}
                  onChange={handleBannersChange}
                />
              </Col>
            </Row>

            <Row>
              <Col>
                <Input
                  className="form-control-sm"
                  type="file"
                  value={products}
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
