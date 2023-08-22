import {
    Modal,

} from "reactstrap"
import ReportMenu from "./Menu";

const GeneralReport = ({ toggleModal, setShowModal, modalState }) => {

    return (
        <Modal
            className="modal-dialog-centered"
            size="lg"
            isOpen={modalState}
            toggle={() => toggleModal}
        >
            <div className="modal-header">
                <h6 className="modal-title" id="modal-title-default">
                    Generate report!!
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
                <ReportMenu/>
            <div className="modal-body p-0">

            </div>
        </Modal>

    )
}
export default GeneralReport;