import {
    Card,
    CardHeader,
    CardBody,
    Row,
    Col,
    CardFooter,
    Button
} from "reactstrap"
import { useEffect, useState } from "react"

const DeleteComment=()=>{
        e.preventDefault();
        const methodOptions = {
          method: "DELETE",
          body: JSON.stringify(data),
          headers: {
            "content-type": "application/JSON",
          },
        };
        fetch("http://localhost:8000/api/user/deletereview", methodOptions)
          .then((response) => {
            if (!response.ok) {
              console.log("INVALID EMAIL OR PASSWORD");
              setMsg("INVALID EMAIL OR PASSWORD")
            }
            return response.json();
          })
          .then((data) => {
            localStorage.setItem("token", JSON.stringify(data.token))
            console.log(localStorage.getItem("token"))
            if (data.hasOwnProperty("token")) {
              navigate("/privileges")
            }
            else {
              setMsg("incorrect password or email")
            }
    
          })
          .catch((error) => {
            setMsg("unexpected error occured");
            console.log(error);
          });
      }
}

const UserPersonalComment = ({ reviews }) => {
    const [userComment, setUserComments] = useState([]);
    const userComments = () => {
        const nid = JSON.parse(localStorage.getItem("nid"))
        const r = []
        for (let i = 0; i < reviews.length; i++) {
            if (reviews[i].user.nID == nid) {
                r.push(reviews[i])
                console.log(r[i]);
            }
        }
        setUserComments(r);
    }
    useEffect(() => {
        userComments();
    }, [])
    return (
        <>

            <Card className="bg-secondary shadow border-0" style={{ overflowY: 'auto', height: '360px' }}>
                
                {userComment.map((review) => {
                    return (
                        <Card key={review._id}>
                            <CardBody className="px-lg-5 pt-lg-5 bg-white pb-5">
                                <div>

                                    <div className="font-weight-bolder">
                                        <h3 className="text-left font-weight-bolder">
                                            <span className="font-weight-bolder">TITLE</span>
                                        </h3>
                                        <div className="h5 font-weight-300  m-1 ">
                                            <i className="ni location_pin" />
                                            {review.title}
                                        </div>
                                    </div>

                                    <div className="h5">
                                        <i className="ni business_briefcase-24 mr-2" />
                                        <h3>Review</h3>
                                    </div>
                                    <p style={{ color: 'black' }}>
                                        {review.comment}
                                    </p>
                                </div>
                            </CardBody>
                            <CardFooter>
                                <Row>
                                    <Col><Button
                                        color="info"
                                        onClick={(e) => e.preventDefault()}
                                        size="sm"
                                    >
                                        Update
                                    </Button></Col>
                                    <Col>
                                        <div className="d-flex justify-content-end">
                                            <Button
                                                color="danger"
                                                onClick={(e) => e.preventDefault()}
                                                size="sm"
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                            </CardFooter>
                        </Card>
                    )
                })}
            </Card>
        </>
    )
}
export default UserPersonalComment;