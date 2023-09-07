import {
  Button,
  Modal,
  Col,
}
  from "reactstrap"

import { useNavigate } from "react-router-dom";

const AddStockInfoModal = ({ toggleModal, modalState, setShowModal }) => {
  const navigate = useNavigate();
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
                <strong>successfully added stock </strong><br />
              </p>
            </div>
          </div>
          <div className="modal-footer">
            <Button className="btn-white" color="default" type="button"
              onClick={() => toggleModal()}
            >
              Ok
            </Button>
          </div>
        </Modal>
      </Col>
    </>
  )
}

export default AddStockInfoModal;