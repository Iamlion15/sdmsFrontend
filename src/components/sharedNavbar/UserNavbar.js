
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

const AgroNavbar = () => {
  const navigate=useNavigate();
  const logout=()=>{
    localStorage.removeItem("token");
    navigate("/")
  }
  return (
    <>
      <div className="bg-gradient-beach">
        <Navbar className="navbar-top navbar-horizontal navbar-dark" expand="md">
          <Container className="px-4">
            <NavbarBrand to="/" tag={Link}>
              <h4 style={{color:"whitesmoke",}}>Seed Distribution Management System</h4>
            </NavbarBrand>
            <button className="navbar-toggler" id="navbar-collapse-main">
              <span className="navbar-toggler-icon" />
            </button>
            <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
              <div className="navbar-collapse-header d-md-none">
                <Row>
                  <Col className="collapse-brand" xs="6">
                    <Link to="/admin/dashboard">
                    <h4 style={{color:"Black",}}>SDMS</h4>
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
                  <NavLink className="nav-link-icon" to="/agro/requestseed" tag={Link}>
                    <i className="ni ni-planet" />
                    <span className="nav-link-inner--text">request stock</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="nav-link-icon"
                    to="/agro/mystock"
                    tag={Link}
                  >
                    <i className="ni ni-circle-08" />
                    <span className="nav-link-inner--text">My stock</span>
                  </NavLink>
                </NavItem>
                <NavItem className="pt-2">
                <Button
                      color="primary"
                      onClick={logout}
                      size="sm"
                      
                    >
                      logout
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

export default AgroNavbar;
