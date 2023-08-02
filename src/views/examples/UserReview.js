
import {
    Card,
} from 'reactstrap'


const UserReview = ({names,comment}) => {
    return (
        <>
            <Card className="shadow m-1">
                <div className="font-weight-bolder m-5">
                    <h3 className="text-left font-weight-bolder">
                        <span className="font-weight-bolder mr-2">Names</span>
                    </h3>
                    <div className="h5 font-weight-300">
                        <i className="ni location_pin mr-2" />
                        {names}
                    </div>
                    <div className="h5 mt-4">
                        <i className="ni business_briefcase-24 mr-2" />
                        Review
                    </div>
                    <hr className="my-4" />
                    <p style={{color:'black'}}>
                        {comment}
                    </p>
                </div>
            </Card>

        </>
    )
}


export default UserReview;