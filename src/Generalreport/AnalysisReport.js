import { useState } from "react";
import PdfReviewReport from "./PdfReviewReport";
import {
    Button,
  } from "reactstrap";

const AnalysisReport = () => {
    const [reviewers, setReviewers] = useState({});
    const [articleStats, setArticleStats] = useState({});
    const [reviewed, setReviewed] = useState({});
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
        const urls = [
            'http://localhost:8000/api/admin/reviewerstats',
            'http://localhost:8000/api/admin/newsreviewsentimentstatus',
            'http://localhost:8000/api/admin/newsreviewstatus',
        ];
        try {
            const requests = urls.map((url) => fetch(url, requestOptions));
            const responses = await Promise.all(requests);
            const data = await Promise.all(responses.map((response) => response.json()));
            setReviewers(data[0]);
            setArticleStats(data[2])
            setReviewed(data[1])
            console.log(articleStats);
            console.log(reviewed)
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
                <PdfReviewReport setShow={toggleShowPrint} reviewers={reviewers} stats={articleStats} reviewed={reviewed} />
            )}
        </>
    )
}

export default AnalysisReport;