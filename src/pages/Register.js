import React, { useState } from "react"
import { DefaultLayout } from "../components/layout/DefaultLayout"
import { Button, Container, Row, Col, Form } from "react-bootstrap"
import { InputeField } from "../components/InputeField/InputeField"
import { toast } from "react-toastify"
import { postNewUser } from "../helpers/axiosHelper"

const Register = () => {
  const [form, setForm] = useState({})

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: value,
    })
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    const { confirmPassword, ...rest } = form
    if (confirmPassword !== rest.password) {
      return alert("Password do not match")
    }
    const { status, message } = await postNewUser(rest)

    toast[status](message)
  }

  const inputs = [
    {
      label: "First Name",
      name: "fName",
      type: "text",
      placeholder: "Sam",
      required: true,
    },
    {
      label: "Last Name",
      name: "lName",
      type: "text",
      placeholder: "Smith",
      required: true,
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Sam@eamil.com",
      required: true,
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "*******",
      required: true,
    },
    {
      label: "Confirm Password",
      name: "confirmPassword",
      type: "password",
      placeholder: "*******",
      required: true,
    },
  ]

  return (
    <DefaultLayout>
      <Container>
        <Row className="mt-5">
          <Col className="md-6 p-5 text-center reg-info d-flex align-items-center d-none d-md-block">
            <div>
              <h1>Welcome to our system</h1>
              <hr />

              <p>
                Register with our and acces our library management system. You
                can view and borrow the books.
              </p>
            </div>
          </Col>
          <Col className="bg-primary p-5">
            <div className="bg-light p-4 rounded">
              <Form onSubmit={handleOnSubmit}>
                <h2>Register Now!</h2>
                <hr />

                {inputs.map((item, i) => (
                  <InputeField key={i} {...item} onChange={handleOnChange} />
                ))}

                <Form.Group className="mb-3">
                  <Form.Select name="role" onChange={handleOnChange} required>
                    <option value="">Select an option</option>
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="I agree the T&Cs"
                    required
                  />
                </Form.Group>
                <p className="d-grid">
                  <Button variant="primary" type="submit">
                    Register
                  </Button>
                </p>
              </Form>

              <div className="text-end mt-3">
                Already have an account <a href="/">Login Now</a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </DefaultLayout>
  )
}

export default Register
