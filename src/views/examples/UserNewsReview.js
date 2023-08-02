

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Badge,
  Container,
  Row,
  Col,
  Alert
} from "reactstrap";
// core components
import UserHeader from "components/Navbars/UserHeader.js";
import Review from "./review";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import UserReviewModal from "./UserReviewModal";
import UserModifyComments from "./userModifyComment";

const UserNewsReview = () => {
  const [reviews, setReviews] = useState([])
  const [showAddReview, setShowAddReview] = useState(false)
  const [newsData, SetNewsData] = useState({
    title: "",
    summary: "",
    source: "",
    sentiment: "",
    link: ""
  });
  const [totalComments, setTotalComments] = useState();
  const [message, setMessage] = useState('');
  const [msg, setMsg] = useState("");
  const [userComment, setUserComments] = useState([]);
  const timeoutRef = useRef(null);
  const [showPersonalReview, setShowPersonalReview] = useState(false)
  const [visible, setVisible] = useState(false)
  const closeAlert = () => {
    setVisible(false);
  }
  const showAlert = () => {
    setVisible(true);
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(closeAlert, 2000);
  }
  const toggleAddReview = () => {
    setShowAddReview(!showAddReview);
  };
  const togglePersonalReview = () => {
    setShowPersonalReview(!showPersonalReview);
  };
  const { id } = useParams();
  const url = "http://localhost:8000/api/user/getreviews/" + id
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'content-Type': 'application/json',
        'x-auth-token': JSON.parse(localStorage.getItem("token"))
      }
    }
    fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          setMessage("PLEASE RETRY")
        }
        return response.json();
      })
      .then(data => {
        setReviews(data)
        setTotalComments(data.length)
        SetNewsData({
          title: data[0].news.title,
          summary: data[0].news.summary,
          source: data[0].news.source,
          sentiment: data[0].news.setniment,
          link: data[0].news.url
        })
      })
      .catch(error => {
        console.log(error)
        setMessage("connect your server")
      })
  }, [msg]);


  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 order-xs-1 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <CardHeader>
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center">
                      <div >
                        <span className="heading display-1">TOTAL NUMBER OF COMMENTS</span>
                        <span style={{ color: "black" }}>{totalComments}</span>
                      </div>
                    </div>
                    <div className="d-flex justify-content-center">
                      <div >
                        <Button
                          color="primary"
                          onClick={() => togglePersonalReview()}
                          size="sm"
                        >
                          Your reviews
                        </Button>
                      </div>
                    </div>
                  </div>
                </Row>
              </CardHeader>
              <CardBody style={{ overflowY: 'scroll', height: '400px' }}>
                {reviews.map((review) => {
                  return (
                    <div key={review._id}>
                      <Review names={review.user.firstname + " " + review.user.lastname} comment={review.comment} />
                    </div>
                  )
                })}

              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1 order-xs-2" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">News detail</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      onClick={() => toggleAddReview()}
                      size="sm"
                    >
                      Add Review
                    </Button>
                  </Col>
                </Row>
                {msg === "1" && visible && (
                  <div className="my-2">
                    <Alert color="success" fade={true} >
                      <span className="alert-inner--icon">
                        <i className="ni ni-bell-55" />
                      </span>
                      <span className="alert-inner--text ml-1">
                        COMMENTED SUCCESSFULLY!
                      </span>
                    </Alert>
                  </div>
                )}
                {msg === "2" && visible && (
                  <div className="my-2">
                    <Alert color="danger" fade={true} >
                      <span className="alert-inner--icon">
                        <i className="ni ni-bell-55" />
                      </span>
                      <span className="alert-inner--text ml-1">
                        CANNOT BE ABLE TO COMMENT!
                      </span>
                    </Alert>
                  </div>
                )}
              </CardHeader>
              <CardBody>
                <h2 className="text-uppercase">
                  <span>{newsData.title}</span>
                </h2>
                <hr className="my-4" />
                <p className="description mt-3">
                  <span>{newsData.summary}</span>
                </p>
                <div>
                  <h6 className="lead muted">
                    <span>{newsData.source}</span>
                  </h6>
                </div>
                {newsData.sentiment === 'Positive' && (
                  <div className="progress-wrapper">
                    <div className="progress-danger">
                      <div className="progress-label">
                        <span>Sentiment Analysis</span>
                      </div>
                    </div>
                    <Badge className="text-uppercase bg-success my-3" pill>positive sentiment</Badge>
                  </div>
                )}
                {newsData.sentiment === 'Negative' && (
                  <div className="progress-wrapper">
                    <div className="progress-success">
                      <div className="progress-label">
                        <span>Sentiment Analysis</span>
                      </div>
                    </div>
                    <Badge className="text-uppercase bg-danger my-3" pill>negative sentiment</Badge>
                  </div>
                )}
                {newsData.sentiment === 'Neutral' && (
                  <div className="progress-wrapper">
                    <div className="progress-success">
                      <div className="progress-label">
                        <span>Sentiment Analysis</span>
                      </div>
                    </div>
                    <Badge className="text-uppercase bg-info my-3" pill>Neutral sentiment</Badge>
                  </div>
                )}
                <div>
                  <div className="icon icon-shape icon-shape-primary rounded-circle mb-4">
                    <i className="ni ni-check-bold" />
                  </div>
                  <a href={newsData.url} target="_blank" rel="noreferrer">Follow this link to go on article </a>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      {/* add review modal */}
      <div>
        <UserReviewModal setShowModal={setShowAddReview} toggleModal={toggleAddReview} modalState={showAddReview} showMessage={showAlert} setFeedback={setMsg} newsid={id} />
      </div>
      {/* user perosnal review */}
      <UserModifyComments setShowModal={setShowPersonalReview} togglePersonalReview={togglePersonalReview} modalState={showPersonalReview} Personalreviews={reviews} url={msg} />
    </>
  );
};

export default UserNewsReview;
