import {
  Button,
  Modal,
  Col,
}
  from "reactstrap"
  import { useNavigate } from "react-router-dom"


const RegisterModal = ({toggleModal,setShowModal,modalState}) => {
  const navigate=useNavigate();
    const navigateLogin=()=>{
      navigate("/login")
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
              INFORMATION
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
                  <strong>YOU HAVE BEEN SUCCESFULLY REGISTERED<br /></strong><br />
                </p>
                <div className="icon icon-shape icon-shape-warning rounded-circle mb-4">
                            <i className="ni ni-check-bold" />
                        </div>
                <p>
                  <strong>You will wait for the admin to approve your account and give you access<br /></strong><br />
                </p>
            </div>
          </div>
          <div className="modal-footer">
          <Button className="btn-success" 
                color="default" 
                type="button"
                onClick={()=>navigateLogin()}
                >
                Navigate to Login
              </Button>
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

export default RegisterModal;