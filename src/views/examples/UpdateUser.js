/*!

=========================================================
* Argon Design System React - v1.1.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
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
import AdminNavbar from "components/sharedNavbar/Navbar";
import Footer from "components/Footers/Footer";
import OperationHeader from "components/Navbars/OperationHeader";
import UpdateModal from "./updateInfoModal";

const UpdateUser = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate()
  const { id } = useParams();
  const [user, setUser] = useState({})
  const [showUpdate, setShowUpdate] = useState(false);
  const toggleUpdate = () => {
    setShowUpdate(!showUpdate);
    navigate("/users")
  };
  const url = "http://localhost:8000/api/admin/getoneuser/" + id
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'content-Type': 'application/json',
        'x-auth-token': JSON.parse(localStorage.getItem("token"))
      }
    }
    fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          setMessage("PLEASE RETRY")
        }
        return response.json();
      })
      .then(data => {
        console.log(data)
        if (data.code === "yes") {
          setUser(data.message)

        }
      })
      .catch(error => {
        console.log(error)
        setMessage("connect your server")
      })
  }, [url]);

  function submitHandler(e) {
    e.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
        'x-auth-token': JSON.parse(localStorage.getItem("token"))
      },
      body: JSON.stringify(user)
    }
    fetch("http://localhost:8000/api/admin/modifyuser", requestOptions)
      .then((response) => {
        if (response.ok) {
          // setMessage("User updated successfully")
          toggleUpdate();
          
        }
        else {
          setMessage("Not able to update");
        }
      })
      .catch(error => {
        console.log(error.message)
        setMessage("connect your server")
      })
  }
  return (
    <>
      <AdminNavbar/>
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
                      <h3 className="mb-0">Update visitor</h3>
                    </Col>
                    <Col className="text-right" xs="4">
                      <Button
                        color="primary"
                        onClick={(e) => navigate("/visitors")}
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
                      User information
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
                              First name
                            </label>
                            <Input
                              style={{ color: 'black' }}
                              className="form-control-alternative"
                              id="input-first-name"
                              placeholder="First name"
                              type="text"
                              value={user.firstname}
                              onChange={(e) => setUser({ ...user, firstname: e.target.value })}
                              required
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Last name
                            </label>
                            <Input
                              style={{ color: 'black' }}
                              className="form-control-alternative"
                              id="input-last-name"
                              placeholder="Last name"
                              type="text"
                              value={user.lastname}
                              onChange={(e) => setUser({ ...user, lastname: e.target.value })}
                              required
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Address */}
                    <h6 className="heading-small text-muted mb-4">
                      Contact information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              NATIONAL IDENTIFICATION
                            </label>
                            <Input
                              style={{ color: 'black' }}
                              className="form-control-alternative"
                              id="input-address"
                              placeholder="Home Address"
                              type="text"
                              value={user.nID}
                              onChange={(e) => setUser({ ...user, nID: e.target.value })}
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
                              htmlFor="input-email"
                            >
                              Email address
                            </label>
                            <Input
                              style={{ color: 'black' }}
                              className="form-control-alternative"
                              id="input-email"
                              placeholder="email"
                              type="email"
                              value={user.email}
                              onChange={(e) => setUser({ ...user, email: e.target.value })}
                              required
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Phone
                            </label>
                            <Input
                              style={{ color: 'black' }}
                              className="form-control-alternative"
                              id="input-country"
                              placeholder="phone"
                              type="number"
                              value={user.phone}
                              onChange={(e) => setUser({ ...user, phone: e.target.value })}
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
                          value="Update visitor" />
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
      <UpdateModal toggleModal={toggleUpdate} setShowModal={setShowUpdate} modalState={showUpdate} />
      </div>
    </>
  );
}


export default UpdateUser;
