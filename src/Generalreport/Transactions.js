import { useState } from "react";
import PdfTransactions from "./TransactionReport";
import {
    Button,
} from "reactstrap";

const Transactions = () => {
    const [trans, setTrans] = useState([]);
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
            const response = await fetch('http://localhost:5000/api/rab/gettrans', requestOptions);
            const responseData = await response.json();
            setTrans(responseData);
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
                <PdfTransactions setShow={toggleShowPrint} info={trans}/>
            )}
        </>
    )
}

export default Transactions;