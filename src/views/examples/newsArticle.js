import {
    Badge,
    Button,
    Card,
    CardBody,
} from "reactstrap"


const NewsArticle = ({ title, summary, source, sentiment, link }) => {
    return (
        <>
            <Card className="card-lift--hover shadow border-0">
                <CardBody className="py-5">
                    <h2 className="text-uppercase">
                        {title}
                    </h2>
                    <p className="description mt-3">
                        {summary}
                    </p>
                    <div>
                        <h6 className="lead muted">
                            {source}
                        </h6>
                    </div>
                    {sentiment === 'Positive' && (
                        <div className="progress-wrapper">
                            <div className="progress-danger">
                                <div className="progress-label">
                                    <span>Sentiment Analysis</span>
                                </div>
                            </div>
                            <Badge className="text-uppercase bg-success my-3" pill>positive sentiment</Badge>
                        </div>
                    )}
                    {sentiment === 'Negative' && (
                        <div className="progress-wrapper">
                            <div className="progress-success">
                                <div className="progress-label">
                                    <span>Sentiment Analysis</span>
                                </div>
                            </div>
                            <Badge className="text-uppercase bg-danger my-3" pill>negative sentiment</Badge>
                        </div>
                    )}
                    {sentiment === 'Neutral' && (
                        <div className="progress-wrapper">
                            <div className="progress-success">
                                <div className="progress-label">
                                    <span>Sentiment Analysis</span>
                                </div>
                            </div>
                            <Badge className="text-uppercase bg-info my-3" pill>Neutral sentiment</Badge>
                        </div>
                    )}


                    <div>
                        <div className="icon icon-shape icon-shape-primary rounded-circle mb-4">
                            <i className="ni ni-check-bold" />
                        </div>
                        <a href={link} target="_blank" rel="noreferrer">Follow this link to go on article </a>
                    </div>

                    <Button
                        className="mt-4"
                        color="primary"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                    >
                        Read more
                    </Button>

                </CardBody>
            </Card>

        </>
    )
}

export default NewsArticle;