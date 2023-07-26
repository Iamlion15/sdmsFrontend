
import {
    Card,
} from 'reactstrap'


const Review = () => {
    return (
        <>
            <Card className="shadow m-1">
                <div className="font-weight-bolder m-5">
                    <h3 className="text-left font-weight-bolder">
                        <span className="font-weight-bolder mr-2">Names</span>
                    </h3>
                    <div className="h5 font-weight-300">
                        <i className="ni location_pin mr-2" />
                        Bucharest, Romania
                    </div>
                    <div className="h5 mt-4">
                        <i className="ni business_briefcase-24 mr-2" />
                        Review
                    </div>
                    <hr className="my-4" />
                    <p>
                        Ryan — the name taken by Melbourne-raised, Brooklyn-based
                        Nick Murphy — writes, performs and records all of his own
                        music.
                    </p>
                </div>
            </Card>

        </>
    )
}


export default Review;