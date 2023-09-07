
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import IncreaseQuantityModal from "./increaseQuantityModal";
import DecreaseQuantityModal from "./decreaseQuantityModal";
import {
  Card,
  CardHeader,
  Container,
  Row,
  Col,
  Table,
  Button,
  Alert
} from "reactstrap";
// core components
import AdminNavbar from "components/sharedNavbar/Navbar";
import Footer from "components/Footers/Footer";
import OperationHeader from "components/Navbars/OperationHeader";
const RABStock = () => {
  const [quantityInfo, setQuantityInfo] = useState({
    quantity: "",
    _id: ""
  })
  const [message, setMessage] = useState('');
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [msg, setMsg] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [showDecrease, setShowDecrease] = useState(false)
  const timeoutRef = useRef(null);
  const [visible, setVisible] = useState(false)
  const closeAlert = () => {
    setVisible(false);
  }
  const showAlert = () => {
    setVisible(true);
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(closeAlert, 2000);
  }
  const show = (id, status) => {
    setQuantityInfo({ ...quantityInfo, _id: id })
    if (status == "increase") {
      setShowModal(!showModal)
    }
    else {
      if (status == "decrease") {
        setShowDecrease(!showDecrease)
      }
    }

  }
  const toggleModal = () => {
    setShowModal(!showModal)
  }
  const toggleDecrease = () => {
    setShowDecrease(!showDecrease)
  }
  const increaseQuantity = (status) => {
    const methodOptions = {
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
        'x-auth-token': JSON.parse(localStorage.getItem("token"))
      },
      body: JSON.stringify(quantityInfo)
    }
    let url;
    if (status == "increase") {
      url = "http://localhost:5000/api/rab/increasestock"
    }
    else {
      if (status == "decrease") {
        url = "http://localhost:5000/api/rab/decreasestock"
      }
    }
    fetch(url, methodOptions)
      .then((response) => {
        if (!response.ok) {
          setMessage("PLEASE RETRY")
        }
        else {
          if (response.ok) {
            if (status == "increase") {
              setMsg("INCREASED QUANTITY SUCCESSFULLY")
              toggleModal()
              showAlert();
            }
            else {
              if (status == "decrease") {
                setMsg("DECREASED QUANTITY SUCCESSFULLY")
                toggleDecrease()
                showAlert();
              }
            }

          }
        }
      })
      .catch(error => {
        console.log(error.message)
        setMessage("connect your server")
      })
  }
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'content-Type': 'application/json',
        'x-auth-token': JSON.parse(localStorage.getItem("token"))
      },
    }
    fetch("http://localhost:5000/api/rab/getstock", requestOptions)
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
      <AdminNavbar />
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
                    <Col className="text-right" xs="4">
                      <Button
                        color="primary"
                        onClick={(e) => navigate("/rab/addstock")}
                        size="sm"
                      >
                        Add stock
                      </Button>
                    </Col>
                  </Row>

                {msg && visible && (
                  <Alert color="success" fade={true} isOpen={visible}>
                    <span className="alert-inner--icon">
                      <i className="ni ni-bell-55" />
                    </span>
                    <span className="alert-inner--text ml-1">
                      {msg}!
                    </span>
                  </Alert>
                )}
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Seed name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Quantity in the stock</th>
                    <th scope="col">INCREASE</th>
                    <th scope="col">DECREASE</th>
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
                          <Button
                            color="success"
                            onClick={(e) => show(seedinfo._id, "increase")}
                            size="md"
                          >
                            Increase
                          </Button>
                        </td>
                        <td>
                          <Button
                            color="danger"
                            onClick={(e) => show(seedinfo._id, "decrease")}
                            size="md"
                          >
                            Decrease
                          </Button>
                        </td>
                      </tr>)
                  })}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
      <Footer />
      <div>
        <IncreaseQuantityModal toggleModal={toggleModal} modalState={showModal} setShowModal={setShowModal} quantityInfo={quantityInfo} setQuantityInfo={setQuantityInfo} increaseQuantity={increaseQuantity} />
      </div>
      <div>
        <DecreaseQuantityModal toggleModal={toggleDecrease} modalState={showDecrease} setShowModal={setShowDecrease} quantityInfo={quantityInfo} setQuantityInfo={setQuantityInfo} increaseQuantity={increaseQuantity} />
      </div>
    </>
  );
}


export default RABStock;
