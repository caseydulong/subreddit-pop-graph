import './App.css'
import React from 'react'

// Import components
import AddSubreddits from './AddSubreddits.js'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      subreddits: []
    }

    this.newSubreddit = this.newSubreddit.bind(this)
    this.removeSubreddit = this.removeSubreddit.bind(this)
    this.editSubreddit = this.editSubreddit.bind(this)
  }

  componentDidMount() {
    this.setState({subreddits: [""]})
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
          <p>
            Enter subreddits to compare user populations.
          </p>
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

export default App
