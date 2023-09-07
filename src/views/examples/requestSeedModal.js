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

const RequestseedModal = ({ toggleModal, modalState, setShowModal,quantityInfo,setQuantityInfo,increaseQuantity,info }) => {

const calculateAmount=(e)=>{
    const amounte=e.target.value*info.price
    setQuantityInfo({...quantityInfo,amount:amounte,quantity:e.target.value})
}
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
              Request seeds 
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
                    min="1"
                    value={quantityInfo.quantity}
                    onChange={(e) => calculateAmount(e)}
                    required
                    
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="quantity"
                  >
                    Amount
                  </label>
                  <Input
                    style={{ color: 'black' }}
                    className="form-control-alternative"
                    id="input-first-name"
                    placeholder="amount"
                    type="number"
                    min="1"
                    value={quantityInfo.amount}
                    required
                    disabled
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
          onClick={()=>increaseQuantity()}    
          >
                  Request
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

export default RequestseedModal;