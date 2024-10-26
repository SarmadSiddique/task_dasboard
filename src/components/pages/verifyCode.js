/* eslint-disable no-unused-vars */
// React Basic and Bootstrap
import React, { useEffect, useState } from "react";
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
import { handleLogin, handleUserData, setLogin, setTempUserData, setToken } from "../redux/loginForm";
import { useDispatch, useSelector } from "react-redux";
import { createUser, sendCode } from "../api/signup";
import { Spinner } from "react-bootstrap";
import { message } from "antd";
const VerifyCode = () => {
  const dispatch = useDispatch()
  const [isLoading, setisLoading] = useState(false)
  const navigate = useNavigate()
  const tempUserData = JSON.parse(window.sessionStorage.getItem('react_template_tempData'))

  const [seconds, setSeconds] = useState(59);
  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);
    if (seconds === 0) {
      clearInterval(countdownInterval);
    }
    return () => clearInterval(countdownInterval);
  }, [seconds]);
  const resendCode = async () => {
    await sendCode(tempUserData?.email)
      .then((result) => {
        if (result) {
          setSeconds(59)
          message.success(result.message)
        } else {
          message.warning(result.message)
        }
        setisLoading(false)
      }).catch((err) => {
        setisLoading(false)
        message.error(err.response.data.error)
      });
  }
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      code: "",
    },
    validationSchema: Yup.object({
      code: Yup.string("Enter your code").required("code is required").length(5, "Code must be exactly 5 characters"),
    }),
    onSubmit: async (values, { resetForm }) => {
      dispatch(setLogin(true));
      const data = { ...tempUserData, code: values.code.toString() }
      setisLoading(true)
      await createUser(data)
        .then((result) => {
          if (result.success) {
            setisLoading(false)
            dispatch(handleLogin(result.user))
            dispatch(setTempUserData(null))
            dispatch(setToken(result.token))
            dispatch(handleUserData(Math.random()))
            resetForm()
            message.success(result.message)
            window.localStorage.setItem('loged', true)
            navigate("/", { state: { data: true } });
          } else {
            setisLoading(false)
            message.info(result.message)
          }
        }).catch((err) => {
          setisLoading(false)
          message.error(err.message)
        });
    }
  });

  return (
    <React.Fragment>
      <section className=" bg-light">
        <Container fluid className="px-0 ">
          <div className="  pt-5 min-vh-100 d-flex align-items-center justify-content-center">
            <Card
              className="login-page login_width w-100 px-lg-4 px-3 pb-5 pt-4 public-profile border-0 rounded shadow"
              style={{ zIndex: "1" }}
            >
              <div>
                <Link className="btn btn-dark p-0 btn1 rounded-circle" to={-1} style={{ height: "2.3rem", width: "2.3rem" }} ><ArrowLeft /></Link>
              </div>
              <CardBody className="p-0">
                <h5 className=" text-center inter_bold mb-1" >Code in Email</h5>
                <p className="text-center text-muted text-sm">We have forwarded a code to your email<br /> {tempUserData?.email} </p>
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    validation.handleSubmit();
                    return false;
                  }}
                  className="login-form mt-4"
                >
                  <Row>
                    <Col lg={12}>
                      <div className="mb-3">
                        <Label className="form-label text-sm" htmlFor="code">
                          Enter code{" "}
                          <span className="text-danger">*</span>
                        </Label>
                        <Input
                          type="number"
                          className="form-control"
                          name="code"
                          id="code"
                          disabled={seconds === 0 && true}
                          placeholder="Enter code"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.code || ""}
                          invalid={
                            validation.touched.code && validation.errors.code ? true : false
                          }
                        />
                        {validation.touched.code && validation.errors.code ? (
                          <FormFeedback type="invalid">{validation.errors.code}</FormFeedback>
                        ) : null}
                        <div className="text-danger pt-2" style={{ fontSize: "14px" }}>{`${seconds} ${seconds === 1 ? 'second' : 'seconds'} to code expiration `} {seconds === 0 && <Link className="link-danger underline" style={{ fontSize: "14px" }} onClick={resendCode}>Resend code</Link>}</div>
                      </div>
                    </Col>
                    <Col lg={12} className="mb-0">
                      <div className="d-grid">
                        <Button color="dark" className="bg-dark text-white hover:opacity-90" disabled={isLoading} type="submit">
                          {isLoading ? <Spinner size="sm"></Spinner> :
                            "Verify Code"}
                        </Button>
                      </div>
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
export default VerifyCode;
