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
            <Card className="">
                <CardHeader className="bg-transparent">
                    <Row className="align-items-center">
                        <div className="col">
                            <h2 className="mb-0">Stock statistics </h2>
                        </div>
                    </Row>
                </CardHeader>
                <CardBody>
                    {/* Chart */}
                    <div className="chart">
                        <Bar
                            data={chartExample2.data}
                            options={chartExample2.options}
                        />
                    </div>
                </CardBody>
            </Card>
        </>
    )

}
export default Barchart;