
import "assets/css/table-font/argon-dashboard-react.min.css"
import Barchart from "./BarChart";
import Navbar from "components/sharedNavbar/Navbar";
import OperationHeader from "components/Navbars/OperationHeader";
import Footer from "components/Footers/Footer";
import Chart from "chart.js";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "../variables/charts";
import Header from "components/Navbars/Header.js";


const Indexii = (props) => {
  return (
    <>
      {/* Page content */}
      <Navbar/>
      {/* <Header /> */}
      <OperationHeader/>
      <Container className="mt--7" fluid>
        <Row>
          <Col xl="10">
            <Barchart chartExample2={chartExample2} />
          </Col>
        </Row>
      </Container>
      <Footer/>
    </>
  );
};

export default Indexii;
