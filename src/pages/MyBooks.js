import React, { useEffect, useState } from "react"
import { Button, Container, Row, Table } from "react-bootstrap"
import { toast } from "react-toastify"
import DashboardLayout from "../components/layout/DashboardLayout"
import { getBorrowedBooks, returnBook } from "../helpers/axiosHelper"

const MyBooks = () => {
  const [books, setBooks] = useState([])
  const fetchBooksBorrowed = async () => {
    const response = await getBorrowedBooks()
    setBooks(response)
  }
  useEffect(() => {
    fetchBooksBorrowed()
  }, [])

  const handleReturn = async (bookId) => {
    if (window.confirm("Are you sure you want to return this book?")) {
      const { status, message } = await returnBook(bookId)

      status === "success"
        ? toast.success(message) && fetchBooksBorrowed()
        : toast.error(message)
    }
  }
  return (
    <DashboardLayout>
      <Container>
        <Row className="p-5">
          <Table striped bordered hover>
            <thead>
              <tr className="text-center">
                <th>#</th>
                <th>Book</th>
                <th>Title</th>
                <th>Author</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, i) => (
                <tr key={book._id} className="text-center">
                  <td>{i + 1}</td>
                  <td style={{ width: "15%" }}>
                    <img src={book.thumbnail} alt="" style={{ width: "35%" }} />
                  </td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleReturn(book._id)}
                    >
                      Return Book
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>
      </Container>
    </DashboardLayout>
  )
}

export default MyBooks
