
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import RegisterModal from "./RegisterModal";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Alert,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
const Register = () => {
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    nID: "",
    password: ""
  });
  const [msg, setMsg] = useState("");
  const [showRegister, setShowRegister] = useState(false)
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
  const toggleRegister = () => {
    setShowRegister(!showRegister);
  };
  const navigate = useNavigate();
  function RegisterHandler(e) {
    e.preventDefault();
    console.log("hello")
    const methodOptions = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/JSON",
      },
    };
    fetch("http://localhost:8000/api/user/register", methodOptions)
      .then((response) => {
        if (!response.ok) {
          console.log(response);
          console.log("INVALID EMAIL OR PASSWORD");
          setMsg("INVALID CREDENTIALS")
          if (response.status == 405) {
            showAlert();
          }
        }
        else {
          if (response.ok) {
            toggleRegister();
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
                  <Form role="form" onSubmit={RegisterHandler}>
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-hat-3" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          required
                          placeholder="First Name"
                          type="text"
                          onChange={(e) => setData({ ...data, firstname: e.target.value })}
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-hat-3" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          required
                          placeholder="Last Name"
                          type="text"
                          onChange={(e) => setData({ ...data, lastname: e.target.value })}
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-email-83" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          required
                          placeholder="Email"
                          type="email"
                          onChange={(e) => setData({ ...data, email: e.target.value })}
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-phone" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          required
                          placeholder="Phone number"
                          type="number"
                          onChange={(e) => setData({ ...data, phone: e.target.value })}
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-hat-3" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          required
                          placeholder="National Identification"
                          type="number"
                          onChange={(e) => setData({ ...data, nID: e.target.value })}
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
                          required
                          placeholder="Password"
                          type="password"
                          onChange={(e) => setData({ ...data, password: e.target.value })}
                        />
                      </InputGroup>
                    </FormGroup>
                    <div className="text-center">
                      <input type="submit"
                        className="mt-4 btn btn-success"
                        color="primary"
                        value="Create account" />
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
      {/* register modal */}
      <div>
        <RegisterModal setShowModal={setShowRegister} toggleModal={toggleRegister} modalState={showRegister} />
      </div>
    </>
  );
}


export default Register;
