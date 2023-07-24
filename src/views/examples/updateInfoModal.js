import {
    Button,
    Modal,
    Col,
}
from "reactstrap"


const UpdateModal=({toggleModal,modalState,setShowModal})=>{
    return(
        <>
        <Col md="4">
        <Modal
              className="modal-dialog-centered modal-success"
              contentClassName="bg-gradient-danger"
              isOpen={modalState}
            toggle={() => toggleModal()}
            >
              <div className="modal-header">
                <h6 className="modal-title" id="modal-title-default">
                  success
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
                <div className="py-3 text-center">
                  <i className="ni ni-bell-55 ni-3x" />
                  <p>
                    <strong>successfully updated user</strong><br/>
                  </p>
                </div>
              </div>
              <div className="modal-footer">
                <Button className="btn-white" color="default" type="button">
                  Ok
                </Button>
              </div>
            </Modal>
          </Col>
        </>
    )
}

export default UpdateModal;