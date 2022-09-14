import React, { useState, useEffect } from 'react'
import { Grid, Header, Form, Button } from 'semantic-ui-react'

import { getEmployee, updateEmployee, deleteEmployee } from '../apiClient'

const initialMemberData = {
  employeeId: 1,
  name: '',
  role: '',
  email: '',
  contact: '',
}

function Edit(props) {
  const { teamId, employeeId } = props.match.params
  const [member, setMember] = useState(initialMemberData)

  useEffect(() => {
    getEmployee(teamId, employeeId)
      .then((result) => {
        setMember(result)
      })
      .catch((err) => console.log('unable to get employee'))
  }, [])

  function handleChange(evt) {
    setMember({ ...member, [evt.target.name]: evt.target.value })
  }

  function handleSubmit(evt) {
    evt.preventDefault()
    updateEmployee(member, teamId)
      .then(() => {
        4
        setMember(initialMemberData)
        props.history.push('/' + teamId)
      })
      .catch((err) => console.log('updated member not sent'))
  }

  function handleDelete(evt) {
    evt.preventDefault()
    deleteEmployee(employeeId, teamId)
      .then(() => {
        setMember(initialMemberData)
        props.history.push('/' + teamId)
      })
      .catch((err) => console.log('member not deleted'))
  }

  return (
    <>
      <Grid.Column width={7}>
        <Header as="h2">Name</Header>

        <Form>
          <Form.Field>
            <label>Full Name</label>
            <input
              name="name"
              placeholder={member.name}
              value={member.name}
              onChange={handleChange}
            />
          </Form.Field>

          <Form.Field>
            <label>Role</label>
            <input
              name="role"
              placeholder={member.role}
              value={member.role}
              onChange={handleChange}
            />
          </Form.Field>

          <Form.Field>
            <label>Email Address</label>
            <input
              name="email"
              placeholder={member.email}
              value={member.email}
              onChange={handleChange}
            />
          </Form.Field>

          <Form.Field>
            <label>Contact Number</label>
            <input
              name="contact"
              placeholder={member.contact}
              value={member.contact}
              onChange={handleChange}
            />
          </Form.Field>

          <Button onClick={handleDelete} negative>
            Delete Team Member
          </Button>
          <Button onClick={handleSubmit} positive floated="right">
            Save Changes
          </Button>
        </Form>
      </Grid.Column>
    </>
  )
}

export default Edit
