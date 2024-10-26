/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { Component, useEffect, useState } from "react";
import { Container, Row, Col, Card, CardBody, Spinner } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import Paginations from '../snackbar/Pagination'
import { blog1, blog2, blog3, blog4, blog5, blog6, blog7, blog8 } from "../icons/icon";

const AllBlog = () => {
    const [blogData, setBlogData] = useState([
        {
            id: 1,
            badge: "Men",
            img: [blog1, blog2, blog3],
            title: "A team of designers that make dreams come true",
            blogContent: "<h4>Challenges</h4><p>Due to its widespread use as filler text for layouts, non-readability is of great importance: human perception is tuned to recognize certain patterns and repetitions in texts.</p><p>For this reason, dummy text usually consists of a more or less random series of words or syllables. This prevents repetitive patterns from impairing the overall visual impression and facilitates the comparison of different typefaces.</p><h4>Solutions</h4><p>Furthermore, it is advantageous when the dummy text is relatively realistic so that the layout impression of the final publication is not compromised.</p><p>One disadvantage of Lorum Ipsum is that in Latin certain letters appear more frequently than others - which creates a distinct visual impression. Moreover, in Latin only words at the beginning of sentences are capitalized.</p><h4>Results</h4><p>Disadvantage of Lorum Ipsum is that in Latin certain letters appear more frequently than others - which creates a distinct visual impression. Moreover, in Latin only words at the beginning of sentences are capitalized. It is advantageous when the dummy text is relatively realistic so that the layout impression of the final publication is not compromised.</p>",
            desc: "This is required when, for example, the final text is not yet available. Dummy text is also known as 'fill text'. It is said that song composers of the past used dummy texts as lyrics when writing melodies in order to have a 'ready-made' text to sing with the melody. Dummy texts have been in use by typesetters since the 16th century.",
        },
        {
            id: 2,
            badge: "Woman",
            img: [blog2],
            blogContent: "<h4>Challenges</h4><p>Due to its widespread use as filler text for layouts, non-readability is of great importance: human perception is tuned to recognize certain patterns and repetitions in texts.</p><p>For this reason, dummy text usually consists of a more or less random series of words or syllables. This prevents repetitive patterns from impairing the overall visual impression and facilitates the comparison of different typefaces.</p><h4>Solutions</h4><p>Furthermore, it is advantageous when the dummy text is relatively realistic so that the layout impression of the final publication is not compromised.</p><p>One disadvantage of Lorum Ipsum is that in Latin certain letters appear more frequently than others - which creates a distinct visual impression. Moreover, in Latin only words at the beginning of sentences are capitalized.</p><h4>Results</h4><p>Disadvantage of Lorum Ipsum is that in Latin certain letters appear more frequently than others - which creates a distinct visual impression. Moreover, in Latin only words at the beginning of sentences are capitalized. It is advantageous when the dummy text is relatively realistic so that the layout impression of the final publication is not compromised.</p>",
            desc: "This is required when, for example, the final text is not yet available. Dummy text is also known as 'fill text'. It is said that song composers of the past used dummy texts as lyrics when writing melodies in order to have a 'ready-made' text to sing with the melody. Dummy texts have been in use by typesetters since the 16th century.",
            title: "The best ways to change your summer"
        },
        {
            id: 3,
            badge: "Kids",
            desc: "This is required when, for example, the final text is not yet available. Dummy text is also known as 'fill text'. It is said that song composers of the past used dummy texts as lyrics when writing melodies in order to have a 'ready-made' text to sing with the melody. Dummy texts have been in use by typesetters since the 16th century.",
            blogContent: "<h4>Challenges</h4><p>Due to its widespread use as filler text for layouts, non-readability is of great importance: human perception is tuned to recognize certain patterns and repetitions in texts.</p><p>For this reason, dummy text usually consists of a more or less random series of words or syllables. This prevents repetitive patterns from impairing the overall visual impression and facilitates the comparison of different typefaces.</p><h4>Solutions</h4><p>Furthermore, it is advantageous when the dummy text is relatively realistic so that the layout impression of the final publication is not compromised.</p><p>One disadvantage of Lorum Ipsum is that in Latin certain letters appear more frequently than others - which creates a distinct visual impression. Moreover, in Latin only words at the beginning of sentences are capitalized.</p><h4>Results</h4><p>Disadvantage of Lorum Ipsum is that in Latin certain letters appear more frequently than others - which creates a distinct visual impression. Moreover, in Latin only words at the beginning of sentences are capitalized. It is advantageous when the dummy text is relatively realistic so that the layout impression of the final publication is not compromised.</p>",
            img: [blog3],
            title: "Men’s fashion & shopping in leather"
        },
        {
            id: 4,
            badge: "Teach",
            blogContent: "<h4>Challenges</h4><p>Due to its widespread use as filler text for layouts, non-readability is of great importance: human perception is tuned to recognize certain patterns and repetitions in texts.</p><p>For this reason, dummy text usually consists of a more or less random series of words or syllables. This prevents repetitive patterns from impairing the overall visual impression and facilitates the comparison of different typefaces.</p><h4>Solutions</h4><p>Furthermore, it is advantageous when the dummy text is relatively realistic so that the layout impression of the final publication is not compromised.</p><p>One disadvantage of Lorum Ipsum is that in Latin certain letters appear more frequently than others - which creates a distinct visual impression. Moreover, in Latin only words at the beginning of sentences are capitalized.</p><h4>Results</h4><p>Disadvantage of Lorum Ipsum is that in Latin certain letters appear more frequently than others - which creates a distinct visual impression. Moreover, in Latin only words at the beginning of sentences are capitalized. It is advantageous when the dummy text is relatively realistic so that the layout impression of the final publication is not compromised.</p>",
            desc: "This is required when, for example, the final text is not yet available. Dummy text is also known as 'fill text'. It is said that song composers of the past used dummy texts as lyrics when writing melodies in order to have a 'ready-made' text to sing with the melody. Dummy texts have been in use by typesetters since the 16th century.",
            img: [blog4],
            title: "A team of designers that make dreams come true"
        },
        {
            id: 5,
            badge: "Mobile",
            blogContent: "<h4>Challenges</h4><p>Due to its widespread use as filler text for layouts, non-readability is of great importance: human perception is tuned to recognize certain patterns and repetitions in texts.</p><p>For this reason, dummy text usually consists of a more or less random series of words or syllables. This prevents repetitive patterns from impairing the overall visual impression and facilitates the comparison of different typefaces.</p><h4>Solutions</h4><p>Furthermore, it is advantageous when the dummy text is relatively realistic so that the layout impression of the final publication is not compromised.</p><p>One disadvantage of Lorum Ipsum is that in Latin certain letters appear more frequently than others - which creates a distinct visual impression. Moreover, in Latin only words at the beginning of sentences are capitalized.</p><h4>Results</h4><p>Disadvantage of Lorum Ipsum is that in Latin certain letters appear more frequently than others - which creates a distinct visual impression. Moreover, in Latin only words at the beginning of sentences are capitalized. It is advantageous when the dummy text is relatively realistic so that the layout impression of the final publication is not compromised.</p>",
            desc: "This is required when, for example, the final text is not yet available. Dummy text is also known as 'fill text'. It is said that song composers of the past used dummy texts as lyrics when writing melodies in order to have a 'ready-made' text to sing with the melody. Dummy texts have been in use by typesetters since the 16th century.",
            img: [blog5],
            title: "The best ways to change your summer"
        },
        {
            id: 6,
            badge: "Leptop",
            blogContent: "<h4>Challenges</h4><p>Due to its widespread use as filler text for layouts, non-readability is of great importance: human perception is tuned to recognize certain patterns and repetitions in texts.</p><p>For this reason, dummy text usually consists of a more or less random series of words or syllables. This prevents repetitive patterns from impairing the overall visual impression and facilitates the comparison of different typefaces.</p><h4>Solutions</h4><p>Furthermore, it is advantageous when the dummy text is relatively realistic so that the layout impression of the final publication is not compromised.</p><p>One disadvantage of Lorum Ipsum is that in Latin certain letters appear more frequently than others - which creates a distinct visual impression. Moreover, in Latin only words at the beginning of sentences are capitalized.</p><h4>Results</h4><p>Disadvantage of Lorum Ipsum is that in Latin certain letters appear more frequently than others - which creates a distinct visual impression. Moreover, in Latin only words at the beginning of sentences are capitalized. It is advantageous when the dummy text is relatively realistic so that the layout impression of the final publication is not compromised.</p>",
            desc: "The final text is not yet available. Dummy text is also known as 'fill text'. It is said that song composers of the past used dummy texts as lyrics when writing melodies in order to have a 'ready-made' text to sing with the melody. Dummy texts have been in use by typesetters since the 16th century.",
            img: [blog6],
            title: "A team of designers that make dreams come true"
        },
        {
            id: 7,
            badge: "Accessories",
            blogContent: "<h4>Challenges</h4><p>Due to its widespread use as filler text for layouts, non-readability is of great importance: human perception is tuned to recognize certain patterns and repetitions in texts.</p><p>For this reason, dummy text usually consists of a more or less random series of words or syllables. This prevents repetitive patterns from impairing the overall visual impression and facilitates the comparison of different typefaces.</p><h4>Solutions</h4><p>Furthermore, it is advantageous when the dummy text is relatively realistic so that the layout impression of the final publication is not compromised.</p><p>One disadvantage of Lorum Ipsum is that in Latin certain letters appear more frequently than others - which creates a distinct visual impression. Moreover, in Latin only words at the beginning of sentences are capitalized.</p><h4>Results</h4><p>Disadvantage of Lorum Ipsum is that in Latin certain letters appear more frequently than others - which creates a distinct visual impression. Moreover, in Latin only words at the beginning of sentences are capitalized. It is advantageous when the dummy text is relatively realistic so that the layout impression of the final publication is not compromised.</p>",
            desc: "This is required when, for example, the final text is not yet available. Dummy text is also known as 'fill text'. It is said that song composers of the past used dummy texts as lyrics when writing melodies in order to have a 'ready-made' text to sing with the melody. Dummy texts have been in use by typesetters since the 16th century.",
            img: [blog7],
            title: "A team of designers that make dreams come true"
        },
        {
            id: 8,
            badge: "Sports",
            blogContent: "<h4>Challenges</h4><p>Due to its widespread use as filler text for layouts, non-readability is of great importance: human perception is tuned to recognize certain patterns and repetitions in texts.</p><p>For this reason, dummy text usually consists of a more or less random series of words or syllables. This prevents repetitive patterns from impairing the overall visual impression and facilitates the comparison of different typefaces.</p><h4>Solutions</h4><p>Furthermore, it is advantageous when the dummy text is relatively realistic so that the layout impression of the final publication is not compromised.</p><p>One disadvantage of Lorum Ipsum is that in Latin certain letters appear more frequently than others - which creates a distinct visual impression. Moreover, in Latin only words at the beginning of sentences are capitalized.</p><h4>Results</h4><p>Disadvantage of Lorum Ipsum is that in Latin certain letters appear more frequently than others - which creates a distinct visual impression. Moreover, in Latin only words at the beginning of sentences are capitalized. It is advantageous when the dummy text is relatively realistic so that the layout impression of the final publication is not compromised.</p>",
            img: [blog8],
            desc: "This is required when, for example, the final text is not yet available. Dummy text is also known as 'fill text'. It is said that song composers of the past used dummy texts as lyrics when writing melodies in order to have a 'ready-made' text to sing with the melody. Dummy texts have been in use by typesetters since the 16th century.",
            title: "The best ways to change your summer"
        },
    ])
    const [countData, setCountData] = useState(1)
    const [lastId, setLastId] = useState(0)
    const navigate = useNavigate()


    const handleBlogData = () => {
        // getBlog(lastId)
        //   .then((result) => {
        //     if (result.data.success) {
        //       setBlogData(result.data.blog)
        //       setCountData(result.data.count)
        //     }
        //   }).catch((err) => {
        //     console.log(err)
        //   });
    }
    useEffect(() => {
        handleBlogData()
    }, []);

    return (
        <React.Fragment>
            <section className="section bg-light">
                <section className="bg_img2">
                    <Container className="">
                        <div className="text-center pt-5 d-flex justify-center items-center flex-col gap-2">
                            <h2 className="inter_semibold">
                                Blog
                            </h2>
                            <h6 className="inter_regular text-muted">Explore, Learn, and Discover with Us</h6>
                        </div>
                    </Container>
                </section>
                <Container className="pt-5" >
                    <Row className="justify-content-center mt-4">
                        {blogData?.length > 0 ? (blogData?.map((cases, key) => (
                            <Col
                                key={key}
                                lg={4}
                                md={6}
                                sm={8}
                                xs={12}
                                className="mt-4 pt-2 business ">
                                <div onClick={() => navigate(`/blog/detail/${key}`, { state: cases })} className="link h6 h-100" style={{ cursor: "pointer" }} >
                                    <Card className="blog border-0 h-100 bg-transparent work-container work-primary work-classic rounded-3 overflow-hidden">
                                        <img
                                            src={cases.img[0]}
                                            className="img-fluid work-image shadow blogHeight rounded-4"
                                            alt="Landrick"
                                        />
                                        <CardBody className="pt-3 pb-0">
                                            <div className="content h-100">
                                                <div className="d-flex justify-content-between flex-column h-100">
                                                    <div>
                                                        <h6 className="line-clamp-1 text-lg inter_medium" >{cases.title}</h6>
                                                        <p className="text-muted text-sm two-line-ellipsis">
                                                            {cases.desc}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </div>
                            </Col>
                        )))
                            :
                            <div className='d-flex justify-content-center align-items-center w-100 h-100' style={{ minHeight: "40vh" }}  >
                                <Spinner />
                            </div>
                        }
                        {blogData.length > 0 &&
                            <Col xs={12} className="mb-5 pb-2">
                                <Paginations count={20} setLastId={setLastId} />
                            </Col>}
                    </Row>
                </Container>
            </section>
        </React.Fragment>
    );
}


export default AllBlog;
