
import { Row, Col, Nav, NavItem, NavLink } from "reactstrap";

const Footer = () => {
  return (
    <footer className="footer">
      <Row className="align-items-center justify-content-xl-between">
        <Col xl="6">
          <div className="copyright text-center text-xl-left text-muted">
            © {new Date().getFullYear()}{" "}
            <a
              className="font-weight-bold ml-1"
              rel="noopener noreferrer"
              target="_blank"
            >
              MANZI Kevin Maxime
            </a>
          </div>
        </Col>

        <Col xl="6">
          <Nav className="nav-footer justify-content-center justify-content-xl-end">
            <NavItem>
              <NavLink
                href="https://www.minaffet.rw"
                rel="noopener noreferrer"
                target="_blank"
              >
                MINAFFET
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                href="https://www.OGS.gov.rw"
                rel="noopener noreferrer"
                target="_blank"
              >
                OGS
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                href="http://www.twitter.com/OGS"
                rel="noopener noreferrer"
                target="_blank"
              >
                OGS Twitter
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                href=""
                rel="noopener noreferrer"
                target="_blank"
              >
                All rights reserved
              </NavLink>
            </NavItem>
          </Nav>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
