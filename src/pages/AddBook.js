import React, { useState } from "react"
import { Button, Col, Form, Spinner } from "react-bootstrap"
import DashboardLayout from "../components/layout/DashboardLayout"
import img from "../assets/reg-bg.jpg"
import { addBook } from "../helpers/axiosHelper"
import { toast } from "react-toastify"

const initialState = {
  title: "",
  author: "",
  year: "",
  isbn: "",
  thumbnail: "",
}

const AddBook = () => {
  const [formData, setFormData] = useState(initialState)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const { status, message } = await addBook(formData)

    if (status) {
      setIsLoading(false)
      setFormData(initialState)
      return toast[status](message)
    }
  }

  return (
    <DashboardLayout>
      <div className="add">
        <div className="add-top">
          <h1>Add Book</h1>
        </div>

        <div className="add-bottom">
          <Col md={7} className="d-none d-sm-block">
            <img src={img} alt="img" style={{ width: "100%" }} />
          </Col>

          <Col md={5} sm={12}>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-2">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  placeholder="Book Title"
                  required
                  type="text"
                  name="title"
                  onChange={handleChange}
                  value={formData.title}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Author</Form.Label>
                <Form.Control
                  placeholder="Author"
                  required
                  type="text"
                  name="author"
                  onChange={handleChange}
                  value={formData.author}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>ISBN</Form.Label>
                <Form.Control
                  placeholder="ISBN"
                  required
                  type="text"
                  name="isbn"
                  onChange={handleChange}
                  value={formData.isbn}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Year Published</Form.Label>
                <Form.Control
                  placeholder="Year"
                  required
                  type="number"
                  name="year"
                  onChange={handleChange}
                  value={formData.year}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Thumbnail</Form.Label>
                <Form.Control
                  placeholder="Book Image URL"
                  required
                  type="text"
                  name="thumbnail"
                  onChange={handleChange}
                  value={formData.thumbnail}
                />
              </Form.Group>

              <Button
                variant="info"
                type="submit"
                className="mt-4 d-flex align-items-center gap-3"
              >
                ADD BOOK{" "}
                <span>
                  {isLoading && <Spinner animation="border" variant="dark" />}
                </span>
              </Button>
            </Form>
          </Col>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default AddBook
