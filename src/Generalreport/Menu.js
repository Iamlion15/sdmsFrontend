import  { useState } from "react";
import {
  Card,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  TabPane,
  Col,
} from "reactstrap";
import classnames from "classnames";
import DateReview from "./DateofReview";
import AnalysisReport from "./AnalysisReport";

const ReportMenu = () => {
  const [activeTab, setActiveTab] = useState(1);

  const toggleTab = (tabIndex) => {
    if (activeTab !== tabIndex) {
      setActiveTab(tabIndex);
    }
  };

  return (
    <Col>
      {/* Menu */}
      <div className="mb-3">
        <small className="text-uppercase font-weight-bold">choose Report</small>
      </div>
      <div className="nav-wrapper">
        <Nav
          className="nav-fill flex-column flex-md-row"
          id="tabs-icons-text"
          pills
          role="tablist"
        >
          <NavItem>
            <NavLink
              aria-selected={activeTab === 1}
              className={classnames("mb-sm-3 mb-md-0", {
                active: activeTab === 1,
              })}
              onClick={() => toggleTab(1)}
              role="tab"
            >
              Review report
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              aria-selected={activeTab === 2}
              className={classnames("mb-sm-3 mb-md-0", {
                active: activeTab === 2,
              })}
              onClick={() => toggleTab(2)}
              role="tab"
            >
              Profile
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              aria-selected={activeTab === 3}
              className={classnames("mb-sm-3 mb-md-0", {
                active: activeTab === 3,
              })}
              onClick={() => toggleTab(3)}
              role="tab"
            >
              Newspaper report
            </NavLink>
          </NavItem>
        </Nav>
      </div>
      <Card className="shadow">
        <CardBody>
          {activeTab === 1 && (
            <TabPane>
              <DateReview/>
            </TabPane>
          )}
          {activeTab === 2 && (
            <TabPane>
              <AnalysisReport/>
            </TabPane>
          )}
          {activeTab === 3 && (
            <TabPane>
              <p className="description">
                Raw denim you probably haven't heard of them jean shorts Austin.
                Nesciunt tofu stumptown aliqua, retro synth master cleanse.
                Mustache cliche tempor, williamsburg carles vegan helvetica.
                Reprehenderit butcher retro keffiyeh dreamcatcher synth.
              </p>
            </TabPane>
          )}
        </CardBody>
      </Card>
    </Col>
  );
};

export default ReportMenu;
