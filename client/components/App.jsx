import React, {useState, useEffect} from 'react'
import {HashRouter as Router, Route, Link} from 'react-router-dom'
import { Grid, Dropdown, Menu, Segment, DropdownItem } from 'semantic-ui-react'

import { getTeams } from '../apiClient'

import Teams from './Teams'
import Company from './Company'


const App = (props) => {
  const [teams, setTeams] = useState([{teamId:'',teamName: '', description:''}])

  useEffect(() => {
    getTeams()
      .then(teams => {
        setTeams(teams)
      })
      .catch(err => console.error('not working'))
  },[])

  function handleClick (evt) {
    evt.preventDefault()
    let target = evt.target
    let value = target.getAttribute('value')
    console.log(value)
    props.history.push(value)
    return null
  }
  


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
            <Menu.Item 
            name='Home'
            value='/'
            onClick={handleClick}
            />

            <Dropdown 
            item 
            text='Teams'
            options={teams.map(team => {
              return {
                key: team.teamId,
                text: team.teamName,
                value: '/' + team.Id
              }
            })}
            />
               
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
