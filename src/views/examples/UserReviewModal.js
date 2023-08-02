import {
    Modal,
    Button,
    Form,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
} from "reactstrap"
import { useState } from "react";

const UserReviewModal = ({ toggleModal, setShowModal, modalState,setFeedback,showMessage,newsid }) => {
    const [data,setData]=useState({
        title:"",
        comment:"",
        news:newsid
    })
    const addReview = (e) => {
        e.preventDefault();
        const methodOptions = {
            method: "POST",
              body: JSON.stringify(data),
            headers: {
                "content-type": "application/JSON",
                'x-auth-token': JSON.parse(localStorage.getItem("token"))
            },
        };
        fetch("http://localhost:8000/api/user/addreview", methodOptions)
            .then((response) => {
                if (!response.ok) {
                    if (response.status === 500) {
                          showMessage();
                          setFeedback("2");
                          toggleModal();
                    }
                }
                else {
                    if (response.ok) {
                        showMessage();
                        setFeedback("1")
                        toggleModal();
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    return (
        <Modal
            className="modal-dialog-centered modal-danger"
            size="md"
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
            <div className="modal-body p-0">
                <Card className="bg-secondary shadow border-0">
                    <CardHeader className="bg-white pb-5">
                        <div className="text-muted text-center mb-3">
                            <small>Sign in with</small>
                        </div>
                        <div className="btn-wrapper text-center">
                            <Button
                                className="btn-icon mt-2 mb-2"
                                color="neutral"
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                            >
                                <span className="btn-inner--icon mr-1">
                                    <img
                                        alt="..."
                                        src={require("assets/img/icons/common/github.svg")}
                                    />
                                </span>
                                <span className="btn-inner--text">Github</span>
                            </Button>
                            <Button
                                className="btn-icon mt-2 mb-2 ml-1"
                                color="neutral"
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                            >
                                <span className="btn-inner--icon mr-1">
                                    <img
                                        alt="..."
                                        src={require("assets/img/icons/common/google.svg")}
                                    />
                                </span>
                                <span className="btn-inner--text">Google</span>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">
                        <div className="text-center text-muted mb-4">
                            <small>Or sign in with credentials</small>
                        </div>
                        <Form role="form" onSubmit={addReview}>
                            <FormGroup
                            >
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-email-83" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        placeholder="Title"
                                        type="text"
                                        onChange={(e) => setData({ ...data, title: e.target.value })}
                                    />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup className="mb-4">
                                <Input
                                    className="form-control-alternative"
                                    cols="80"
                                    name="name"
                                    placeholder="Type your comment..."
                                    rows="4"
                                    type="textarea"
                                    onChange={(e) => setData({ ...data, comment: e.target.value })}
                                />
                            </FormGroup>
                            <div className="text-center">
                                <input type="submit"
                                    className="btn btn-success"
                                    size="lg"
                                    color="primary"
                                    value="comment" />
                            </div>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        </Modal>

    )
}
export default UserReviewModal;