import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Card,
  Grid,
  Form,
  Modal,
  Button,
  Input,
  Header,
} from 'semantic-ui-react'

import { getTeams, addTeam } from '../apiClient'

const initialNewTeamData = {
  teamName: '',
  description: '',
  name: '',
  role: '',
  email: '',
  contact: '',
}

const Teams = () => {
  const [open, setOpen] = useState(false)
  const [teams, setTeams] = useState([
    { teamId: '', teamName: '', description: '' },
  ])
  const [newTeam, setNewTeam] = useState(initialNewTeamData)

  useEffect(() => {
    viewTeams()
  }, [])

  function viewTeams() {
    getTeams()
      .then((teams) => {
        setTeams(teams)
      })
      .catch((err) => console.error('not working'))
  }

  function handleChange(evt) {
    setNewTeam({ ...newTeam, [evt.target.name]: evt.target.value })
  }

  function handleSubmit(evt) {
    setOpen(false)
    evt.preventDefault()
    addTeam(newTeam)
      .then(() => {
        setNewTeam(initialNewTeamData)
        viewTeams()
        return null
      })
      .catch((e) => console.log('new team not created'))
  }

  function listTeams() {
    return teams.map((team) => (
      <Card
        fluid
        color="red"
        key={team.teamId}
        header={team.teamName}
        description={team.description}
        as={Link}
        to={'/' + team.teamId}
      />
    ))
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
            trigger={<Card fluid color="yellow" header="Create a Team" />}
          >
            <Modal.Header>Create a Team</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <Form>
                  <Header as="h4">Team Details</Header>
                  <Form.Group widths="equal">
                    <Form.Field
                      control={Input}
                      label="Team Name"
                      placeholder="Team Name"
                      name="teamName"
                      onChange={handleChange}
                    />
                    <Form.Field
                      control={Input}
                      label="Description"
                      placeholder="Description"
                      name="description"
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Header as="h4">Team Member Details</Header>
                  <Form.Group widths="equal">
                    <Form.Field
                      control={Input}
                      label="Full Name"
                      placeholder="Full Name"
                      name="name"
                      onChange={handleChange}
                    />
                    <Form.Field
                      control={Input}
                      label="Role"
                      placeholder="Role"
                      name="role"
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group widths="equal">
                    <Form.Field
                      control={Input}
                      label="Email Address"
                      placeholder="Email Address"
                      name="email"
                      onChange={handleChange}
                    />
                    <Form.Field
                      control={Input}
                      label="Contact Number"
                      placeholder="Contact Number"
                      name="contact"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Form>
              </Modal.Description>
            </Modal.Content>

            <Modal.Actions>
              <Button color="black" onClick={() => setOpen(false)}>
                Cancel
              </Button>

              <Button
                content="Create Team"
                type="submit"
                labelPosition="right"
                icon="checkmark"
                onClick={handleSubmit}
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
