import React, { useRef, useEffect } from 'react';
import { PDFExport } from '@progress/kendo-react-pdf';

const PdfReviews = ({ dates, data, setShow }) => {
    const pdfExportComponent = useRef(null);

    const handleExportPDF = () => {
        pdfExportComponent.current.save();
    };

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date().toLocaleDateString('en-US', options);
    useEffect(() => {
        handleExportPDF();
        setShow();
    }, []);

    return (
        <div>
            <PDFExport ref={pdfExportComponent} paperSize="A4">
            <div style={{ textAlign: 'center', margin: '20px' }}>
                    {/* Logo */}
                    <img src={require("../assets/img/theme/ogslogo.png")} alt="Logo" style={{ width: '100px', height: '100px' }} />
                    <div style={{ marginTop: '10px' }}>
                        <h1 style={{ color: 'black', margin: '0', padding: '10px 0' }}>
                            <em>ELECTRONIC JOURNAL SENTIMENT ANALYSIS</em>
                        </h1>
                        <p style={{ margin: '0', fontSize: '14px' }}>Kigali, Rwanda</p>
                        <p style={{ margin: '0', fontSize: '14px' }}>Kimihurura, Gasabo</p>
                    </div>
                    <hr />
                    <h1>Report on {formattedDate}</h1>
                </div>
                <h3>Start date: {dates.startDate} | End date: {dates.endDate}</h3>
                <hr />
                <table style={{ margin: '20px auto', borderCollapse: 'collapse', border: '1px solid black' }}>
                    <tbody>
                        <tr>
                            <td style={{ border: '1px solid black', padding: '8px' }}>Total Number of Reviews:</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{data.totalReviews}</td> {/* Replace with actual value */}
                        </tr>
                        <tr>
                            <td style={{ border: '1px solid black', padding: '8px' }}>Total Number of Reviewers:</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{data.totalReviewers}</td> {/* Replace with actual value */}
                        </tr>
                        <tr>
                            <td style={{ border: '1px solid black', padding: '8px' }}>Total Number of News Articles:</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{data.totalNewsArticle}</td> {/* Replace with actual value */}
                        </tr>
                    </tbody>
                </table>
                <table style={{ margin: '20px auto', borderCollapse: 'collapse', border: '1px solid black', borderRadius: '0' }}>
                    <tbody>
                        <tr>
                            <td style={{ border: '1px solid black', padding: '8px' }}>Name of Reviewers:</td>
                        </tr>
                        {data.reviewers.map((reviewer, index) => (
                            <tr key={index}>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{index+1}. {reviewer.firstName} {reviewer.lastName}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div style={{ marginTop: '200px', textAlign: 'center' }}>
                    <p>Printed by Rukundo Wellars</p><br/>
                      Kigali, Rwanda Done on {formattedDate}
                    <p style={{ color: 'black' }}> {new Date().getFullYear()} Electronic Journal Sentiment Analysis</p>
                </div>
            </PDFExport>
        </div>
    );
};

export default PdfReviews;
