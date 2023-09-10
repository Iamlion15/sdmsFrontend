
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import UpdateUserModal from "./UpdateUserModal";
import AddRABModal from "./AddRABUser";
import DeleteModal from "./deleteModal";
import AdminNavbar from "components/sharedNavbar/AdminNavbar";
import {
  Card,
  CardHeader,
  Container,
  Row,
  Table,
  Col,
  Button,
  Alert
} from "reactstrap";
// core components
import Footer from "components/Footers/Footer";
import OperationHeader from "components/Navbars/OperationHeader";
const RABList = () => {
  const [rabUser,setRabUser]=useState({
    firstname:"",
    lastname:"",
    nID:"",
    phone:"",
    email:"",
    password:""
  })
  const [message, setMessage] = useState('');
  const [data, setData] = useState([])
  const [msg, setMsg] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [info, setInfo] = useState({});
  const [updateInfo, setUpdateInfo] = useState({});
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [random, setRandom] = useState('')
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
  const showDelete = (data) => {
    setInfo(data)
    setShowModal(!showModal)
  }
  const showUpdate = (data) => {
    setUpdateInfo(data)
    setShowUpdateModal(!showModal)
  }
  const toggleModal = () => {
    setShowModal(!showModal)
  }
  const toggleAddModal = () => {
    setShowAddModal(!showAddModal)
  }
  const toggleUpdateModal=()=>{
    setShowUpdateModal(!showUpdateModal)
  }
  const deleteUser = (id) => {
    const deleteData = {
      "_id": id
    }
    const methodOptions = {
      method: 'DELETE',
      headers: {
        'content-Type': 'application/json',
        'x-auth-token': JSON.parse(localStorage.getItem("token"))
      },
      body: JSON.stringify(deleteData)
    }
    fetch("http://localhost:5000/api/farmer/delete", methodOptions)
      .then((response) => {
        if (!response.ok) {
          setMessage("PLEASE RETRY")
        }
        else {
          if (response.ok) {
            setMsg("DELETED SUCCESSFULLY")
            toggleModal()
            showAlert();
            const ra = Math.random() * (10 - 1) + 1;
            setRandom(ra);
          }
        }
      })
      .catch(error => {
        console.log(error.message)
        setMessage("connect your server")
      })
  }

  const UpdateUser = () => {
    const methodOptions = {
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
        'x-auth-token': JSON.parse(localStorage.getItem("token"))
      },
      body: JSON.stringify(updateInfo)
    }
    fetch("http://localhost:5000/api/admin/update", methodOptions)
      .then((response) => {
        if (!response.ok) {
          setMessage("PLEASE RETRY")
        }
        else {
          if (response.ok) {
            setMsg("UPDATED SUCCESSFULLY")
            toggleUpdateModal()
            showAlert();
            const ra = Math.random() * (10 - 1) + 1;
            setRandom(ra);
          }
        }
      })
      .catch(error => {
        console.log(error.message)
        setMessage("connect your server")
      })
  }

  const addRabUser = () => {
    const methodOptions = {
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
        'x-auth-token': JSON.parse(localStorage.getItem("token"))
      },
      body: JSON.stringify(rabUser)
    }
    fetch("http://localhost:5000/api/admin/addrab", methodOptions)
      .then((response) => {
        if (!response.ok) {
          setMessage("PLEASE RETRY")
        }
        else {
          if (response.ok) {
            setMsg("ADDED SUCCESSFULLY")
            toggleAddModal()
            showAlert();
            const ra = Math.random() * (10 - 1) + 1;
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
    fetch("http://localhost:5000/api/admin/getrab", requestOptions)
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
      <AdminNavbar />
      <OperationHeader />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
              <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">RAB user admin List</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="success"
                      onClick={() =>toggleAddModal() }
                      size="sm"
                    >
                      Add rab admin
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
                    <th scope="col">RAB admin's Name</th>
                    <th scope="col">National ID</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((rab) => {
                    return ( 
                      <tr key={rab._id}>

                        <td>{rab.firstname} {rab.lastname}</td>
                        <td>
                          {rab.nID}
                        </td>
                        <td>
                          {rab.email}
                        </td>
                        <td>
                          {rab.phone}
                        </td>
                        <td>
                          <Button
                            color="success"
                            onClick={(e) => showUpdate(rab)}
                            size="md"
                          >
                            Update
                          </Button>
                          <Button
                            color="danger"
                            onClick={(e) => showDelete(rab)}
                            size="md"
                          >
                            Delete
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
        <DeleteModal toggleModal={toggleModal} modalState={showModal} setShowModal={setShowModal} deleteUser={deleteUser} info={info} role={"farmer"} />
      </div>
      <div>
        <UpdateUserModal toggleModal={toggleUpdateModal} modalState={showUpdateModal} setShowModal={setShowUpdateModal} updateUser={UpdateUser} info={updateInfo} setInfo={setUpdateInfo} role={"farmer"} />
      </div>
      <div>
        <AddRABModal toggleModal={toggleAddModal} modalState={showAddModal} setShowModal={setShowAddModal} addUser={addRabUser} info={rabUser} setInfo={setRabUser}/>
      </div>
    </>
  );
}


export default RABList;
