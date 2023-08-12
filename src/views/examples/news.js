import "assets/css/table-font/argon-dashboard-react.min.css"

import {
    Badge,
    Card,
    CardHeader,
    CardFooter,
    Container,
    Row,
    Col,
    Button,
} from "reactstrap";
// core components
import { useState, useEffect } from "react";
import Header from "components/Navbars/Header";
import NewsArticle from "./newsArticle";
import Footer from "components/Footers/Footer";
import OperationHeader from "components/Navbars/OperationHeader";
import AdminNavbar from "components/sharedNavbar/Navbar";

const News = () => {
    const [news, setNews] = useState([])
    const [message, setMessage] = useState('');
    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'content-Type': 'application/json',
                'x-auth-token': JSON.parse(localStorage.getItem("token"))
            },
        }
        fetch("http://localhost:8000/api/admin/getnews", requestOptions)
            .then((response) => {
                if (!response.ok) {

                    setMessage("PLEASE RETRY")
                }
                return response.json();
            })
            .then(data => {
                setNews(data);
            })
            .catch(error => {
                console.log(error.message)
                setMessage("connect your server")
            })
    });

    return (
        <>
            <AdminNavbar/>
            <OperationHeader />
            <Container className="mt--7 py-0 fill-white" fluid >
                <Row>
                    <Col xs="10">
                        {news.map((article) => {
                            return (
                                <div key={article._id}>
                                    <NewsArticle title={article.title} summary={article.summary} source={article.source} sentiment={article.sentiment} link={article.url} id={article._id} />
                                </div>
                            )
                        })}
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    )
}

export default News;