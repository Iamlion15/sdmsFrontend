
import "assets/css/table-font/argon-dashboard-react.min.css"
import LineChart from "./LineChart";
import { useState } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import Barchart from "./BarChart";
import ArticleContribution from "./ArticleContribution";
import ArticleMetaInfo from "./ArticleMetaInfo";
import Navbar from "components/sharedNavbar/Navbar";
import OperationHeader from "components/Navbars/OperationHeader";
import Footer from "components/Footers/Footer";
// reactstrap components
import {
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

const UserCharts = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };
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

export default UserCharts;
