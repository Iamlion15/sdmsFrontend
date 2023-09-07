
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Alert,
  Col,
} from "reactstrap";
// core components
import Navbar from "components/sharedNavbar/Navbar";
import Footer from "components/Footers/Footer";
import OperationHeader from "components/Navbars/OperationHeader";
import UpdateModal from "./AddStockInfoModal";

const Addstock = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate()
  const [data, setData] = useState({
    seedname:"",
    detail:"",
    manudate:"",
    quantity:"",
    price:""
  })
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
    //navigate("/users")
  };
  function submitHandler(e) {
    e.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
        'x-auth-token': JSON.parse(localStorage.getItem("token"))
      },
      body: JSON.stringify(data)
    }
    fetch("http://localhost:5000/api/rab/addstock", requestOptions)
      .then((response) => {
        if (response.ok) {
          // setMessage("User updated successfully")
          toggleModal();
          
        }
        else {
          setMessage("Not able to add stock");
        }
      })
      .catch(error => {
        console.log(error.message)
        setMessage("connect your server")
      })
  }
  return (
    <>
      <Navbar/>
      <OperationHeader />
      <section className="section">
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-2 mt-0 mb-5 mb-xl-0" xl="4">
            </Col>
            <Col className="order-xl-1" xl="10">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Add stock</h3>
                    </Col>
                    <Col className="text-right" xs="4">
                      <Button
                        color="primary"
                        onClick={(e) => navigate("/rab/stock")}
                        size="sm"
                      >
                        Go back
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={submitHandler}>
                    <h6 className="heading-small text-muted mb-4">
                      Seed 
                    </h6>
                    {!(message === "") && (
                      <Alert color="danger" fade={false}>
                        <span className="alert-inner--icon">
                          <i className="ni ni-bell-55" />
                        </span>
                        <span className="alert-inner--text ml-1">
                          {message}!
                        </span>
                      </Alert>
                    )}

                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              seed name
                            </label>
                            <Input
                              style={{ color: 'black' }}
                              className="form-control-alternative"
                              id="input-seed-name"
                              placeholder="seed name"
                              type="text"
                              value={data.seedname}
                              onChange={(e) => setData({ ...data, seedname: e.target.value })}
                              required
                            />
                          </FormGroup>
                        </Col>
                        </Row>
                        <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              detail
                            </label>
                            <Input
                              style={{ color: 'black' }}
                              className="form-control-alternative"
                              id="input-detail"
                              placeholder="seed detail"
                              type="text"
                              value={data.detail}
                              onChange={(e) => setData({ ...data, detail: e.target.value })}
                              required
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Address */}
                    <h6 className="heading-small text-muted mb-4">
                      Manufactured date information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col md="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Manufactured date
                            </label>
                            <Input
                              style={{ color: 'black' }}
                              className="form-control-alternative"
                              id="input-date"
                              placeholder="manufactured date"
                              type="date"
                              value={data.manudate}
                              onChange={(e) => setData({ ...data, manudate: e.target.value })}
                              required
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-quantity"
                            >
                              Quantity
                            </label>
                            <Input
                              style={{ color: 'black' }}
                              className="form-control-alternative"
                              id="input-quantity"
                              placeholder="Quantity"
                              type="number"
                              value={data.quantity}
                              onChange={(e) => setData({ ...data, quantity: e.target.value })}
                              required
                            />
                          </FormGroup>
                        </Col>
                        </Row>
                        <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-price"
                            >
                              Price
                            </label>
                            <Input
                              style={{ color: 'black' }}
                              className="form-control-alternative"
                              id="input-price"
                              placeholder="Price"
                              type="number"
                              value={data.price}
                              onChange={(e) => setData({ ...data, price: e.target.value })}
                              required
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>

                    <Row>
                      <Col lg="6">
                        <input type="submit"
                          className="mx-2 btn btn-success btn-lg"
                          style={{ width: '300px', height: '50px' }}
                          value="Add seed to stock" />
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>

      </section>
      <Footer />
      <div>
      <UpdateModal toggleModal={toggleModal} setShowModal={setShowModal} modalState={showModal} />
      </div>
    </>
  );
}


export default Addstock;
