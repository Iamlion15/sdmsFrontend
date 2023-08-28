
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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


const Login = () => {
  const [data, setData] = useState({
    username: "",
    password: ""
  });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  function loginHandler(e) {
    e.preventDefault();
    const methodOptions = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/JSON",
      },
    };
    fetch("http://localhost:8000/api/admin/login", methodOptions)
      .then((response) => {
        if (!response.ok) {
          console.log("INVALID EMAIL OR PASSWORD");
          setMsg("INVALID EMAIL OR PASSWORD")
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("token", JSON.stringify(data.token))
        console.log(localStorage.getItem("token"))
        if (data.hasOwnProperty("token")) {
          navigate("/admin/users")
        }
        else {
          setMsg("incorrect password or email")
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
                  <h1 className="display-3 text-white">ELECTRONIC JOURNAL SENTIMENT ANALYSIS</h1>
                  <p className="lead text-white">
                  "Discover the power of Electronic Journal Sentiment Analysis. 
                  Access newspapers discussing Rwanda, contribute your insights through authorized reviews,
                   and unlock comprehensive reports enriched with statistical analysis. 
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
                  <CardHeader className="bg-white pb-5">
                    <div className="text-muted text-center mb-3">
                      <small>Sign in with</small>
                    </div>
                    <div className="btn-wrapper text-center">
                      <Button
                        className="btn-neutral btn-icon"
                        color="default"
                        onClick={() => navigate("/admin/login")}
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
                    <h3 className="display-5 ">Admin login</h3>
                    </div>

                    {!(msg === "") && (
                      <Alert color="danger" fade={false}>
                        <span className="alert-inner--icon">
                          <i className="ni ni-bell-55" />
                        </span>
                        <span className="alert-inner--text ml-1">
                          {msg}!
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
                          <Input placeholder="Username" type="text"
                            onChange={(e) => setData({ ...data, username: e.target.value })}
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
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </>
  );
};

export default Login;
