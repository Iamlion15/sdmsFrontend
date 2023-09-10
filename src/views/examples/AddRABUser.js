import {
  Button,
  Modal,
  Col,
  Row,
  FormGroup,
  Input
}
  from "reactstrap"

const AddRABModal = ({ toggleModal, modalState, setShowModal, info, setInfo, addUser }) => {
  return (
    <>
      <Col md="4">
        <Modal
          className="modal-dialog-centered"
          isOpen={modalState}
          toggle={() => toggleModal()}
        >
          <div className="modal-header">
            <h6 className="modal-title" id="modal-title-default">
              Add RAB admin
            </h6>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => setShowModal()}
            >
              <span aria-hidden={false}>×</span>
            </button>
          </div>
          <div className="modal-body">
            <Row>
              <Col>
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="firstname"
                  >
                    First name
                  </label>
                  <Input
                    style={{ color: 'black' }}
                    className="form-control-alternative"
                    id="input-first-name"
                    placeholder="First name"
                    type="text"
                    value={info.firstname}
                    onChange={(e) => setInfo({ ...info, firstname: e.target.value })}
                    required
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="lastname"
                  >
                    Last name
                  </label>
                  <Input
                    style={{ color: 'black' }}
                    className="form-control-alternative"
                    id="input-first-name"
                    placeholder="Last name"
                    type="text"
                    value={info.lastname}
                    onChange={(e) => setInfo({ ...info, lastname: e.target.value })}
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="firstname"
                  >
                    Phone number
                  </label>
                  <Input
                    style={{ color: 'black' }}
                    className="form-control-alternative"
                    id="input-first-name"
                    placeholder="Phone number"
                    type="number"
                    value={info.phone}
                    onChange={(e) => setInfo({ ...info, phone: e.target.value })}
                    required
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="lastname"
                  >
                    Email
                  </label>
                  <Input
                    style={{ color: 'black' }}
                    className="form-control-alternative"
                    id="input-first-name"
                    placeholder="email"
                    type="email"
                    value={info.lastname}
                    onChange={(e) => setInfo({ ...info, email: e.target.value })}
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="firstname"
                  >
                    NATIONAL IDENTIFICATION
                  </label>
                  <Input
                    style={{ color: 'black' }}
                    className="form-control-alternative"
                    id="input-first-name"
                    placeholder="NATIONAL ID"
                    type="number"
                    value={info.nID}
                    onChange={(e) => setInfo({ ...info, nID: e.target.value })}
                    required
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="lastname"
                  >
                    Password
                  </label>
                  <Input
                    style={{ color: 'black' }}
                    className="form-control-alternative"
                    id="input-first-name"
                    placeholder="password"
                    type="password"
                    value={info.password}
                    onChange={(e) => setInfo({ ...info, password: e.target.value })}
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
          </div>
          <div className="modal-footer">
            <Button
              className="btn-white"
              color="default"
              type="button"
              onClick={() => addUser()}
            >
              Add RAB
            </Button>
            <Button
              className="text-white ml-auto"
              color="default"
              data-dismiss="modal"
              type="button"
              onClick={() => setShowModal()}
            >
              Close
            </Button>
          </div>
        </Modal>
      </Col>
    </>
  )
}

export default AddRABModal;