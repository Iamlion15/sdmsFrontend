/*!

=========================================================
* Argon Dashboard React - v1.2.3
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// reactstrap components
import "assets/css/table-font/argon-dashboard-react.min.css"
import AdminNavbar from "components/sharedNavbar/Navbar";

import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Table,
  Container,
  Row,
  Col,
  Button
} from "reactstrap";
// core components
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DeleteModal from "./deleteModal";
import Footer from "components/Footers/Footer";
import OperationHeader from "components/Navbars/OperationHeader";

const UsersTable = () => {
  const [message, setMessage] = useState('');
  const [data, setData] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [user, setUser] = useState({
    firstname: '',
    lastname: '',
    email: '',
    nID: '',
    phone: ''
  });
  const NavigateToUpdate = (id) => {
    //event.preventDefault();
    navigate("/updateuser/" + id)
  }
  const toggleDelete = (person) => {
    setShowDelete(!showDelete);
    setUser(person);
  };
  const navigate = useNavigate();
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'content-Type': 'application/json',
        'x-auth-token': JSON.parse(localStorage.getItem("token"))
      },
    }
    fetch("http://localhost:8000/api/admin/getusers", requestOptions)
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
    <AdminNavbar/>
    <OperationHeader/>
      {/* <Header /> */}
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0 lead"><strong>Registered users</strong></h3>
                  </Col>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">FIRST NAME</th>
                    <th scope="col">LAST NAME</th>
                    <th scope="col">NATIONAL IDENTITY</th>
                    <th scope="col">EMAIL</th>
                    <th scope="col">PHONE</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {data.map((person) => {
                    return (
                      <tr key={person._id}>
                        <th scope="row">
                          <Badge color="" className="badge-dot mr-4">
                            <i className="bg-primary" />
                            <span className="mb-0 text-sm">
                              {person.firstname}
                            </span>
                          </Badge>
                        </th>
                        <td>{person.lastname}</td>
                        <td>
                          <Badge color="" className="badge-dot mr-4">
                            <i className="bg-info" />
                            {person.nID}
                          </Badge>
                        </td>
                        <td>
                          <div>
                            <Badge color="" className="badge-dot mr-4">
                              <i className="bg-warning" />
                              {person.email}
                            </Badge>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <span className="mr-2">
                              {person.phone}
                            </span>
                          </div>
                        </td>
                        <td className="text-right">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              className="btn-icon-only text-light"
                              href="#pablo"
                              role="button"
                              size="sm"
                              color=""
                              onClick={(e) => e.preventDefault()}
                            >
                              <i className="fa fa-ellipsis-v" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                              <DropdownItem
                                href="#"
                                onClick={() => NavigateToUpdate(person._id)}
                              >
                                <Badge color="" className="badge-dot mr-4">
                                  <i className="bg-success" />
                                  update
                                </Badge>
                              </DropdownItem>
                              <DropdownItem
                                href="#"
                                onClick={(e) => toggleDelete(person)}
                              >
                                <Badge color="" className="badge-dot mr-4">
                                  <i className="bg-warning" />
                                  delete
                                </Badge>
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>)
                  })}
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <h5><span className="mb-0 text-sm lead">List of registered users</span></h5>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
      <Footer/>
      {/* deleteModal */}
      <div>
        <DeleteModal toggleModal={toggleDelete} setShowModal={setShowDelete} modalState={showDelete} data={user}/>
      </div>
    </>
  );
};

export default UsersTable;
