/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";

import { Link, useLocation, useParams } from "react-router-dom";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from 'reactstrap';

const BlogDetail = () => {
  const { id } = useParams()
  const state = useLocation()
  const blogData = state ? state.state : {}
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === blogData?.img?.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? blogData?.img?.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = blogData?.img?.map((item, index) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={index}
      >
        <img src={item} alt={""} className="img-fluid w-100  rounded-4 shadow-md"
          style={{ height: "30rem", objectFit: "cover", objectPosition: "center center" }} />
      </CarouselItem>
    );
  });
  return (
    <React.Fragment>
      <section className="py-5 ">
        <Container className="py-5">
          <Row className="justify-content-center">
            <Col lg={12} md={10}>
              <div className="">
                <div className="text-center section-title">
                  <div className="mb-4">
                    <h3 className="title popins_medium ">
                      {blogData?.title}
                    </h3>

                    <h6 className="text-end text-muted">Last updated on December 29, 2023</h6>
                  </div>
                  <Carousel
                    activeIndex={activeIndex}
                    next={next}
                    slide
                    interval={3000}
                    previous={previous}
                  >
                    <CarouselIndicators
                      items={blogData?.img}
                      activeIndex={activeIndex}
                      onClickHandler={goToIndex}
                    />
                    {slides}
                    <CarouselControl
                      direction="prev"
                      directionText="Previous"
                      onClickHandler={previous}
                    />
                    <CarouselControl
                      direction="next"
                      directionText="Next"
                      onClickHandler={next}
                    />
                  </Carousel>
                </div>
                <Row className="justify-content-center ">
                  <Col lg={8} className="section-title">
                    <p className="text-muted mb-0 mt-4">
                      {blogData?.desc}
                    </p>
                    <div dangerouslySetInnerHTML={{ __html: blogData?.blogContent }} className="mt-3 blogContent"></div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>

        </Container>
      </section>
    </React.Fragment>
  );
}
export default BlogDetail
