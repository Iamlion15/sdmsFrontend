import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import classnames from "classnames";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    NavItem,
    NavLink,
    Nav,
    Row,
    Col,
    CardFooter
} from "reactstrap";

const Barchart = ({ chartExample2 }) => {
    const [positive, setPositive] = useState([]);
    const [negative, setNegative] = useState([]);
    const [activeSentiment, setActiveSentiment] = useState("positive");
    const [activeNav, setActiveNav] = useState(1);
    const [chunkIndex, setChunkIndex] = useState(0);
    const toggleNavs = (e, index) => {
        e.preventDefault();
        setActiveNav(index);
        if (index === 1) {
            setActiveSentiment("positive");
            setChunkIndex(0)
        } else if (index === 2) {
            setActiveSentiment("negative");
            setChunkIndex(0)
        }
    };

    const handleNextClick = () => {
        const currentChunks = activeSentiment === "positive" ? chunkedPositive : chunkedNegative;

        if (chunkIndex < currentChunks.length - 1) {
            setChunkIndex(chunkIndex + 1);
        }
    };

    const handlePreviousClick = () => {
        if (chunkIndex > 0) {
            setChunkIndex(chunkIndex - 1);
        }
    };

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'content-Type': 'application/json',
                'x-auth-token': JSON.parse(localStorage.getItem("token"))
            },
        };

        fetch("http://localhost:8000/api/admin/percentagestats", requestOptions)
            .then((response) => {
                if (!response.ok) {
                    console.log("error");
                }
                return response.json();
            })
            .then(value => {
                const positiveArray = Object.entries(value.positive).map(([source, value]) => ({ source, value }));
                const NegativeArray = Object.entries(value.negative).map(([source, value]) => ({ source, value }));
                setPositive(positiveArray);
                setNegative(NegativeArray)
            })
            .catch(error => {
                console.log(error.message);
            });
    }, []);

    const chunkArray = (array, chunkSize) => {
        const chunkedArray = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            const chunk = array.slice(i, i + chunkSize);
            chunkedArray.push(chunk);
        }
        return chunkedArray;
    };

    const chunkedPositive = chunkArray(positive, 3);
    const chunkedNegative = chunkArray(negative, 3)


    const getCurrentChunk = () => {
        if (activeSentiment === "positive") {
            return chunkedPositive[chunkIndex] || [];
        } else if (activeSentiment === "negative") {
            return chunkedNegative[chunkIndex] || [];
        }
    };

    const initialiseData = (chunkIndex) => {
        const currentChunk = getCurrentChunk();

        const labels = currentChunk.map((item, index) => {
            if (index === 0) {
                return ""; // Empty label for the first item in the chunk
            }
            return item.source;
        });

        const data = currentChunk.map((item, index) => {
            if (index === 0) {
                return 0; // 0 value for the first item in the chunk
            }
            return item.value;
        });

        return {
            labels: labels,
            datasets: [
                {
                    label: "Performance",
                    data: data,
                },
            ],
        };
    };

    return (
        <>
            <Card className="shadow">
                <CardHeader className="bg-transparent">
                    <Row className="align-items-center">
                        <div className="col">
                            <h6 className="text-uppercase text-muted ls-1 mb-1">
                                Sentiment analysis
                            </h6>
                            <h2 className="mb-0">Neutral Sentiments </h2>
                        </div>
                        <div className="col">
                            <Nav className="justify-content-end" pills>
                                <NavItem>
                                    <NavLink
                                        className={classnames("py-2 px-3", {
                                            active: activeNav === 1,
                                        })}
                                        href="#pablo"
                                        onClick={(e) => toggleNavs(e, 1)}
                                    >
                                        <span className="d-none d-md-block">+Ve</span>
                                        <span className="d-md-none">+Ve</span>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={classnames("py-2 px-3", {
                                            active: activeNav === 2,
                                        })}
                                        data-toggle="tab"
                                        href="#pablo"
                                        onClick={(e) => toggleNavs(e, 2)}
                                    >
                                        <span className="d-none d-md-block">-Ve</span>
                                        <span className="d-md-none">-Ve</span>
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </div>

                    </Row>
                </CardHeader>
                <CardBody>
                    {/* Chart */}
                    <div className="chart">
                        <Bar
                            data={initialiseData(chunkIndex)}
                            options={chartExample2.options}
                        />
                    </div>
                </CardBody>
                <CardFooter className="">
                    <Row>
                        <Col>
                            <Button color="success" onClick={handlePreviousClick} disabled={chunkIndex === 0}>
                                Previous
                            </Button>
                        </Col>
                        <Col>
                            <div className="d-flex justify-content-end">
                                <Button color="success" onClick={handleNextClick} disabled={chunkIndex === getCurrentChunk().length - 1}>
                                    Next
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </CardFooter>
            </Card>
        </>
    )

}
export default Barchart;