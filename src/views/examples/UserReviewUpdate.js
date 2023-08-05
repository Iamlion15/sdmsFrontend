import {
    Card,
    CardHeader,
    CardBody,
    Input,
    FormGroup,
    Form,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Button
} from "reactstrap"
import { useEffect, useState } from "react"


const UserReviewUpdate = ({comments,setFeedback,showInfo,reset}) => {
    const [data,setData]=useState({
        _id:"",
        comment:"",
        title:"",
        user:"",
        news:"",
    })
    const updateReview = (e) => {
        e.preventDefault();
        const methodOptions = {
            method: "POST",
              body: JSON.stringify(data),
            headers: {
                "content-type": "application/JSON",
                'x-auth-token': JSON.parse(localStorage.getItem("token"))
            },
        };
        fetch("http://localhost:8000/api/user/modifyreview", methodOptions)
            .then((response) => {
                if (!response.ok) {
                    if (response.status === 500) {
                          setFeedback("2");
                          showInfo()
                    }
                }
                else {
                    if (response.ok) {
                        setFeedback("200")
                        showInfo();
                        reset();
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    useEffect(()=>{
        setData({...data,
            _id:comments._id,
            comment:comments.comment,
            title:comments.title,
            user:comments.user._id,
            news:comments.news._id
            })
    },[])
    return (
        <>
            <Card className="bg-secondary shadow border-0">
                <CardHeader className="bg-white pb-5">
                    <div className="text-muted text-center mb-3">
                        <small>update review</small>
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
                    <Form role="form" onSubmit={updateReview}>
                        <FormGroup
                        >
                            <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="ni ni-email-83" />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    type="text"
                                    defaultValue={comments.title}
                                    onChange={(e) => setData({ ...data, title: e.target.value })}
                                />
                            </InputGroup>
                        </FormGroup>
                        <FormGroup className="mb-4">
                            <Input
                                className="form-control-alternative"
                                cols="80"
                                name="name"
                                defaultValue={comments.comment}
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
        </>
    )

}
export default UserReviewUpdate;