import React, { useState, useEffect } from 'react'
import { Row, Col, Table, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FixedNavbar from '../components/FixedNavbar';
import { updateEmployeeLeaveApplicationId, getAllEmployeeLeaveApplication, getMyLeaveApplication } from '../actions/leaveApplication'

import Header from '../components/Header';

const AllLeaveApplications = ({ history }) => {
//   const dispatch = useDispatch()

//   const userLogin = useSelector(state => state.userLogin)
//   const { userInfo } = userLogin

//   useEffect(() => {

//     if(!userInfo) {
//       history.push('/')
//     } 
//   }, [dispatch, history, userInfo])
const [leaveStatus, setLeaveStatus] = useState('')
     
const dispatch = useDispatch()

const userLogin = useSelector(state => state.userLogin)
const { userInfo } = userLogin

const myleaveDetailsEmpId = useSelector(state => state.myleaveDetailsEmpId)
const { loading, data, } = myleaveDetailsEmpId

const myLeaveUpdate = useSelector(state => state.myLeaveUpdate)
const {  error:errorUpdate, success:successUpdate } = myLeaveUpdate



useEffect(() => {

  if(!userInfo) {
	  history.push('/')
  } else {
	dispatch(getAllEmployeeLeaveApplication())
	console.log(data)

}
}, [dispatch, history, data, successUpdate, userInfo])





  return (
    <>     
    	<Row className='ml-4 mr-4 py-4 profilescreen-wrapper all-leaves'>
				<Col md={2} className='d-none d-md-block'>
          <FixedNavbar />
        </Col>
        <Col className='col-xs-12 col-md-10'>
          <Header />
					<h1 className='page-header'>LEAVE APPLICATIONS</h1>
					<Table bordered hover size="sm" className='myleave-table'>
        <thead>
          <tr>
		  <th>Name - Agent.ID</th>
		  <th>Email</th>
		  <th>Leave Type</th>
            <th>Date Applied</th>		
            <th>Duration</th>
            <th>Reason</th>
            <th>Status</th>
						<th>...</th>
          </tr>
        </thead>
        <tbody>
		{data.map(user => (
                <tr key={user._id}>
					<td>{user.email}</td>
					<td>{user.email}</td>
					<td>{user.leaveType}</td>
					<td>{user.fromDate}</td>
                    <td>{user.toDate}</td>
                    <td>{user.reasonForLeave}</td>
                    <td>{user.leaveStatus}
					<Form.Control as="select" defaultValue="Pending" custom className='approveleave-selectinput'>
								<option value="pending">Pending</option>
          			<option value="approved">Approved</option>
          			<option value="declined">Declined</option>
          			<option value="awaitingConfirmation">Awaiting Confirmation</option>
    					</Form.Control>
					</td>
					<td>
							<Button className='btn-sm'>
								Post
							</Button>
						</td>
                </tr>
            ))}
        </tbody>
      </Table>
      	</Col>
      </Row>
    </>
  )
}

export default AllLeaveApplications;