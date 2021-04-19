import React, {useState, useEffect} from 'react'
import { Card, Grid, Header, Icon, Progress, Button, Modal, Form, Input, Radio, Select, Dropdown } from 'semantic-ui-react'

import { getTeamMembers } from '../apiClient'


const Company = (props) => {
  const { teamId } = props.match.params

  const [taskOpen, setTask] = useState(false)
  const [employeeOpen, setEmployee] = useState(false)
  const [teamMembers, setMembers] = useState([{employeeId:'', role: '', name: '', contact: '', email: '', hours: ''}])

  useEffect(() => {
    getTeamMembers(teamId)
      .then(members => {
        setMembers(members)
      })
      .catch(err => {
        console.error(err.message)
      })
  }, [])

  const options = [
    { key: 'angular', text: 'Angular', value: 'angular' },
    { key: 'css', text: 'CSS', value: 'css' },
  ]

  //based on four day work week
  function hoursToPercentage (hours) {
    return Math.floor(hours / 27 * 100)
  }

  function listTeamMemberCards () {
    return teamMembers.map(member => 
      <Card key={member.employeeId}>
      <Card.Content>
        <Card.Header>{member.name}</Card.Header>
        <Card.Description>
          Role: {member.role}
        </Card.Description>
        <Card.Description>
          Email: {member.email}
        </Card.Description>
        <Card.Description>
          Contact: {member.contact}
        </Card.Description>
      </Card.Content>
      <Card.Content extra textAlign='center'>
        <Button compact primary>Edit</Button>
        <Button compact secondary>Assign Task</Button>
      </Card.Content>
    </Card> 
    )
  }

  function listTeamMemberTasks () {
    return teamMembers.map(member => 
      <>
        <Header as='h5' key={Number(member.employeeId) + 1}>
          {member.name}
          <Header.Subheader>
            {member.role}
          </Header.Subheader>
        </Header>
        <Progress percent={hoursToPercentage(member.hours)} color='blue' progress key={Number(member.employeeId) + 2}/>
      </>
    )
  }

  
  return (
    <>
    <Grid.Column width={10}> 
      <Header as='h2'>
        <Icon name='plug' />
        <Header.Content>Vodafone</Header.Content>
      </Header>

      <Header as='h4'>
        <Icon name='group' />
        <Header.Content>Employees</Header.Content>
      </Header>

      <Card.Group itemsPerRow={3}>
        {listTeamMemberCards()}
      </Card.Group>
      
      <Modal
        onClose={() => setEmployee(false)}
        onOpen={() => setEmployee(true)}
        open={employeeOpen}
        trigger={<button className="ui button">Add Team Member</button>}
       >
        <Modal.Header>Add a Team Member</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form>
              <Form.Group widths='equal'>
                <Form.Field
                  control={Input}
                  label='Full Name'
                  placeholder='Full Name'
                  name='name'
                />
                <Form.Field
                  control={Input}
                  label='Role'
                  placeholder='Role'
                  name='role'
                />
              </Form.Group>

              <Form.Group widths='equal'>
                <Form.Field
                  control={Input}
                  label='Email Address'
                  placeholder='Email Address'
                  name='email'
                />
                <Form.Field
                  control={Input}
                  label='Contact Number'
                  placeholder='Contact Number'
                  name='contact'
                />
              </Form.Group>
            </Form>
          </Modal.Description>
         </Modal.Content>

         <Modal.Actions>
          <Button color='black' onClick={() => setEmployee(false)}>
            Cancel
          </Button>

          <Button
            content="Add Team Member"
            labelPosition='right'
            icon='checkmark'
            onClick={() => setEmployee(false)}
            positive
          />
        </Modal.Actions> 
      </Modal>

      <Header as='h4'>
        <Icon name='hourglass half' />
        <Header.Content>Tasks</Header.Content>
      </Header>

      <Modal
        onClose={() => setTask(false)}
        onOpen={() => setTask(true)}
        open={taskOpen}
        trigger={<button className="ui button">Assign a Task</button>}
       >
        <Modal.Header>Assign a Task</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form>
              <Form.Group widths='equal'>
                <Form.Field
                  control={Input}
                  label='What is the Task?'
                  placeholder='Task'
                  name='task'
                />
                <Form.Field
                  control={Dropdown}
                  label='Who will be doing the task?'
                  name='employees'
                  placeholder='Employees'
                  multiple selection
                  options={options}
                />
              </Form.Group>

              <Form.Group inline>
                <Form.Field
                    control={Select}
                    label='How long will the task take?'
                    name='hours'
                    placeholder='Time'
                    options={options}
                  />
                <label>Urgency</label>
                <Form.Field
                  control={Radio}
                  name='urgency'
                  label='Not Urgent'
                  value='1'
                />
                <Form.Field
                  control={Radio}
                  name='urgency'
                  label='Medium Urgency'
                  value='2'
                />
                <Form.Field
                  control={Radio}
                  name='urgency'
                  label='Urgent'
                  value='3'
                />
             </Form.Group>
            </Form>
          </Modal.Description>
         </Modal.Content>

         <Modal.Actions>
          <Button color='black' onClick={() => setTask(false)}>
            Cancel
          </Button>

          <Button
            content="Assign Task"
            labelPosition='right'
            icon='checkmark'
            onClick={() => setTask(false)}
            positive
          />
        </Modal.Actions> 
      </Modal>
      
      {listTeamMemberTasks()}

    </Grid.Column>
    </>
  )
}

export default Company
