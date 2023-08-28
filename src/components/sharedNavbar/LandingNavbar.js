
import { Link, useNavigate } from "react-router-dom";
// reactstrap components
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  Button
} from "reactstrap";

const LandingNavbar = () => {
  const navigate=useNavigate();
  const login=()=>{
    navigate("/")
  }
  return (
    <>
      <div className="bg-gradient-beach">
        <Navbar className="navbar-top navbar-horizontal navbar-dark" expand="md">
          <Container className="px-4">
            <NavbarBrand tag={Link}>
              <h4 style={{color:"whitesmoke",}}>Electronic Journal sentiment analysis</h4>
            </NavbarBrand>
            <button className="navbar-toggler" id="navbar-collapse-main">
              <span className="navbar-toggler-icon" />
            </button>
            <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
              <div className="navbar-collapse-header d-md-none">
                <Row>
                  <Col className="collapse-brand" xs="6">
                    <Link>
                    <h4 style={{color:"Black",}}>E-J sentiment Analysis</h4>
                    </Link>
                  </Col>
                  <Col className="collapse-close" xs="6">
                    <button className="navbar-toggler" id="navbar-collapse-main">
                      <span />
                      <span />
                    </button>
                  </Col>
                </Row>
              </div>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink className="nav-link-icon" href="#feature">
                    <i className="ni ni-planet" />
                    <span className="nav-link-inner--text">features</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="nav-link-icon"
                    href="#home"
                  >
                    <i className="ni ni-circle-08" />
                    <span className="nav-link-inner--text">Home</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                <Button
                      color="danger"
                      onClick={login}
                      size="md"
                      
                    >
                      SIGN IN
                    </Button>
                </NavItem>
              </Nav>
            </UncontrolledCollapse>
          </Container>
        </Navbar>
      </div>
    </>
  );
};

export default LandingNavbar;
