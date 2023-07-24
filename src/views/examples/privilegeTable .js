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

import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  Table,
  Container,
  Row,
  Col,
  Button
} from "reactstrap";
// core components

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "components/Navbars/Header";
import AccessRightModal from "./AccessRightsModal";

const PrivilegeTable = () => {
  const [message, setMessage] = useState('');
  const [data, setData] = useState([]);
  const [showAction, setShowAction] = useState(false);
  const [information, setInformation] = useState({
    firstname: '',
    lastname: '',
    privilege: '',
  });

  const toggleAccessRights = (fname, lname, privilege) => {
    setShowAction(!showAction);
    setInformation({
      firstname: fname,
      lastname: lname,
      privilege: privilege
    });
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
    fetch("http://localhost:8000/api/admin/updateaccessrights", requestOptions)
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

  function changeRights(e) {
    e.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
        'x-auth-token': JSON.parse(localStorage.getItem("token"))
      },
      body: JSON.stringify(user)
    }
    fetch("http://localhost:8000/api/admin/modifyuser", requestOptions)
      .then((response) => {
        if (response.ok) {
          // setMessage("User updated successfully")
          toggleUpdate();
          
        }
        else {
          setMessage("Not able to update");
        }
      })
      .catch(error => {
        console.log(error.message)
        setMessage("connect your server")
      })
  }

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid >
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow border-primary">
              <CardHeader className="border-0 bg-gradient-default ">
                <Row className="align-items-center">
                  <Col xs="12">
                    <h1 className="mb-0" style={{ color: "white" }}><strong>users and their privileges</strong></h1>
                    <span><p className="lead" style={{ color: "whitesmoke" }}>
                      Attention Attention ,attention is all you<br />
                      need this system has sensitive information <br />
                      take action carefully
                    </p></span>
                    <Button
                      className="mb-4"
                      color="danger"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      change privilege
                    </Button>
                    <div className="d-flex justify-content-end">
                      <Badge className="text-uppercase bg-warning" pill>Warning</Badge>
                    </div>

                  </Col>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">NAME</th>
                    <th scope="col">NATIONAL IDENTITY</th>
                    <th scope="col">EMAIL</th>
                    <th scope="col">PRIVILEGE</th>
                    <th scope="col" >ACTION</th>
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
                              {person.user.firstname} {person.user.lastname}
                            </span>
                          </Badge>
                        </th>
                        <td>
                          <Badge color="" className="badge-dot mr-4">
                            <i className="bg-info" />
                            {person.user.nID}
                          </Badge>
                        </td>
                        <td>
                          <div>
                            <Badge color="" className="badge-dot mr-4">
                              <i className="bg-warning" />
                              {person.user.email}
                            </Badge>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <span className="mr-2">
                              {(person.privilege === "GRANTED") && (
                                <Button
                                  color="success"
                                  onClick={(e) => e.preventDefault()}
                                  size="sm"
                                >
                                  GRANTED
                                </Button>

                              )}
                              {(person.privilege === "NO_ACCESS") && (
                                <Button
                                  color="danger"
                                  onClick={(e) => e.preventDefault()}
                                  size="sm"
                                >
                                  NO ACCESS RIGHT
                                </Button>

                              )}
                            </span>
                          </div>
                        </td>
                        <td>
                          <Button
                            color="info"
                            onClick={(e) => toggleAccessRights(person.user.firstname,person.user.lastname,person.privilege)}
                            size="sm"
                          >
                            Change privilege
                          </Button>
                        </td>
                      </tr>)
                  })}
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <h5><span className="mb-0 text-sm lead">privileges</span></h5>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
      {/* access right modal */}
      <div>
        <AccessRightModal toggleModal={toggleAccessRights} setShowModal={setShowAction} modalState={showAction} data={information} />
      </div>
    </>
  );
};

export default PrivilegeTable;
