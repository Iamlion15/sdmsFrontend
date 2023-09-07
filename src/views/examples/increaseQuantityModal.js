import { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Col,
  Row,
  FormGroup,
  Input
}
  from "reactstrap"

const IncreaseQuantityModal = ({ toggleModal, modalState, setShowModal,quantityInfo,setQuantityInfo,increaseQuantity }) => {

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
              Increase quantity
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
                    htmlFor="quantity"
                  >
                    seed quantity
                  </label>
                  <Input
                    style={{ color: 'black' }}
                    className="form-control-alternative"
                    id="input-first-name"
                    placeholder="seed quantity"
                    type="number"
                    min="0"
                    value={quantityInfo.quantity}
                    onChange={(e) => setQuantityInfo({ ...quantityInfo, quantity: e.target.value })}
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
          onClick={()=>increaseQuantity("increase")}    
          >
                  Increase
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

export default IncreaseQuantityModal;