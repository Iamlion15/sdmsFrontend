/*!

=========================================================
* Argon Dashboard React - v1.2.3
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

const Header = () => {
  const [users, setUser] = useState({});
  const [weeklyVisits, setWeeklyVisits] = useState({});
  const [dailyVisits, setDailyVisits] = useState({});
  const [currentweek,setCurrentweek]=useState('')
  const [previousweek,setPreviousweek]=useState('')
  useEffect(() => {
    const fetchData=async()=>{
      const urls = ["http://localhost:7000/api/admin/weeklyvisit",
      "http://localhost:7000/api/admin/dailyvisit",
      "http://localhost:7000/api/admin/weeklyuser"]
    const requestOptions = {
      method: 'GET',
      headers: {
        'content-Type': 'application/json',
        'x-auth-token': JSON.parse(localStorage.getItem("token"))
      }
    }
    const requests=urls.map((url)=>fetch(url,requestOptions));
    const responses=await Promise.all(requests)
    const data=await Promise.all(responses.map(response=>response.json()));
    setWeeklyVisits(data[0]);
    setDailyVisits(data[1]);
    setUser(data[2]);
    setCurrentweek(data[0].currentWeekEnd.slice(0,10))
    setPreviousweek(data[0].previousWeekStart.slice(0,10))
    }
    fetchData();
    
  }, [])

  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Daily visits
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {dailyVisits.TodayCount}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fa fa-chart-bar" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                    {dailyVisits.percentage < 0 && (
                        <span className="text-warning mr-2">
                      <i className="fa fa-arrow-down" /> {weeklyVisits.percentage}</span>)} 
                      {dailyVisits.percentage >= 0 && (
                        <span className="text-success mr-2">
                      <i className="fa fa-arrow-up" /> {weeklyVisits.percentage}</span>)}
                      <span className="text-nowrap">Since yesterday</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          New users
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{users.currentWeekCount}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-chart-pie" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                    {users.percentage < 0 && (
                        <span className="text-warning mr-2">
                      <i className="fas fa-arrow-down" /> {weeklyVisits.percentage}</span>)} 
                      {users.percentage >= 0 && (
                        <span className="text-success mr-2">
                      <i className="fa fa-arrow-up" /> {weeklyVisits.percentage}</span>)}
                      <span className="text-nowrap">Since last week</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          weekly visitors
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{weeklyVisits.currentWeekCount}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      {weeklyVisits.percentage < 0 && (
                        <span className="text-warning mr-2">
                      <i className="fas fa-arrow-down" /> {weeklyVisits.percentage}</span>)} 
                      {weeklyVisits.percentage >= 0 && (
                        <span className="text-success mr-2">
                      <i className="fa fa-arrow-up" /> {weeklyVisits.percentage}</span>)}  
                      <span className="text-nowrap">Since last week</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          weekly %
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{weeklyVisits.percentage}%</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fas fa-percent" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                      <span style={{color:'black'}}>from</span> {previousweek}
                      </span>{" "}
                      <span className="text-nowrap">
                      <span className="text-success mr-2">
                         <span style={{color:'black'}}>to</span> {currentweek}
                      </span>
                      </span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
