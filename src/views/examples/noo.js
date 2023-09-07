import React from 'react';
import jsPDF from 'jspdf';

const SeedPurchaseTable = ({ seedPurchaseData }) => {
  const generatePDF = () => {
    const doc = new jsPDF();

    doc.text('Seed Purchase Data', 10, 10);

    const tableData = [['Seed Name', 'Quantity Purchased', 'Price Paid', 'Paid To']];
    seedPurchaseData.forEach((purchase) => {
      tableData.push([purchase.seedName, purchase.quantity, purchase.price, purchase.paidTo]);
    });

    doc.autoTable({ startY: 20, head: tableData[0], body: tableData.slice(1) });

    doc.save('seed_purchase_data.pdf');
  };

  return (
    <div>
      <button onClick={generatePDF}>Generate PDF</button>
      <table>
        <thead>
          <tr>
            <th>Seed Name</th>
            <th>Quantity Purchased</th>
            <th>Price Paid</th>
            <th>Paid To</th>
          </tr>
        </thead>
        <tbody>
          {seedPurchaseData.map((purchase, index) => (
            <tr key={index}>
              <td>{purchase.seedName}</td>
              <td>{purchase.quantity}</td>
              <td>{purchase.price}</td>
              <td>{purchase.paidTo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

function App() {
  const seedPurchaseData = [
    { seedName: 'Tomato', quantity: 10, price: 20, paidTo: 'John' },
    { seedName: 'Cucumber', quantity: 5, price: 15, paidTo: 'Alice' },
    // Add more data as needed
  ];

  return (
    <div className="App">
      <h1>Seed Purchase Data</h1>
      <SeedPurchaseTable seedPurchaseData={seedPurchaseData} />
    </div>
  );
}

export default App;
