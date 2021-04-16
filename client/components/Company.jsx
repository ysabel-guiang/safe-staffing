import React from 'react'
import { Card, Grid, Header, Icon, Progress, Button, Modal, Form, Input, Radio, Select, Dropdown } from 'semantic-ui-react'


const Company = () => {
  const [taskOpen, setTask] = React.useState(false)
  const [employeeOpen, setEmployee] = React.useState(false)

  const options = [
    { key: 'angular', text: 'Angular', value: 'angular' },
    { key: 'css', text: 'CSS', value: 'css' },
    { key: 'design', text: 'Graphic Design', value: 'design' },
    { key: 'ember', text: 'Ember', value: 'ember' },
    { key: 'html', text: 'HTML', value: 'html' },
    { key: 'ia', text: 'Information Architecture', value: 'ia' },
    { key: 'javascript', text: 'Javascript', value: 'javascript' },
    { key: 'mech', text: 'Mechanical Engineering', value: 'mech' },
    { key: 'meteor', text: 'Meteor', value: 'meteor' },
    { key: 'node', text: 'NodeJS', value: 'node' },
    { key: 'plumbing', text: 'Plumbing', value: 'plumbing' },
    { key: 'python', text: 'Python', value: 'python' },
    { key: 'rails', text: 'Rails', value: 'rails' },
    { key: 'react', text: 'React', value: 'react' },
    { key: 'repair', text: 'Kitchen Repair', value: 'repair' },
    { key: 'ruby', text: 'Ruby', value: 'ruby' },
    { key: 'ui', text: 'UI Design', value: 'ui' },
    { key: 'ux', text: 'User Experience', value: 'ux' },
  ]
  
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
        <Card>
          <Card.Content>
            <Card.Header>Matthew</Card.Header>
            <Card.Description>
              Role: Technician
            </Card.Description>
            <Card.Description>
              Email: Mathew.joins@yahoo.com
            </Card.Description>
            <Card.Description>
              Contact: 2398120831
            </Card.Description>
          </Card.Content>
          <Card.Content extra textAlign='center'>
            <Button compact primary>Edit</Button>
            <Button compact secondary>Assign Task</Button>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content>
            <Card.Header>Matthew</Card.Header>
            <Card.Description>
              Role: Technician
            </Card.Description>
            <Card.Description>
              Email: Mathew.joins@yahoo.com
            </Card.Description>
            <Card.Description>
              Contact: 2398120831
            </Card.Description>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content>
            <Card.Header>Matthew</Card.Header>
            <Card.Description>
              Role: Technician
            </Card.Description>
            <Card.Description>
              Email: Mathew.joins@yahoo.com
            </Card.Description>
            <Card.Description>
              Contact: 2398120831
            </Card.Description>
          </Card.Content>
        </Card>

      </Card.Group>
      
      <Modal
        onClose={() => setEmployee(false)}
        onOpen={() => setEmployee(true)}
        open={employeeOpen}
        trigger={<button class="ui button">Add Team Member</button>}
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
        trigger={<button class="ui button">Assign a Task</button>}
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
      
      <Header as='h5'>
        Matthew
        <Header.Subheader>
          Technician
        </Header.Subheader>
      </Header>
      <Progress percent={44} color='blue' progress/>

      <Header as='h5'>
        Matthew
        <Header.Subheader>
          Technician
        </Header.Subheader>
      </Header>
      <Progress percent={44} color='blue' progress/>

      <Header as='h5'>
        Matthew
        <Header.Subheader>
          Technician
        </Header.Subheader>
      </Header>
      <Progress percent={44} color='blue' progress/>

      <Header as='h5'>
        Matthew
        <Header.Subheader>
          Technician
        </Header.Subheader>
      </Header>
      <Progress percent={44} color='blue' progress/>

    </Grid.Column>
    </>
  )
}

export default Company
