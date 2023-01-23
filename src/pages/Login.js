import React, { useState } from "react"
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { InputeField } from "../components/InputeField/InputeField"
import { DefaultLayout } from "../components/layout/DefaultLayout"
import { Link, useNavigate } from "react-router-dom"
import { loginUser } from "../helpers/axiosHelper"
import { toast } from "react-toastify"

const Login = () => {
  const [formData, setFormData] = useState({
    email:"raiabishkar0.5@gmail.com",
    password:"3333",
  })
  const navigate = useNavigate()

  const handleOnChange = (e) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault()

    const { status, message, user } = await loginUser(formData)
    toast[status](message)

    if (status === "success") {
      sessionStorage.setItem("user", JSON.stringify(user))
      navigate("/books")
    }
  }

  const inputs = [
    {
      label: "Email",
      name: "email",
      type: "text",
      placeholder: "sam@email.com",
      required: true,
      value:formData.email,
    },

    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "********",
      required: true,
      value:formData.password,
    },
  ]
  return (
    <DefaultLayout>
      <Container>
        <Row className="mt-5">
          <Col className="col-md-6 bg-primary p-5">
            <div className="bg-light p-4 rounded">
              <Form onSubmit={handleOnSubmit}>
                <h2 className="text-center">Login</h2>
                <hr />

                {inputs.map((input, i) => (
                  <InputeField key={i} {...input} onChange={handleOnChange} />
                ))}

                <div>
                  <Button variant="primary" type="submit">
                    Login
                  </Button>
                </div>
              </Form>

              <div className="text-center mt-3">
                Don't have an account? <Link to="/register">Register Now!</Link>
              </div>
            </div>
          </Col>

          <Col className="col-md-6 text-center reg-info d-flex align-items-center d-none d-md-flex">
            <div>
              <h1>Welcome to Library Management System</h1>
              <hr />
              <p>Login to view and start borrowing books</p>
            </div>
          </Col>
        </Row>
      </Container>
    </DefaultLayout>
  )
}

export default Login
