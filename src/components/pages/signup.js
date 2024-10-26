/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
// React Basic and Bootstrap
import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  Input,
  Label,
  Button,
  Card,
  CardBody,
  FormFeedback,
} from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";
// import profileAvatar from '../../assets/images/avatar/profileAvatar.png'
//Import Icons
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft, Key, Mail, MapPin, User, UserCheck } from "react-feather";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import { setTempUserData } from "../redux/loginForm";
import { sendCode } from "../api/signup";
import { uploadProfile } from "../api/uploadFile";
import { message } from "antd";
import { handleError } from "../api/errorHandler";
import { blog1, blog9 } from "../icons/icon";

const SignupPage = () => {
  const dispatch = useDispatch()
  const [isLoading, setisLoading] = useState(false)
  const [isLocation, setIsLocation] = useState(false)
  const navigate = useNavigate()
  const [selectedImage, setSelectedImage] = useState(null)
  const [profileName, setProfileName] = useState('')
  const [userType, setUserType] = useState('/user')
  const tempUserData = JSON.parse(window.sessionStorage.getItem('react_template_tempData'))
  const handleImage = async (e) => {
    const my_files = e.target.files[0];
    if (my_files) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(my_files);
      await uploadProfile(my_files)
        .then((result) => {
          if (result) {
            setProfileName(result.image)
          }
        }).catch((err) => {
          console.log(err)
        });
    }
  };
  useEffect(() => {
    if (tempUserData) {
      setProfileName(tempUserData?.profileImage)
      setUserType(tempUserData?.param)
    }
  }, [tempUserData]);
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: tempUserData?.firstName ? tempUserData?.firstName : "",
      lastName: tempUserData?.lastName ? tempUserData?.lastName : "",
      email: tempUserData?.email ? tempUserData?.email : "",
      password: tempUserData?.password ? tempUserData?.password : "",
      conPassword: tempUserData?.password ? tempUserData?.password : "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Please Enter First Name"),
      email: Yup.string()
        .email("Enter a valid email")
        .required("Email is required"),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required("Please Enter Password"),
      conPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Please confirm your password"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setisLoading(true)
      const data = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: (values.email).toLowerCase(),
        password: values.password,
        param: userType,
        profileImage: profileName ? profileName : "null",
      }
      await sendCode((values.email).toLowerCase())
        .then((result) => {
          if (result) {
            message.success(result.data.message)
            setSelectedImage(null)
            navigate("/code-verify");
            dispatch(setTempUserData(data))
            resetForm()
          } else {
            handleError(result)
          }
          setisLoading(false)
        }).catch((err) => {
          setisLoading(false)
          handleError(err)
        });
    }
  });
  return (
    <React.Fragment>
      <section className="bg-light">
        <Container fluid className="px-0 pt-5">
          <div className=" py-5 min-vh-100 h-100 d-flex align-items-center justify-content-center">
            <Card
              className="login_width px-lg-4 px-3 py-5  border-0 rounded-4 shadow"
              style={{ zIndex: 1 }}>
              <CardBody className="p-0">
                <h4 className="inter_medium text-center">Signup</h4>
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    validation.handleSubmit();
                    return false;
                  }}
                  className="login-form mt-2"
                >
                  <Row>
                    <Col md={12}>
                      <div className="mb-2">
                        <Label className="form-label text-sm" htmlFor="firstName">
                          Profle <span className="text-danger">*</span>
                        </Label>
                      </div>
                      <div className="d-flex justify-content-center mb-3">
                        <div className="position-relative">
                          {!profileName ? (
                            <div className="profile_img bg-light">
                              <div className="">
                                <img src={blog9} alt="" className="profile_image" />
                              </div>
                            </div>
                          ) : (
                            <div className="bg-light profile_img d-flex align-items-center justify-content-center">
                              <img
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "contain",
                                  borderRadius: "50%",
                                }}
                                src={selectedImage ? selectedImage : (profileName === 'null' ? selectedImage : global.BASEURL + "/" + profileName)}
                                alt="Selected"
                              />
                            </div>
                          )}
                          <Input
                            onChange={handleImage}
                            type="file"
                            className="innerFile"
                            name="profileImage"
                            id="profileImage"
                            accept="image/*"
                          />
                        </div>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="mb-3">
                        <Label className="form-label text-sm" for="firstName">
                          First name{" "}
                          <span className="text-danger">*</span>
                        </Label>
                        <div className="form-icon position-relative">
                          <i>
                            <User className="fea icon-sm icons" />
                          </i>
                        </div>
                        <Input
                          type="text"
                          className="form-control ps-5"
                          name="firstName"
                          id="firstName"
                          placeholder="First Name"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.firstName || ""}
                          invalid={
                            validation.touched.firstName && validation.errors.firstName ? true : false
                          }
                        />
                        {validation.touched.firstName && validation.errors.firstName ? (
                          <FormFeedback type="invalid">{validation.errors.firstName}</FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="mb-3">
                        <Label className="form-label text-sm" for="lastName">
                          Last name{" "}
                          <span className="text-danger">*</span>
                        </Label>
                        <div className="form-icon position-relative">
                          <i>
                            <UserCheck className="fea icon-sm icons" />
                          </i>
                        </div>
                        <Input
                          type="text"
                          className="form-control ps-5"
                          name="lastName"
                          id="lastName"
                          placeholder="Last Name"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.lastName || ""}
                          invalid={
                            validation.touched.lastName && validation.errors.lastName ? true : false
                          }
                        />
                        {validation.touched.lastName && validation.errors.lastName ? (
                          <FormFeedback type="invalid">{validation.errors.lastName}</FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    <Col md={12}>
                      <div className="mb-3">
                        <Label className="form-label text-sm" for="email">
                          Your Email{" "}
                          <span className="text-danger">*</span>
                        </Label>
                        <div className="form-icon position-relative">
                          <i>
                            <Mail className="fea icon-sm icons" />
                          </i>
                        </div>
                        <Input
                          type="text"
                          className="form-control ps-5"
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

                    <Col md={12}>
                      <div className="mb-3">
                        <Label className="form-label text-sm" for="password">
                          Password
                          <span className="text-danger">*</span>
                        </Label>
                        <div className="form-icon position-relative">
                          <i>
                            <Key className="fea icon-sm icons" />
                          </i>
                        </div>
                        <Input
                          type="password"
                          className="form-control ps-5"
                          name="password"
                          id="password"
                          placeholder="Password"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.password || ""}
                          invalid={
                            validation.touched.password && validation.errors.password ? true : false
                          } />
                        {validation.touched.password && validation.errors.password ? (
                          <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    <Col md={12}>
                      <div className="mb-2">
                        <Label className="form-label text-sm" htmlFor="password">
                          Confirm Password <span className="text-danger">*</span>
                        </Label>
                        <div className="form-icon position-relative">
                          <i>
                            <Key className="fea icon-sm icons" />
                          </i>
                        </div>
                        <Input
                          type="password"
                          className="form-control ps-5"
                          name="conPassword"
                          id="conPassword"
                          placeholder="confirm password"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.conPassword || ""}
                          invalid={
                            validation.touched.conPassword &&
                              validation.errors.conPassword
                              ? true
                              : false
                          }
                        />
                        {validation.touched.conPassword &&
                          validation.errors.conPassword ? (
                          <FormFeedback type="invalid">
                            {validation.errors.conPassword}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    <Col md="12">
                      <div className="d-grid mt-3">
                        <Button color="dark" className="text-white bg-dark hover:opacity-90" disabled={isLoading || isLocation} type="submit">
                          {isLoading ? <Spinner size="sm"></Spinner> :
                            "Register"}
                        </Button>
                      </div>
                    </Col>

                    <div className="mx-auto">
                      <p className="mb-0 mt-3">
                        <small className="text-dark me-2">
                          Already have an account ?
                        </small>{" "}
                        <Link
                          to="/login"
                          className="text-dark inter_medium"
                        >
                          Sign In
                        </Link>
                      </p>
                    </div>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </div>
        </Container>
      </section>

    </React.Fragment >
  );
}
export default SignupPage;
