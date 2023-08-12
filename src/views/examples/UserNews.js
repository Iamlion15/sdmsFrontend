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
import UserOperationHeader from "components/Navbars/UserOperationHeader";
import UserNewsArticle from "./UsernewsArticle";
import UserNavbar from "components/sharedNavbar/UserNavbar";

const UserNews = () => {
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
        fetch("http://localhost:8000/api/user/getnews", requestOptions)
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
        <UserNavbar/>
            <UserOperationHeader/>
            <Container className="mt--7 py-7 fill-white" fluid >
                <Row>
                    <Col xs="10">
                        {news.map((article) => {
                            return (
                                <div key={news._id}>
                                    <UserNewsArticle title={article.title} summary={article.summary} source={article.source} sentiment={article.sentiment} link={article.url} id={article._id}/>
                                </div>
                            )
                        })}
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default UserNews;