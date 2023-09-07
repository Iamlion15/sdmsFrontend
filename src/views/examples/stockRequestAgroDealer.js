
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import RequestseedModal from "./requestSeedModal";
import AgroNavbar from "components/sharedNavbar/UserNavbar";
import {
  Card,
  CardHeader,
  Container,
  Row,
  Table,
  Button,
  Alert
} from "reactstrap";
// core components
import Footer from "components/Footers/Footer";
import OperationHeader from "components/Navbars/OperationHeader";
const StockRequestAgroDealer = () => {
  const [quantityInfo, setQuantityInfo] = useState({
    quantity: "",
    amount: "",
    seed:"",
    requestedFrom:""
  })
  const [message, setMessage] = useState('');
  const [data, setData] = useState([])
  const [msg, setMsg] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [info,setInfo]=useState({});
  const [random,setRandom]=useState('')
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
  const show = ( data) => {
    setQuantityInfo({ ...quantityInfo,seed:data.seed._id, requestedFrom: data.owner._id })
    setInfo(data)
    setShowModal(!showModal)
  }
  const toggleModal = () => {
    setShowModal(!showModal)
  }
  const increaseQuantity = () => {
    console.log(quantityInfo);
    const methodOptions = {
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
        'x-auth-token': JSON.parse(localStorage.getItem("token"))
      },
      body: JSON.stringify(quantityInfo)
    }  
    fetch("http://localhost:5000/api/agro/requestseed", methodOptions)
      .then((response) => {
        if (!response.ok) {
          setMessage("PLEASE RETRY")
        }
        else {
          if (response.ok) {
              setMsg("REQUEST FULFILLED SUCCESSFULLY")
              toggleModal()
              showAlert();
              const ra= Math.random() * (10 - 1) + 1;
              setRandom(ra);
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
    fetch("http://localhost:5000/api/agro/getstock", requestOptions)
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
  }, [random]);

  return (
    <>
      <AgroNavbar />
      <OperationHeader />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Card tables</h3>
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
                    <th scope="col">REQUEST SEED</th>
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
                            onClick={(e) => show(seedinfo)}
                            size="md"
                          >
                            Request seed
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
        <RequestseedModal toggleModal={toggleModal} modalState={showModal} setShowModal={setShowModal} quantityInfo={quantityInfo} setQuantityInfo={setQuantityInfo} increaseQuantity={increaseQuantity} info={info} />
      </div>
    </>
  );
}


export default StockRequestAgroDealer;
