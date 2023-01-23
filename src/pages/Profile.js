import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import DashboardLayout from '../components/layout/DashboardLayout'
import { toast } from "react-toastify"
import { updatePassword } from '../helpers/axiosHelper';


const Profile = () => {
    const [user, setUser] = useState()
    const [ showForm, SetShowForm] = useState(false)
    const [formDate, setformDate] = useState({})
    useEffect(() =>{
        const u =JSON.parse(sessionStorage.getItem("user"))
        setUser(u)
        
    },[])
    

   const  handleChange = (e)=>{
        const {name,value}=e.target
        setformDate({
            ...formDate,
            [name]:value,
        })
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        const { currentPassword, password, confirmPassword} = formDate
        if(confirmPassword !==password){
            return toast.error("confirm password and passowrd do not match")
        }
        const {status, message} = await updatePassword({
            currentPassword,
            password,
        })
        toast[status](message)
    }
  return (
    
        <DashboardLayout>
            <Modal show={showForm} onHide={() =>SetShowForm(false)}>
             <Modal.Header>
                <Modal.Title>update password</Modal.Title>
             </Modal.Header>
             <Modal.Body>
                <div className='p-3'>
                    <Form>
                        <Form.Group className='mb-3'>
                        <Form.Label> Current Password</Form.Label>
                        <Form.Control
                        type='password'
                        name="currnetPassword"
                        placeholder='enter the cureent password'
                        onChange={handleChange}/>
                    
                        </Form.Group>

                        <Form.Group className='mb-3'>
                        <Form.Label> New Password</Form.Label>
                        <Form.Control
                        type='password'
                        name="password"
                        placeholder='enter the new password'
                        onChange={handleChange}/>
                        </Form.Group>

                        <Form.Group className='mb-3'>
                        <Form.Label> Confirm Password</Form.Label>
                        <Form.Control
                        type='password'
                        name="confirmPassword"
                        placeholder='Re-enter new assword'
                        onChange={handleChange}/>
                        </Form.Group>
                    
                     <Form.Group>
                        <Button variant="info" type='submit' onSubmit={handleSubmit}>Update Password</Button>
                     </Form.Group>
                    
                    </Form>
                </div>
             </Modal.Body>
            </Modal>
            <Container>
                <Row className="p-5">
                    <Col md ={8}>
                        <div>
                            <ul>
                                <li>
                                    <strong> Profile ID:</strong>
                                    {user?._id}
                                </li>
                                <li>
                                    <strong>Name:</strong>
                                    {`${user?.fName} ${user?.lName}`}
                                </li>
                                <li>
                                    <strong>Email:</strong>
                                    {user?.email}
                                </li>
                                <li>
                                    <strong> Status:</strong>
                                <span
                                    className={user?.status==="Active" ? "text-center":"text-danger"}>
                                    {user?.status}
                                </span>
                                </li>
                        

                            </ul>
                        </div>
                    </Col>
                    <Col md={8} className="d-flex align-items-center">
                        <Button variant='dark' onClick={() =>SetShowForm(true)}>Update password</Button>
        

                    </Col>

                </Row>
            </Container>

        </DashboardLayout>
        

  )
}

export default Profile