import React, {useState, useEffect} from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'
import { Grid, Dropdown, Menu, Segment } from 'semantic-ui-react'

import { getTeams } from '../apiClient'

import Teams from './Teams'
import Company from './Company'


const App = () => {
  const [teams, setTeams] = useState({teamId:'',teamName: '', description:''})

  useEffect(() => {
    getTeams()
      .then(teams => {
        setTeams(teams)
      })
      .catch(err => console.error('not working'))
  },[])

  return (
    <>
    <Router>
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
        <Route exact path='/' component={Teams} />
        <Route exact path='/:teamId' component={Company} />
      </Grid.Row>

    </Grid>
    </Router>
    </>
  )
}

export default App
