import {
  Button,
  Modal,
  Col,
}
  from "reactstrap"
  import { useNavigate } from "react-router-dom"


const LoginModal = ({toggleModal,setShowModal,modalState}) => {
  return (
    <>
      <Col md="4">
        <Modal
          className="modal-dialog-centered modal-danger"
          isOpen={modalState}
          toggle={() => toggleModal()}
        >
          <div className="modal-header">
            <h6 className="modal-title" id="modal-title-default">
              Attention!!
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
                  <strong>YOUR ACCOUNT IS PENDING WAITING TO BE APPROVED<br /></strong><br />
                </p>
                <div className="icon icon-shape icon-shape-warning rounded-circle mb-4">
                            <i className="ni ni-info" />
                        </div>
                <p>
                  <strong>You will wait for the admin to approve your account and give you access<br /></strong><br />
                </p>
            </div>
          </div>
          <div className="modal-footer">
            <Button
                  className="text-white ml-auto"
                  color="link"
                  data-dismiss="modal"
                  type="button"
                  onClick={() => setShowModal()}
                >
                  Ok
                </Button>
          </div>
        </Modal>
      </Col>
    </>
  )
}

export default LoginModal;