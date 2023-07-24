import {
    Button,
    Modal,
    Col,
    Row
}
from "reactstrap"


const DeleteModal=({toggleModal,modalState,data,setShowModal})=>{
    return(
        <>
        <Col md="4" >
        <Modal
              className="modal-dialog-centered modal-danger"
              contentClassName="bg-gradient-danger"
              isOpen={modalState}
            toggle={() => toggleModal()}
            >
              <div className="modal-header">
                <h6 className="modal-title" id="modal-title-notification">
                  Your attention is required
                </h6>
                <button
                  aria-label="Close"
                  className="close"
                  data-dismiss="modal"
                  type="button"
                 onClick={() => setShowModal()}
                >
                  <span aria-hidden={true}>×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="py-3 text-center">
                  <i className="ni ni-bell-55 ni-3x" />
                  <h4 className="heading mt-4">Be careful!</h4>
                  <p>
                    <strong>You are going to delete a registered user,</strong><br/>
                    <strong>Are you sure you want to delete {data.firstname} {data.lastname}</strong>
                  </p>
                </div>
              </div>
              <div className="modal-footer">
                <Button className="btn-white" color="default" type="button">
                  Ok, Delete user
                </Button>
                <Button
                  className="text-white ml-auto"
                  color="link"
                  data-dismiss="modal"
                  type="button"
                  onClick={() => setShowModal()}
                >
                  Cancel
                </Button>
              </div>
            </Modal>
          </Col>
        </>
    )
}

export default DeleteModal;