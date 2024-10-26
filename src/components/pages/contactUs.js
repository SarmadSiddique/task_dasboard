/* eslint-disable no-unused-vars */
// React Basic and Bootstrap
import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Container, Label, Form, Card, CardBody, Input, CardHeader } from "reactstrap";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
//Import Icons
// import FeatherIcon from "feather-icons-react";
// import images
import { Book, Instagram, Mail, MapPin, MessageCircle, Phone, User } from "react-feather";
import { icon12, icon13, icon14 } from "../icons/icon";

const ContactUs = () => {

    return (
        <React.Fragment>
            <section className="bg-light">
                <section className="bg_img2">
                    <Container className="">
                        <div className="text-center pt-5 d-flex justify-center items-center flex-col gap-2">
                            <h2 className="inter_semibold">
                                Contact Us
                            </h2>
                            <h6 className="inter_regular text-muted">Let's Connect and Solve Problems Together</h6>
                        </div>
                    </Container>
                </section>
                <Container className="py-5">
                    <div className="row text-center justify-center pb-5">
                        <div className="col-sm-6 col-md-4 col-xl-3  ">
                            <div className="py-4 min-[768px]:border-e">
                                <div className='d-flex justify-center mb-3' >
                                    <img src={icon12} alt='' className='h-[56px] w-[56px]' />
                                </div>
                                <h2 className="h6 mb-1">Address</h2>
                                <p className="mb-0 text_secondary px-lg-4">903, Aspin Commercial tower, Sheikh Zayed Road, Dubai , UAE</p>
                            </div>
                        </div>

                        <div className="col-sm-6 col-md-4 col-xl-3 ">
                            <div className="py-4 min-[768px]:border-e">
                                <div className='d-flex justify-center mb-3' >
                                    <img src={icon13} alt='' className='h-[56px] w-[56px]' />
                                </div>
                                <h3 className="h6 mb-1">Email</h3>
                                <p className="mb-0 text_secondary">sales@company.com</p>
                            </div>
                        </div>

                        <div className="col-sm-6 col-md-4 col-xl-3">
                            <div className="py-4">
                                <div className='d-flex justify-center mb-3' >
                                    <img src={icon14} alt='' className='h-[56px] w-[56px]' />
                                </div>
                                <h3 className="h6 mb-1">Phone Number</h3>
                                <p className="mb-0 text_secondary">+97009888292</p>
                            </div>
                        </div>
                    </div>
                    <Row className="align-items-center justify-center pb-5">
                        <Col
                            lg={8}
                            md={{ size: 6, order: 1 }}
                            xs={{ order: 2 }}
                            className="mt-4 mt-sm-0 pt-2 pt-sm-0">
                            <Card className="custom-form rounded shadow border-0 rounded-4 py-3">
                                <CardHeader className="bg-transparent border-0">
                                    <h4 className="inter_semibold">Get In Touch !</h4>
                                </CardHeader>
                                <CardBody>
                                    <Form>
                                        <Row>
                                            <Col lg={6}>
                                                <div className="mb-4">
                                                    <Label className="form-label text-sm">
                                                        Your Name <span className="text-danger">*</span>
                                                    </Label>
                                                    <div className="form-icon position-relative">
                                                        <i>
                                                            <User className="fea icon-sm icons" />
                                                        </i>
                                                    </div>
                                                    <Input
                                                        name="name"
                                                        id="name"
                                                        type="text"
                                                        className="form-control ps-5"
                                                        placeholder="Name :"
                                                        required
                                                    />
                                                </div>
                                            </Col>
                                            <Col lg={6}>
                                                <div className="mb-4">
                                                    <Label className="form-label text-sm">
                                                        Your Email <span className="text-danger">*</span>
                                                    </Label>
                                                    <div className="form-icon position-relative">
                                                        <i>
                                                            <Mail className="fea icon-sm icons" />
                                                        </i>
                                                    </div>
                                                    <Input
                                                        name="email"
                                                        id="email"
                                                        type="email"
                                                        className="form-control ps-5"
                                                        placeholder="Email :"
                                                        required
                                                    />
                                                </div>
                                            </Col>
                                            <Col lg={6}>
                                                <div className="mb-4">
                                                    <Label className="form-label text-sm">
                                                        Your Phone Number <span className="text-danger">*</span>
                                                    </Label>
                                                    <div className="form-icon position-relative">
                                                        <i>
                                                            <Phone className="fea icon-sm icons" />
                                                        </i>
                                                    </div>
                                                    <PhoneInput
                                                        required={true}
                                                        country={'pk'}
                                                        enableAreaCodes={true}
                                                        enableSearch={true}
                                                        disableSearchIcon={true}
                                                        containerClass=" rounded-4"
                                                        inputClass='w-100  h-auto'
                                                        buttonClass="bg-transparent border-0"
                                                    />
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <div className="mb-4">
                                                    <Label className="form-label text-sm">Subject</Label>
                                                    <div className="form-icon position-relative">
                                                        <i>
                                                            <Book className="fea icon-sm icons" />
                                                        </i>
                                                    </div>
                                                    <Input
                                                        name="subject"
                                                        id="subject"
                                                        className="form-control ps-5"
                                                        placeholder="Subject :"
                                                        required
                                                    />
                                                </div>
                                            </Col>
                                            <Col lg={12}>
                                                <div className="mb-4">
                                                    <Label className="form-label text-sm">Comments</Label>
                                                    <div className="form-icon position-relative">
                                                        <i>
                                                            <MessageCircle className="fea icon-sm icons" />
                                                        </i>
                                                    </div>
                                                    <textarea
                                                        name="comments"
                                                        id="comments"
                                                        rows="4"
                                                        className="form-control ps-5"
                                                        placeholder="Message :"
                                                    ></textarea>
                                                </div>
                                            </Col>
                                        </Row>
                                        <div className="">
                                            <button type="button" className="btn btn-dark px-4 rounded-5 inter_regular">
                                                Submit
                                            </button>
                                        </div>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
            {/* <ThemeSwitcher /> */}
        </React.Fragment >
    );
}
export default ContactUs;
