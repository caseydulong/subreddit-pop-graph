import './App.css'
import React from 'react'
import axios from 'axios'

// Import components
import AddSubreddits from './AddSubreddits.js'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      token: {},
      subreddits: []
    }

    this.newSubreddit = this.newSubreddit.bind(this)
    this.removeSubreddit = this.removeSubreddit.bind(this)
    this.editSubreddit = this.editSubreddit.bind(this)
  }

  componentDidMount() {
    this.setState({subreddits: [""]})
    this.getToken()
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
        'Content-Type': 'application/x-www-form-urlencoded',
        // 'User-Agent': 'chrome:PopGraph:v0.0.0 (by /u/tordek1265)'
      },
      params
    })
      .then(response => {
        this.setState({ token: response.data })
      })
  }

  newSubreddit() {
    let subreddits = this.state.subreddits
    subreddits.push("")
    this.setState({subreddits: subreddits})
  }

  removeSubreddit(event) {
    let subreddits = this.state.subreddits
    subreddits.splice(event.target.id, 1)
    this.setState({subreddits: subreddits})
  }

  editSubreddit(event) {
    let subreddits = this.state.subreddits
    subreddits[event.target.id] = event.target.value
    this.setState({subreddits: subreddits})
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
          />
        </main>
      </div>
    )
  }
}
