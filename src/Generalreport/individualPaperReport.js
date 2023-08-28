import { useState } from "react";
import NewspaperReport from "./newsPaperReport";
import {
    Button,
} from "reactstrap";

const IndividualPaperSentimentReport = () => {
    const [articleStats, setArticleStats] = useState([]);
    const [showPrint, setShowPrint] = useState(false);
    const toggleShowPrint = () => {
        setShowPrint(!showPrint);
    };
    const handleInvokeAnalysis = async () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': JSON.parse(localStorage.getItem("token")),
            },
        };
        try {
            const response = await fetch('http://localhost:8000/api/admin/newspaperstats', requestOptions);
            const responseData = await response.json();
            setArticleStats(responseData);
            console.log(responseData)
             toggleShowPrint()

        } catch (error) {
            console.error(error.message);
        }
    }
    return (
        <>
            <Button color="success" onClick={handleInvokeAnalysis}>
                Generate
            </Button>
            {showPrint && (
                <NewspaperReport setShow={toggleShowPrint} data={articleStats}/>
            )}
        </>
    )
}

export default IndividualPaperSentimentReport;