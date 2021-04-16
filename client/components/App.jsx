import React from 'react'
import { Grid, Dropdown, Menu, Segment } from 'semantic-ui-react'
import Teams from './Teams'
import Company from './Company'


const App = () => {
  return (
    <>

    <Grid style={{ height:'20vh'}} verticalAlign='top'>

      <Grid.Row>
        <Grid.Column width={16}>
          <Segment inverted>
            <Menu inverted pointing secondary>
              <Menu.Item name='SafeStaffing'/>
            </Menu>
          </Segment>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column width={3}>
          <Menu secondary vertical>
            <Menu.Item name='Home'/>

            <Dropdown item text='Teams'>
              <Dropdown.Menu>
                <Dropdown.Header>Teams</Dropdown.Header>
                <Dropdown.Item>Small</Dropdown.Item>
                <Dropdown.Item>Medium</Dropdown.Item>
                <Dropdown.Item>Large</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>  
          </Menu>
        </Grid.Column>

        <Teams />
      </Grid.Row>

    </Grid>
    </>
  )
}

export default App