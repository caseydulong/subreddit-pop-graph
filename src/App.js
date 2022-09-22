import './App.css'
import React from 'react'
import axios from 'axios'

// Import components
import AddSubreddits from './AddSubreddits.js'
import Graph         from './Graph.js'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      // TODO: update token when expired
      auth: {},
      subreddits: []
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
    let credentials = btoa(`${username}:${password}`)

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
      name: ''
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

    console.log(event.target)
    console.log(params.toString())

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

  render() {
    return (
      <div className="App">
        <header className="App-header">
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
          <Graph />
        </main>
      </div>
    )
  }
}
