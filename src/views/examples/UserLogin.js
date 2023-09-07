
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
// reactstrap components
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Alert
} from "reactstrap";
// core components

const UserLogin = () => {
  const [data, setData] = useState({
    nid: "",
    password: ""
  });
  const [msg, setMsg] = useState("");
  const [role, setRole] = useState("")
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
    let url;
    console.log(role)
    if (role === "RAB") {
      url = "http://localhost:5000/api/rab/login"
    }
    else {
      if (role === "agro dealer") {
        url = "http://localhost:5000/api/agro/login"
      }
    }
    
    fetch(url, methodOptions)
      .then((response) => {
        if (!response.ok) {
          console.log("INVALID EMAIL OR PASSWORD");
          setMsg("INVALID EMAIL OR PASSWORD")
          showAlert();
        }
        else {
          if (response.ok) {
            return response.json();
          }
        }
      })
      .then((value) => {
        console.log(value)
        if (value.hasOwnProperty("token")) {
          localStorage.setItem("token", JSON.stringify(value.token))
          if(role=="agro dealer")
          {
            navigate("/agro/requestseed")
          }
          else{
            if(role=="RAB")
            {
              navigate("/rab/stock")
            }
          }
            
          }
          else {
            setMsg("Incorrect password or email")
          }
      })
      .catch((error) => {
        setMsg("unexpected error occured");
        console.log(error);
      });
  }
  return (
    <>
      <Row>
        <Col>
          <section className="section section-lg bg-gradient-beach">
            <Container className="pt-lg pb-300">
              <Row className="text-center justify-content-center">
                <Col lg="10">
                  <h1 className="display-3 text-white">SEED DISTRIBUTION MANAGEMENT SYSTEM</h1>
                  <p className="lead text-white">
                    """
                  </p>
                </Col>
              </Row>
            </Container>
          </section>
        </Col>
        <Col>
          <Container className="pt-lg-7">
            <Row className="justify-content-center">
              <Col>
                <Card className="bg-secondary shadow border-0">
                  <CardBody className="px-lg-5 py-lg-5">
                    <div className="text-center text-muted mb-4">
                      <h3 className="display-5">Login</h3>
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
                          <Input placeholder="email"
                            type="text"
                            onChange={(e) => setData({ ...data, email: e.target.value })}
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <label htmlFor="role">Who are you?</label>
                        <select
                          id="password"
                          className="form-control"
                          onChange={(e) => setRole(e.target.value)}
                        >
                          <option value="" disabled selected>choose</option>
                          <option value="agro dealer">Agro dealer</option>
                          <option value="RAB">RAB</option>
                        </select>
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
              </Col>
            </Row>
            <Row>
              <Col className="text-right" xs="6">
                <a
                  className="text-light"
                  onClick={() => navigate("/user/register-page")}
                >
                  <small>Create new account</small>
                </a>
              </Col>
            </Row>
          </Container >
        </Col>
      </Row >
    </>
  );
};

export default UserLogin;
