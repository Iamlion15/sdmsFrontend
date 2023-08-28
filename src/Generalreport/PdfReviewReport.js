import React, { useRef, useEffect } from 'react';
import { PDFExport } from '@progress/kendo-react-pdf';


const PdfReviewReport = ({ reviewers, stats, reviewed, setShow }) => {
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
                <h3>Personnels who reviewed the articles</h3>
                <table style={{ margin: '20px auto', borderCollapse: 'collapse', border: '1px solid black', borderRadius: '0' }}>
                    <tbody>
                        <tr>
                            <td style={{ border: '1px solid black', padding: '8px' }}>Name of personnel:</td>
                        </tr>
                        {reviewers.usersWhoReviewed.map((reviewer, index) => (
                            <tr key={index}>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{index + 1}. {reviewer.firstName} {reviewer.lastName}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <h3>Personnels who have not reviewed any article</h3>
                <table style={{ margin: '20px auto', borderCollapse: 'collapse', border: '1px solid black', borderRadius: '0' }}>
                    <tbody>
                        <tr>
                            <td style={{ border: '1px solid black', padding: '8px' }}>Name of personnel:</td>
                        </tr>
                        {reviewers.usersWhoNotReviewed.map((reviewer, index) => (
                            <tr key={index}>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{index + 1}. {reviewer.firstName} {reviewer.lastName}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <h3>News articles status</h3>
                <table style={{ margin: '20px auto', borderCollapse: 'collapse', border: '1px solid black' }}>
                    <tbody>
                        <tr>
                            <td style={{ border: '1px solid black', padding: '8px' }}>Total Number of Reviewed Articles:</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{stats.reviewedNewsArticlesCount}</td> {/* Replace with actual value */}
                        </tr>
                        <tr>
                            <td style={{ border: '1px solid black', padding: '8px' }}>Total Number of Articles which haven't been reviewed:</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{stats.NoReviewedArticlesCount}</td> {/* Replace with actual value */}
                        </tr>
                        <tr>
                            <td style={{ border: '1px solid black', padding: '8px' }}>Total Number of News Articles:</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{stats.totalNewsArticle}</td> {/* Replace with actual value */}
                        </tr>
                    </tbody>
                </table>
                <h3>Reviewed news articles stats</h3>
                <table style={{ margin: '20px auto', borderCollapse: 'collapse', border: '1px solid black' }}>
                    <tbody>
                        <tr>
                            <td style={{ border: '1px solid black', padding: '8px' }}>Positive news sentiment :</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{reviewed.positive}</td> {/* Replace with actual value */}
                        </tr>
                        <tr>
                            <td style={{ border: '1px solid black', padding: '8px' }}>Negative news sentiment:</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{reviewed.negative}</td> {/* Replace with actual value */}
                        </tr>
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

export default PdfReviewReport;
