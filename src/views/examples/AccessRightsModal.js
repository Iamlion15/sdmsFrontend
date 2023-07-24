import {
  Button,
  Modal,
  Col,
}
  from "reactstrap"


const AccessRightModal = ({operation,personel, toggleModal, modalState, setShowModal, data }) => {
  function modifyRights(){
    operation(personel)
    setShowModal()  
  }
  return (
    <>
      <Col md="4">
        <Modal
          className="modal-dialog-centered modal-success"
          isOpen={modalState}
          toggle={() => toggleModal()}
        >
          <div className="modal-header">
            <h6 className="modal-title" id="modal-title-default">
              ACCESS RIGHTS
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
              {(data.privilege === "GRANTED") && (
                <p>
                  <strong>You are about to revoke access to {data.firstname} {data.lastname}<br /></strong><br />
                </p>
              )}
              {(data.privilege === "NO_ACCESS") && (
                <p>
                  <strong>You are about to grant access to {data.firstname} {data.lastname}<br /></strong><br />
                </p>
              )}
            </div>
          </div>
          <div className="modal-footer">
            {(data.privilege === "NO_ACCESS") && (
                <Button className="btn-success" 
                color="default" 
                type="button"
                onClick={()=>modifyRights()}
                >
                Ok,Grant access
              </Button>
              )}
              {(data.privilege === "GRANTED") && (
                <Button className="btn-danger" 
                color="danger" 
                type="button"
                onClick={()=>modifyRights()}
                >
                Ok,Revoke access
              </Button>
              )}
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

export default AccessRightModal;