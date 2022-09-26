import './App.css'
import React from 'react'
import axios from 'axios'

// My Components
import AddSubreddits from './AddSubreddits.js'
import Graph from './Graph.js'

// Material UI
import { Box, Tab } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tabIndex: '1',
      auth: {},
      subreddits: [],
      options: {
        chart: {
          id: 'subreddit-pop',
          type: 'bar',
          stacked: true,
          toolbar: { show: false }
        },
        xaxis: {
          categories: []
        }
      },
      series: [{
        name: 'subscriber_count',
        data: []
      }, {
        name: 'active_user_count',
        data: []
      }]
    }

    this.handleTabChange = this.handleTabChange.bind(this)
    this.newSubreddit    = this.newSubreddit.bind(this)
    this.removeSubreddit = this.removeSubreddit.bind(this)
    this.editSubreddit   = this.editSubreddit.bind(this)
    this.searchSubreddit = this.searchSubreddit.bind(this)
  }

  componentDidMount() {
    this.getToken()
    this.newSubreddit()
  }

  handleTabChange(event, newTabIndex) {
    this.setState({ tabIndex: newTabIndex })
    if (newTabIndex == '2') { this.updateGraph() }
  }

  getToken() {
    let username = 'rtk6PchFDyqEd3ZEMggrjA'
    let password = 'HT8kl83F1doV47KhvsOEuGta7qe54Q'
    let credentials = window.btoa(`${username}:${password}`)

    const params = new URLSearchParams()
      params.append('grant_type', 'client_credentials')
  
    axios({
      url: 'https://www.reddit.com/api/v1/access_token',
      method: 'post',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      params
    })
      .then(response => {
        this.setState({ auth: response.data })
      })
  }

  newSubreddit() {
    let subreddits = this.state.subreddits
    const subreddit = {
      name: 'worldofpvp'
    }
    subreddits.push(subreddit)
    this.setState({subreddits: subreddits})
  }

  removeSubreddit(event) {
    let subreddits = this.state.subreddits
    subreddits.splice(event.target.id, 1)
    this.setState({subreddits: subreddits})
  }

  editSubreddit(event) {
    let subreddits = this.state.subreddits
    subreddits[event.target.id].name = event.target.value
    this.setState({subreddits: subreddits})
  }

  searchSubreddit(event) {
    let id = event.target.id
    let subreddits = this.state.subreddits
    let accessToken = this.state.auth.access_token
    let params = new URLSearchParams()
      params.append('exact', 'true')
      params.append('include_over_18', 'true')
      params.append('include_unadvertisable', 'false')
      params.append('query', subreddits[id].name)
      params.append('search_query_id', id)

    axios({
      url: `https://oauth.reddit.com/api/search_subreddits?${params}`,
      method: 'post',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
      .then(response => {
        subreddits[id] = response.data.subreddits[0]
        this.setState({subreddits: subreddits})
      })
  }

  updateGraph() {
    let aSubreddits = this.state.subreddits
    // Deep copy of array so state recognizes as an updated object and re-renders
    // let aOptions = structuredClone(this.state.options)
    let aOptions = this.state.options
    let aSeries = this.state.series

    aOptions.xaxis.categories = aSubreddits.map(sub => sub.name)
    aSeries[0].data = aSubreddits.map(sub => sub.subscriber_count)
    aSeries[1].data = aSubreddits.map(sub => sub.active_user_count)

    this.setState({
      options: aOptions,
      series: aSeries
    })
  }

  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <h1>Subreddit Pop Graph</h1>
          <h2>Enter subreddits to compare user populations.</h2>
        </header>
        <main>
          <TabContext value={this.state.tabIndex}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={this.handleTabChange}>
                <Tab label='Subreddits' value='1' />
                <Tab label='Graph' value='2' />
              </TabList>
            </Box>
            <TabPanel value='1'>
              <AddSubreddits
                subreddits={this.state.subreddits}
                newSubreddit={this.newSubreddit}
                removeSubreddit={this.removeSubreddit}
                editSubreddit={this.editSubreddit}
                searchSubreddit={this.searchSubreddit}
              />
            </TabPanel>
            <TabPanel value='2'>
              <Graph
                options={this.state.options}
                series={this.state.series}
              />
            </TabPanel>
          </TabContext>
        </main>
      </div>
    )
  }
}
