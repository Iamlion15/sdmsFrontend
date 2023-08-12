import { useState, useEffect } from "react";
import {
    Button,
    Card,
    CardHeader,

    Table,
    Row,
    Col,
} from "reactstrap";



const ArticleContribution = () => {
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
                            <th scope="col">Total contribution of articles to the database</th>
                        </tr>
                    </thead>
                    <tbody>
                        {chunkedData.length > 0 && chunkedData[chunkIndex].map((news) => (
                            <tr key={news.Newspaper}>
                                <th scope="row">{news.Newspaper}</th>
                                <td>{news.Totalarticles}</td>
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

export default ArticleContribution;