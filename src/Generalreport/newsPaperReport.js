import React, { useRef, useEffect } from 'react';
import { PDFExport } from '@progress/kendo-react-pdf';

const NewspaperReport = ({ data, setShow }) => {
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
                {/* Table Section */}
                <div style={{ margin: '40px' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f2f2f2' }}>
                                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Newspaper</th>
                                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Total Articles</th>
                                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Positive sentiments</th>
                                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Negative sentiments</th>
                                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Overall sentiment of the newspaper</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((newsItem, index) => (
                                <tr key={index}>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{newsItem.Newspaper}</td>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{newsItem.Totalarticles}</td>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{newsItem.PositiveSentiment}</td>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{newsItem.NegativeSentiment}</td>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{newsItem.overallSentiment}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div style={{ marginTop: '200px', textAlign: 'center' }}>
                <p>Printed by Rukundo Wellars</p><br/>
                    Kigali, Rwanda Done on {formattedDate}
                    <p style={{ color: 'black' }}> {new Date().getFullYear()} Electronic Journal Sentiment Analysis</p>
                </div>
            </PDFExport>
        </div>
    );
};

export default NewspaperReport;
