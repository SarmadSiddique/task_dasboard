/* eslint-disable no-unused-vars */
// React Basic and Bootstrap
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Container,
    Row,
    Col,
    Form,
    Label,
    Input,
    Button,
    Card,
    CardBody,
    FormFeedback,
} from "reactstrap";

import * as Yup from "yup";
import { useFormik } from "formik";
import { ArrowLeft, Key, User } from "react-feather";
import { useDispatch } from "react-redux";
import { Login } from "../api/signup";
import { Spinner } from "react-bootstrap";
import { handleLogin, handleUserData, setLogin, setTempUserData, setToken } from "../redux/loginForm";
import { message } from "antd";
import { handleError } from './../api/errorHandler';

const LoginPage = () => {
    const dispatch = useDispatch()
    const [isLoading, setisLoading] = useState(false)
    const navigate = useNavigate()

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string("Enter your email").email("Enter a valid email").required("Email is required"),
            password: Yup.string()
                .min(8, 'Password must be at least 8 characters').max(15, 'Maximum 15 characters allow')
                .required("Please Enter Password")
        }),
        onSubmit: async (values, { resetForm }) => {
            // setisLoading(true)
            const data = {
                email: (values.email).toLowerCase(),
                password: values.password,
            }
            dispatch(setLogin(true));
            // await Login(data)
            //     .then((result) => {
            //         if (result.success) {
            //             navigate("/", { state: { data: 'true' } });
            //             window.localStorage.setItem('loged', true)
            //             message.success(result.message)
            //             dispatch(setLogin(true));
            //             dispatch(setToken(result.token))
            //             setisLoading(false)
            //             localStorage.setItem('accessToken', result?.accessToken);
            //             localStorage.setItem('refreshToken', result?.refreshToken);
            //             dispatch(handleLogin(result.user))
            //             dispatch(setTempUserData(null))
            //             dispatch(handleUserData(Math.random()))
            //             resetForm()
            //         } else {
            //             setisLoading(false)
            //             handleError(result)
            //         }
            //     }).catch((err) => {
            //         setisLoading(false)
            //         handleError(err)
            //     }).finally(() => {
            //         setisLoading(false)
            //     })
        }
    });

    return (
        <React.Fragment>
            <section className="cover-user bg-light">
                <Container fluid className="px-0 ">
                    <div className=" min-vh-100 d-flex align-items-center justify-content-center">
                        <Card
                            className=" px-lg-4 px-3 py-5  border-0 rounded-4  max-w-[30rem]"
                            style={{ zIndex: "1" }}>
                            <CardBody className="p-0 py-3">
                                <h4 className="inter_medium text-center">Login</h4>
                                <Form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        validation.handleSubmit();
                                        return false;
                                    }}
                                    className=" mt-4" >
                                    <Row>
                                        <Col lg={12}>
                                            <div className="mb-3">
                                                <Label className="form-label text-sm" htmlFor="email">
                                                    Your Email{" "}
                                                    <span className="text-danger">*</span>
                                                </Label>
                                                <Input
                                                    type="text"
                                                    className="form-control"
                                                    name="email"
                                                    id="email"
                                                    placeholder="Email"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.email || ""}
                                                    invalid={
                                                        validation.touched.email && validation.errors.email ? true : false
                                                    }
                                                />
                                                {validation.touched.email && validation.errors.email ? (
                                                    <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                                                ) : null}
                                            </div>
                                        </Col>

                                        <Col lg={12}>
                                            <div className="mb-3">
                                                <Label className="form-label text-sm" htmlFor="password">
                                                    Password {" "}
                                                    <span className="text-danger">*</span>
                                                </Label>
                                                <Input
                                                    type="password"
                                                    className="form-control"
                                                    name="password"
                                                    id="password"
                                                    placeholder="Password"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.password || ""}
                                                    invalid={
                                                        validation.touched.password && validation.errors.password ? true : false
                                                    }
                                                />
                                                {validation.touched.password && validation.errors.password ? (
                                                    <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                                                ) : null}
                                                <div className="text-end mt-1">
                                                    <Link to={'/forgot-password'} className="link-danger text-xs inter_medium">Forgot Password</Link>
                                                </div>
                                            </div>
                                        </Col>

                                        <Col lg={12} className="mb-0 mt-3">
                                            <div className="d-grid">
                                                <button className="btn btn-dark bg-dark text-white hover:opacity-90" disabled={isLoading} type="submit">
                                                    {isLoading ? <Spinner size="sm"></Spinner> :
                                                        "Sign in"}
                                                </button>
                                            </div>
                                        </Col>

                                        <Col className="text-center">
                                            <p className="mb-0 mt-3">
                                                <small className="text-dark me-2">
                                                    Don't have an account ?
                                                </small>{" "}
                                                <Link
                                                    to="/signup"
                                                    className="text-dark inter_medium"
                                                >
                                                    Sign Up
                                                </Link>
                                            </p>
                                        </Col>
                                    </Row>
                                </Form>
                            </CardBody>
                        </Card>
                    </div>
                </Container>
            </section>
        </React.Fragment>
    );
};
export default LoginPage;
