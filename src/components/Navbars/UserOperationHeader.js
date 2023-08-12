import {
    Card,
    CardBody,
    Container,
    Col,
    Row,
} from "reactstrap"

import { useNavigate } from "react-router-dom";

const UserOperationHeader = () => {
    const navigate=useNavigate()
    return (
        <div className="header bg-gradient-beach pb-8 pt-5 pt-md-8">
                <Container>
                    <Row className="row-grid align-items-center">
                        <Col className="order-lg-1" lg="12">
                            <div className="d-flex px-3">
                                <div>
                                    <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-primary">
                                        <i className="ni ni-building text-primary" />
                                    </div>
                                </div>
                                <div className="pl-4">
                                    <h4 className="display-3 text-white">Electronic Journal Sentiment Analysis</h4>
                                </div>
                            </div>
                            <Row>
                                <Col lg="6" xl="4">
                                    <Card className="shadow shadow-lg--hover mt-5">
                                        <CardBody>
                                            <div className="d-flex px-3">
                                                <div>
                                                    <div className="icon icon-shape bg-gradient-success rounded-circle text-white">
                                                        <i className="ni ni-satisfied" />
                                                    </div>
                                                </div>
                                                <div className="pl-4">
                                                    <h5 className="title text-success">
                                                        Number of reviews submitted
                                                    </h5>
                                                    <p>
                                                        8 users
                                                    </p>
                                                    <h5 className="title text-success">
                                                        pending Users
                                                    </h5>
                                                    <p>
                                                        5 users
                                                    </p>

                                                    <a
                                                        className="text-success"
                                                        onClick={() => navigate("privileges")}
                                                    >
                                                        Learn more
                                                    </a>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col lg="6" xl="4">
                                    <Card className="shadow shadow-lg--hover mt-5">
                                        <CardBody>
                                            <div className="d-flex px-3">
                                                <div>
                                                    <div className="icon icon-shape bg-gradient-success rounded-circle text-white">
                                                        <i className="ni ni-satisfied" />
                                                    </div>
                                                </div>
                                                <div className="pl-4">
                                                    <h5 className="title text-success">
                                                        Total number of reviews by other members
                                                    </h5>
                                                    <p>
                                                        10 reviews
                                                    </p>
                                                    <h5 className="title text-success">
                                                        Reviews per number of articles
                                                    </h5>
                                                    <p>
                                                        5 reviews
                                                    </p>
                                                    <a
                                                        className="text-success"
                                                        href="#pablo"
                                                        onClick={()=>navigate("news")}
                                                    >
                                                        Learn more
                                                    </a>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col lg="6" xl="4">
                                    <Card className="shadow shadow-lg--hover mt-5">
                                        <CardBody>
                                            <div className="d-flex px-3">
                                                <div>
                                                    <div className="icon icon-shape bg-gradient-success rounded-circle text-white">
                                                        <i className="ni ni-satisfied" />
                                                    </div>
                                                </div>
                                                <div className="pl-4">
                                                    <h5 className="title text-success">
                                                        Articles
                                                    </h5>
                                                    <p>
                                                        from different sources
                                                    </p>
                                                    <h5 className="title text-success">
                                                        total number of articles
                                                    </h5>
                                                    <p>
                                                        25 articles
                                                    </p>
                                                    <a
                                                        className="text-success"
                                                        onClick={() => navigate("dashboard")}
                                                    >
                                                        Learn more
                                                    </a>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
                {/* SVG separator */}
                <div className="separator separator-bottom separator-skew zindex-100">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="none"
                        version="1.1"
                        viewBox="0 0 2560 100"
                        x="0"
                        y="0"
                    >
                        <polygon
                            className="fill-white"
                            points="2560 0 2560 100 0 100"
                        />
                    </svg>
                </div>
        </div>
    )
}
export default UserOperationHeader;