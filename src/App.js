import './App.css'
import React from 'react'
import axios from 'axios'
import Chart from 'react-apexcharts'

// Import components
import AddSubreddits from './AddSubreddits.js'
import Graph         from './Graph.js'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      // TODO: update token when expired
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
          categories: ['one', 'two', 'three', 'four']
        }
      },
      series: [{
        name: 'subscriber_count',
        data: [41, 67, 22, 43]
      }, {
        name: 'active_user_count',
        data: [44, 55, 41, 67]
      }]
    }

    this.newSubreddit    = this.newSubreddit.bind(this)
    this.removeSubreddit = this.removeSubreddit.bind(this)
    this.editSubreddit   = this.editSubreddit.bind(this)
    this.searchSubreddit = this.searchSubreddit.bind(this)
  }

  componentDidMount() {
    this.getToken()
    this.newSubreddit()
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
        this.updateGraph()
      })
  }

  updateGraph() {
    let aSubreddits = this.state.subreddits
    let numberOfSubs = aSubreddits.length
    // Deep copy of array so state recognizes as an updated object and re-renders
    let aOptions = structuredClone(this.state.options)
    let aSeries = this.state.series

    for (let i = 0; i < numberOfSubs; i++) {
      aSeries[0].data.push(aSubreddits[i].subscriber_count)
      aSeries[1].data.push(aSubreddits[i].active_user_count)
      aOptions.xaxis.categories.push(aSubreddits[i].name)
    }

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
          <AddSubreddits
            subreddits={this.state.subreddits}
            newSubreddit={this.newSubreddit}
            removeSubreddit={this.removeSubreddit}
            editSubreddit={this.editSubreddit}
            searchSubreddit={this.searchSubreddit}
          />
          <Graph
            options={this.state.options}
            series={this.state.series}
          />
        </main>
      </div>
    )
  }
}
