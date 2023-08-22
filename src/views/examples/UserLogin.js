
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  Alert
} from "reactstrap";
// core components

const UserLogin = () => {
  const [data, setData] = useState({
    nid: "",
    password: ""
  });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false)
  const timeoutRef = useRef(null);
  const [visible, setVisible] = useState(false)
  const closeAlert = () => {
    setVisible(false);
  }
  const showAlert = () => {
    setVisible(true);
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(closeAlert, 2000);
  }
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  function loginHandler(e) {
    e.preventDefault();
    const methodOptions = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/JSON",
      },
    };
    fetch("http://localhost:8000/api/user/login", methodOptions)
      .then((response) => {
        if (!response.ok) {
          if (response.status == 401) {
            console.log("INVALID EMAIL OR PASSWORD");
            setMsg("INVALID EMAIL OR PASSWORD")
            showAlert();
          }
          else {
            if (response.status == 403) {
              toggleModal();
            }
          }
        }
        else {
          if (response.ok) {
            return response.json();
          }
        }
      })
      .then((value) => {
        if (value.message == "200") {
          localStorage.setItem("token", JSON.stringify(value.token))
          localStorage.setItem("nid",data.nid)
          console.log(localStorage.getItem("token"))
          if (value.hasOwnProperty("token")) {
            navigate("/user/news")
          }
          else {
            setMsg("incorrect password or email")
          }
        }
      })
      .catch((error) => {
        setMsg("unexpected error occured");
        console.log(error);
      });
  }
  return (
    <>
      {/* Page content */}
      <section className="section section-shaped section-lg">
        <div className="shape shape-style-1 bg-gradient-default">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <Container className="pt-lg-7">
          <Row className="justify-content-center">
            <Col lg="5">
              <Card className="bg-secondary shadow border-0">
                <CardHeader className="bg-white pb-5">
                  <div className="text-muted text-center mb-3">
                    <small>Sign in with</small>
                  </div>
                  <div className="btn-wrapper text-center">
                    <Button
                      className="btn-neutral btn-icon"
                      color="default"
                      onClick={() => navigate("/")}
                    >
                      <span className="btn-inner--icon mr-1">
                        <img
                          alt="..."
                          src={
                            require("assets/img/icons/common/github.svg")
                              .default
                          }
                        />
                      </span>
                      <span className="btn-inner--text">Admin</span>
                    </Button>
                    <Button
                      className="btn-neutral btn-icon ml-1"
                      color="default"
                      onClick={() => navigate("/user/login")}
                    >
                      <span className="btn-inner--icon mr-1">
                        <img
                          alt="..."
                          src={
                            require("assets/img/icons/common/google.svg")
                              .default
                          }
                        />
                      </span>
                      <span className="btn-inner--text">OGS personnel</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardBody className="px-lg-5 py-lg-5">
                  <div className="text-center text-muted mb-4">
                    <small>Or sign in with credentials</small>
                  </div>

                  {msg && visible && (
                    <Alert color="danger" fade={true} isOpen={visible}>
                      <span className="alert-inner--icon">
                        <i className="ni ni-bell-55" />
                      </span>
                      <span className="alert-inner--text ml-1">
                        EMAIL OR ID NUMBER HAS BEEN ALREADY USED!
                      </span>
                    </Alert>
                  )}
                  <Form role="form" onSubmit={loginHandler}>
                    <FormGroup className="mb-3">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-email-83" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="NATIONAL IDENTITY" type="text"
                          onChange={(e) => setData({ ...data, nid: e.target.value })}
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Password"
                          type="password"
                          autoComplete="off"
                          onChange={(e) => setData({ ...data, password: e.target.value })}
                        />
                      </InputGroup>
                    </FormGroup>
                    <div className="custom-control custom-control-alternative custom-checkbox">
                      <input
                        className="custom-control-input"
                        id=" customCheckLogin"
                        type="checkbox"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor=" customCheckLogin"
                      >
                        <span>Remember me</span>
                      </label>
                    </div>
                    <div className="text-center">
                      <input type="submit"
                        className="my-4 btn btn-success"
                        color="primary"
                        value="sign in" />
                    </div>
                  </Form>
                </CardBody>
              </Card>
              <Row className="mt-3">
                <Col xs="6">
                  <a
                    className="text-light"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    
                  </a>
                </Col>
                <Col className="text-right" xs="6">
                  <a
                    className="text-light"
                    onClick={() =>navigate("/user/register-page")}
                  >
                    <small>Create new account</small>
                  </a>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
      <div>
        <LoginModal setShowModal={setShowModal} toggleModal={toggleModal} modalState={showModal} />
      </div>
    </>
  );
};

export default UserLogin;
