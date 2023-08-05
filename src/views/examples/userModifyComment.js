import {
    CardHeader,
    Modal,
    Alert,
    Button
} from "reactstrap";

import UserPersonalComment from "./userPersonalComment"
import { useState, useRef } from "react";
import UserReviewUpdate from "./UserReviewUpdate";

const UserModifyComments = ({ Personalreviews, toggleModal, setShowModal, modalState, }) => {
    const [msg, setMsg] = useState("");
    const timeoutRef = useRef(null);
    const [visible, setVisible] = useState(false)
    const [userComment, setUserComment] = useState({});
    const [step, setStep] = useState(1);
    const closeAlert = () => {
        setVisible(false);
    }
    const showAlert = () => {
        setVisible(true);
        clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(closeAlert, 2000);
    }
    const gotoUpdate = (review) => {
        setStep(2)
        setUserComment(review)
    }
    const goback = () => {
        setStep(1);
    }


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
                    {step === 1 && (
                        <button
                            aria-label="Close"
                            className="close"
                            data-dismiss="modal"
                            type="button"
                            onClick={() => setShowModal()}
                        >
                            <span aria-hidden={false}>×</span>
                        </button>
                    )}
                    {step === 2 && (
                        <Button
                            data-dismiss="modal"
                            color="neutral"
                            size="sm"
                            type="button"
                            onClick={() => goback()}
                        >
                            <span aria-hidden={false}>go back</span>
                        </Button>
                    )}
                </div>
                {msg === "1" && visible && (
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
                )}
                {msg === "200" && visible && (
                    <CardHeader className="p-1">
                        <Alert color="success" fade={true} >
                            <span className="alert-inner--icon">
                                <i className="ni ni-bell-55" />
                            </span>
                            <span className="alert-inner--text ml-1">
                                SUCCESSFULLY UPDATED!
                            </span>
                        </Alert>
                    </CardHeader>
                )}
                <div className="modal-body p-0">
                    {step === 1 && (<UserPersonalComment reviews={Personalreviews} showInfo={showAlert} setFeedback={setMsg} handleNext={gotoUpdate} />)}
                    {step === 2 && (<UserReviewUpdate comments={userComment} showInfo={showAlert} setFeedback={setMsg} reset={goback} />)}
                </div>
            </Modal>
        </>
    )

}

export default UserModifyComments