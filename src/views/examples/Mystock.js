
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AgroNavbar from "components/sharedNavbar/UserNavbar";
import {
  Card,
  CardHeader,
  Container,
  Row,
  Col,
  Table,
} from "reactstrap";
// core components
import Footer from "components/Footers/Footer";
import OperationHeader from "components/Navbars/OperationHeader";
const AgroMyStock = () => {
  const [quantityInfo, setQuantityInfo] = useState({
    quantity: "",
    _id: ""
  })
  const [message, setMessage] = useState('');
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [msg, setMsg] = useState("")
  
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'content-Type': 'application/json',
        'x-auth-token': JSON.parse(localStorage.getItem("token"))
      },
    }
    fetch("http://localhost:5000/api/agro/getmystock", requestOptions)
      .then((response) => {
        if (!response.ok) {

          setMessage("PLEASE RETRY")
        }
        return response.json();
      })
      .then(value => {
        console.log(value)
        setData(value);
      })
      .catch(error => {
        console.log(error.message)
        setMessage("connect your server")
      })
  }, []);

  return (
    <>
      <AgroNavbar />
      <OperationHeader />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Stock view</h3>
                  </Col>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Seed name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Quantity in the stock</th>
                    <th scope="col">Price of the seeds</th>
                    
                    <th scope="col">ENTERED STOCK TIME</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((seedinfo) => {
                    return (
                      <tr key={seedinfo._id}>

                        <td>{seedinfo.seed.seedname}</td>
                        <td>
                          {seedinfo.seed.detail}
                        </td>
                        <td>
                          {seedinfo.quantity}
                        </td>
                        <td>
                          {seedinfo.price}
                        </td>
                        {seedinfo.createdAt}
                  
                      </tr>)
                  })}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
      <Footer />
    </>
  );
}


export default AgroMyStock;
