import React, { useRef, useEffect } from 'react';
import { PDFExport } from '@progress/kendo-react-pdf';
import {Row,Col} from 'reactstrap';
import TransactionReport from './PeriodicTransactionReport';



const Invoice = ({ info, setShow,amount }) => {
    const pdfExportComponent = useRef(null);

    const handleExportPDF = () => {
        pdfExportComponent.current.save();
    };

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date().toLocaleDateString('en-US', options);

    const formatDate=(date)=>{
        return new Date(date).toLocaleDateString('en-US', options)
    }
    useEffect(() => {
        handleExportPDF();
        setShow();
    }, []);

    return (
        <div>
            <PDFExport ref={pdfExportComponent} paperSize="A2">
                <div style={{ textAlign: 'left',backgroundColor:"#105D9B"}}>
                    {/* Logo */}
                    {/* <img src={require("../assets/img/UmusambiLogo.jpg")} alt="Logo" style={{ width: '100px', height: '100px' }} /> */}
                    <div style={{ color:"white",margin: '40px'}}>
                        <Row>
                            <Col>
                        <h1 style={{color:"white", margin: '0', padding: '10px 0' }}>
                            <em>SEED DISTRIBUTION MANAGEMENT SYSTEM</em>
                        </h1>
                        </Col>
                        <Col>
                        <p style={{ margin: '0', fontSize: '14px' }}>Kigali, Rwanda</p>
                        <p style={{ margin: '0', fontSize: '14px' }}>Kabuga, Gasabo</p>
                       </Col> 
                        </Row>
                    </div>
                    <hr />
                    <div style={{ color:"white", textAlign: 'left', margin: '20px' }}>
                    <h2>RAB STOCK MANAGER INVOICE</h2>
                    <hr />
                    </div>
                </div>
                <div style={{ textAlign: 'center', margin: '20px' }}>
                <h3>INVOICE REPORT</h3>
                </div>
                <div style={{ margin: '40px' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ backgroundColor: 'green',color:"white" }}>
                                <th style={{ padding: '10px', textAlign: 'left' }}>AGRODEALER FIRSTNAME</th>
                                <th style={{ padding: '10px', textAlign: 'left' }}>AGRODEALER LASTNAME</th>
                                <th style={{ padding: '10px', textAlign: 'left' }}>SEED NAME</th>
                                <th style={{ padding: '10px', textAlign: 'left' }}>AMOUNT</th>
                            

                            </tr>
                        </thead>
                        <tbody>
                                <tr>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{info.owner.firstname}</td>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{info.owner.lastname}</td>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{info.seed.seedname}</td>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{amount.amount}</td>
                                    
                                    
                                </tr>
                        </tbody>
                    </table>
                </div>
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <p>Kigali, Rwanda Done on</p><br/> {formattedDate}
 </div>
            </PDFExport>
        </div>
    );
};

export default Invoice;
