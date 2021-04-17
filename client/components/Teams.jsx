import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Card, Grid, Form, Modal, Button, Input, Header, Divider } from 'semantic-ui-react'

import { getTeams } from '../apiClient'


const Teams = () => {
  const [open, setOpen] = React.useState(false)
  const [teams, setTeams] = useState([{teamId:'',teamName: '', description:''}])

  useEffect(() => {
    getTeams()
      .then(teams => {
        setTeams(teams)
      })
      .catch(err => console.error('not working'))
  },[])

  function listTeams () {
    return teams.map(team => 
        <Card fluid color='red' key={team.teamId} header={team.teamName} description={team.description} as={ Link } to={"/" + team.teamId} />
    )
  }


  return (
    <>
    <Grid.Column width={9}> 
      <Card.Group>
        {listTeams()}

        <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Card fluid color='yellow' header='Create a Team'/>}
        >
          <Modal.Header>Create a Team</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Form>
                <Header as='h4'>Team Details</Header>
                <Form.Group widths='equal'>
                  <Form.Field
                    control={Input}
                    label='Team Name'
                    placeholder='Team Name'
                    name='teamName'
                  />
                  <Form.Field
                    control={Input}
                    label='Description'
                    placeholder='Description'
                    name='description'
                  />
                </Form.Group>

                <Header as='h4'>Team Member Details</Header>
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
            <Button color='black' onClick={() => setOpen(false)}>
              Cancel
            </Button>

            <Button
              content="Create Team"
              labelPosition='right'
              icon='checkmark'
              onClick={() => setOpen(false)}
              positive
            />
          </Modal.Actions> 
        </Modal>
      </Card.Group>

    </Grid.Column>
    </>
  )
}

export default Teams
  
