import { useState } from "react";
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
import TransactionReport from "./PeriodicTransactionReport";
import Transactions from "./Transactions";

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
              period transaction report
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
              transaction
            </NavLink>
          </NavItem>
        </Nav>
      </div>
      <Card className="shadow">
        <CardBody>
          {activeTab === 1 && (
            <TabPane>
              <TransactionReport />
            </TabPane>
          )}
          {activeTab === 2 && (
            <TabPane>
              <Transactions />
            </TabPane>
          )}
         
        </CardBody>
      </Card>
    </Col>
  );
};

export default ReportMenu;
