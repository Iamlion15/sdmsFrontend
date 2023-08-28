import React from 'react';
import { Row, Col,Button } from 'reactstrap';
import '../../assets/css/LandingPage.css';
import LandingNavbar from 'components/sharedNavbar/LandingNavbar';
import Footer from 'components/Footers/Footer';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate=useNavigate();
  return (
    <div className="landing-page">
    <LandingNavbar/>
      <div className="hero-section" id="home">
        <div className="hero-image">
          <div className="dark-overlay">
            <Row>
              <Col md="6" className="hero-text">
                <p>Stay informed about the sentiment of the news regading Rwanda.</p>
                <Button color="primary" size="lg"   onClick={() => navigate("/user/login")}>Get Started</Button>
              </Col>
            </Row>
          </div>
        </div>
      </div>

      <Row className="feature-section" id="feature">
        <Col md="3" className="feature">
          <h2>Real-time Sentiment Analysis</h2>
          <p>
            Our system performs sentiment analysis on news articles related to Rwanda, providing valuable insights into public opinion.
          </p>
        </Col>
        <Col md="3" className="feature">
          <h2>Comprehensive Statistical Analysis</h2>
          <p>
            We offer detailed statistical analysis, complete with charts and visualizations, giving you a clear understanding of sentiment trends regarding newspapers.
          </p>
        </Col>
        <Col md="3" className="feature">
          <h2>Automated Report Generation</h2>
          <p>
            Generate automated sentiment reports based on the analyzed data, making it easy to share insights with reviewers and how they perform.
          </p>
        </Col>
        <Col md="3" className="feature">
          <h2>Efficient Review Process</h2>
          <p>
            Permit authorized reviewers,in the office of government spokespersons, to review news articles.
          </p>
        </Col>
      </Row>
    <Footer/>
    </div>
  );
};

export default LandingPage;
