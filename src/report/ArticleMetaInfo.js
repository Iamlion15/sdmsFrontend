import { useState, useEffect } from "react";
import {
    Button,
    Card,
    CardHeader,
    Progress,
    Table,
    Row,
    Col,
} from "reactstrap";



const ArticleMetaInfo = () => {
    const [data, setData] = useState([]);
    const [message, setMessage] = useState('');
    const [chunkedData, setChunkedData] = useState([]);
    const [chunkIndex, setChunkIndex] = useState(0);
    const chunkSize = 5;
    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'content-Type': 'application/json',
                'x-auth-token': JSON.parse(localStorage.getItem("token"))
            },
        }
        fetch("http://localhost:8000/api/admin/newspaperstats", requestOptions)
            .then((response) => {
                if (!response.ok) {

                    setMessage("PLEASE RETRY")
                }
                return response.json();
            })
            .then(value => {
                console.log(value)
                setData(value);
            })
            .catch(error => {
                console.log(error.message)
                setMessage("connect your server")
            })
    }, []);
    useEffect(() => {
        setChunkedData(chunkArray(data, chunkSize));
        setChunkIndex(0);
    }, [data]);

    const chunkArray = (array, chunkSize) => {
        const chunkedArray = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            const chunk = array.slice(i, i + chunkSize);
            chunkedArray.push(chunk);
        }
        return chunkedArray;
    };

    const handleNextClick = () => {
        if (chunkedData.length > 0 && chunkIndex < chunkedData.length - 1) {
            setChunkIndex(chunkIndex + 1);
        }
    };

    const handlePreviousClick = () => {
        if (chunkedData.length > 0 && chunkIndex > 0) {
            setChunkIndex(chunkIndex - 1);
        }
    };

    return (
        <>
            <Card className="shadow">
                <CardHeader className="border-0">
                    {/* ... card header content ... */}
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">Article</th>
                            <th scope="col">Total Articles</th>
                            <th scope="col">Positive</th>
                            <th scope="col">Negative</th>
                            <th scope="col">Overall Sentiment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {chunkedData.length > 0 && chunkedData[chunkIndex].map((news) => (
                            <tr key={news.Newspaper}>
                                <th scope="row">{news.Newspaper}</th>
                                <td>{news.Totalarticles}</td>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <span className="mr-2">{news.PositiveSentiment}%</span>
                                        <div>
                                            <Progress
                                                max="100"
                                                value={news.PositiveSentiment}
                                                barClassName="bg-gradient-success"
                                            />
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <span className="mr-2">{news.NegativeSentiment}%</span>
                                        <div>
                                            <Progress
                                                max="100"
                                                value={news.NegativeSentiment}
                                                barClassName="bg-gradient-danger"
                                            />
                                        </div>
                                    </div>
                                </td>
                                <td>{news.overallSentiment}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card>
            <Row className="mt-3">
                <Col>
                    <Button
                        color="success"
                        onClick={handlePreviousClick}
                        disabled={chunkIndex === 0 || chunkedData.length === 0}
                    >
                        Previous
                    </Button>
                </Col>
                <Col className="text-right">
                    <Button
                        color="success"
                        onClick={handleNextClick}
                        disabled={chunkIndex === chunkedData.length - 1 || chunkedData.length === 0}
                    >
                        Next
                    </Button>
                </Col>
            </Row>
        </>
    );
};

export default ArticleMetaInfo;