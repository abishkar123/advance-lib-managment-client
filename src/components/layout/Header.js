import { Container, Button } from "react-bootstrap/"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import { useNavigate } from "react-router-dom"

export const Header = ({ currentUser }) => {
  const navigate = useNavigate()
  const handleLogout = () => {
    sessionStorage.removeItem("user")
    navigate("/")
  }
  return (
    <Navbar bg="info" expand="md">
      <Container>
        <Navbar.Brand href="#home">Library Mgmt.</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {currentUser?._id ? (
              <div className="d-flex align-items-center gap-2">
                <i className="fa-solid fa-user"></i> Hi {currentUser?.fName}!
                <Button onClick={() => handleLogout()}>Logout</Button>
              </div>
            ) : (
              <>
                {" "}
                <Nav.Link href="/">
                  <i className="fa-solid fa-user"></i> Login
                </Nav.Link>
                <Nav.Link href="/register">
                  <i className="fa-solid fa-pen-to-square"></i> Sign Up
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
