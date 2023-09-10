import {
  Button,
  Modal,
  Col,
  Row,
  FormGroup,
  Input
}
  from "reactstrap"

const UpdateUserModal = ({ toggleModal, modalState, setShowModal,info,setInfo,role,updateUser }) => {
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
              Update {role}
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
                    onChange={(e) => setInfo({...info,firstname:e.target.value})}
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
                    onChange={(e)=>setInfo({...info,lastname:e.target.value})}
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
                    type="text"
                    value={info.phone}
                    onChange={(e) => setInfo({...info,phone:e.target.value})}
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
          onClick={()=>updateUser()}    
          >
                  Update
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

export default UpdateUserModal;