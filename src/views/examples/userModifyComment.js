import {
    CardHeader,
    Modal,
    Alert
}from "reactstrap";

import UserPersonalComment from "./userPersonalComment"

const UserModifyComments = ({ Personalreviews, toggleModal, setShowModal, modalState, }) => {
    return (
        <>
            <Modal
                className="modal-dialog-centered modal-danger"
                size="lg"
                isOpen={modalState}
                toggle={() => toggleModal}
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
                
                <CardHeader className="p-1">
                    <Alert color="success" fade={true} >
                      <span className="alert-inner--icon">
                        <i className="ni ni-bell-55" />
                      </span>
                      <span className="alert-inner--text ml-1">
                        DELETED SUCCESSFULLY!
                      </span>
                    </Alert>
                </CardHeader>
                <div className="modal-body p-0">
                    
                    <UserPersonalComment reviews={Personalreviews}/>
                </div>
            </Modal>
        </>
    )

}

export default UserModifyComments