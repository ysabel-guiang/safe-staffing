import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Card, Grid, Header, Icon, Progress, Button, Modal, Form, Input, Radio, Select, Dropdown, DropdownItem } from 'semantic-ui-react'

import { getTeamMembers, addMember, addTask, updateHours } from '../apiClient'

const initialMemberData = {
  name: '',
  role: '',
  email: '',
  contact: ''
}

const initialTaskData = {
  taskName: '',
  hoursWork: 0,
  employees: [],
  urgency: 0 
}

const hoursWork = []

for(let i = 0.25; i < 27; i+=0.25) {
  hoursWork.push({
    key: i,
    text: i + ' hours',
    value: i 
  })
}

const Company = (props) => {
  const { teamId } = props.match.params

  const [taskOpen, setTaskBar] = useState(false)
  const [employeeOpen, setEmployeeBar] = useState(false)
  const [teamMembers, setMembers] = useState([{employeeId:'', role: '', name: '', contact: '', email: '', hours: ''}])
  const [newMember, setNewMember] = useState(initialMemberData)
  const [newTask, setNewTask] = useState (initialTaskData)

  useEffect(() => {
    viewTeamMembers()
  }, [])

  function viewTeamMembers () {
    getTeamMembers(teamId)
      .then(members => {
        setMembers(members)
        console.log(members)
      })
      .catch(err => {
        console.error(err.message)
      })
  }

  const memberOptions = teamMembers.map(member => { 
    return {
      key: member.employeeId,
      text: member.name,
      value: member.employeeId
    }})

  function handleMemberChange (evt) {
    setNewMember(
      {...newMember,
       [evt.target.name]: evt.target.value
      })
  }

  function handleMemberSubmit (evt) {
    setEmployeeBar(false)
    evt.preventDefault()

    addMember(teamId, newMember)
      .then(() => {
        setNewMember(initialMemberData)
        viewTeamMembers()
        return null
      })
      .catch(e => 
        console.log('new team member not sent'))
  }

  function handleTaskChange (evt, result) {
    const { name, value } = result || evt.target
    setNewTask({...newTask,
      [name]: value
    })
  }

  function handleTaskSubmit (evt) {
    setTaskBar(false)
    evt.preventDefault()
    console.log('trying')

    addTask(teamId, newTask)
      .then(() => {
        updateHours(teamId, newTask)
          .then(() => {
            setNewTask(initialTaskData)
            console.log('working')
            viewTeamMembers()
            return null
          })
          .catch(err => 
            console.log('not sending task'))
      })
      .catch(err => 
      console.log('not sending task'))
  }


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
        <Button compact primary as={ Link } to={'/' + teamId +'/' + member.employeeId}>Edit</Button>
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
        <Icon name='building' />
        <Header.Content>{teamMembers[0].teamName}</Header.Content>
      </Header>

      <Header as='h4'>
        <Icon name='group' />
        <Header.Content>Team Members</Header.Content>
      </Header>

      <Card.Group itemsPerRow={3}>
        {listTeamMemberCards()}
      </Card.Group>
      
      <Modal
        onClose={() => setEmployeeBar(false)}
        onOpen={() => setEmployeeBar(true)}
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
                  onChange={handleMemberChange}
                />
                <Form.Field
                  control={Input}
                  label='Role'
                  placeholder='Role'
                  name='role'
                  onChange={handleMemberChange}
                />
              </Form.Group>

              <Form.Group widths='equal'>
                <Form.Field
                  control={Input}
                  label='Email Address'
                  placeholder='Email Address'
                  name='email'
                  onChange={handleMemberChange}
                />
                <Form.Field
                  control={Input}
                  label='Contact Number'
                  placeholder='Contact Number'
                  name='contact'
                  onChange={handleMemberChange}
                />
              </Form.Group>
            </Form>
          </Modal.Description>
         </Modal.Content>

         <Modal.Actions>
          <Button color='black' onClick={() => setEmployeeBar(false)}>
            Cancel
          </Button>

          <Button
            content="Add Team Member"
            labelPosition='right'
            icon='checkmark'
            onClick={handleMemberSubmit}
            positive
          />
        </Modal.Actions> 
      </Modal>

      <Header as='h4'>
        <Icon name='hourglass half' />
        <Header.Content>Tasks</Header.Content>
      </Header>

      <Modal
        onClose={() => setTaskBar(false)}
        onOpen={() => setTaskBar(true)}
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
                  name='taskName'
                  onChange={handleTaskChange}
                />
                <Form.Field
                control={Dropdown}
                multiple selection
                label='Who will be doing this task?'
                placeholder='Employees'
                name='employees'
                options={memberOptions}
                value={newTask.employees}
                onChange={handleTaskChange}
                />

              </Form.Group>

              <Form.Group inline>
                <Form.Field
                    control={Select}
                    label='How long will the task take?'
                    name='hoursWork'
                    placeholder='Time'
                    options={hoursWork}
                    value={newTask.hoursWork}
                    onChange={handleTaskChange}
                  />
                <label>Urgency</label>
                <Form.Field
                  control={Radio}
                  name='urgency'
                  label='Not Urgent'
                  value={0}
                  onChange={handleTaskChange}
                />
                <Form.Field
                  control={Radio}
                  name='urgency'
                  label='Medium Urgency'
                  value={0.5}
                  onChange={handleTaskChange}
                />
                <Form.Field
                  control={Radio}
                  name='urgency'
                  label='Urgent'
                  value={0}
                  onChange={handleTaskChange}
                />
             </Form.Group>
            </Form>
          </Modal.Description>
         </Modal.Content>

         <Modal.Actions>
          <Button color='black' onClick={() => setTaskBar(false)}>
            Cancel
          </Button>

          <Button
            content="Assign Task"
            labelPosition='right'
            icon='checkmark'
            onClick={handleTaskSubmit}
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

