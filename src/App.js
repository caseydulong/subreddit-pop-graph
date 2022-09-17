import './App.css';
import React from 'react';

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

class AddSubreddits extends React.Component {
  renderSubreddit(i) {
    return (
      <Subreddit
        id={i}
        key={i}
        value={this.props.subreddits[i]}
        handleChange={this.props.editSubreddit}
        removeSubreddit={this.props.removeSubreddit}
      />
    )
  }

  render() {
    // Prepares array of Subreddit components for each subredit in state
    let subreddits = []
    for (let i = 0; i < this.props.subreddits.length; i++) {
      subreddits.push(this.renderSubreddit(i))
    }

    return (
      <div className="Add-subreddits">
        {subreddits}
        <button
          type="button"
          onClick={this.props.newSubreddit} >
          +
        </button>
      </div>
    )
  }
}

class Subreddit extends React.Component {
  render() {
    return (
      <div className="Subreddit">
        <form>
          <input
            type="text"
            id={this.props.id}
            value={this.props.value}
            onChange={this.props.handleChange} />
        </form>
        <button
          type="button"
          id={this.props.id}
          onClick={this.props.removeSubreddit} >
          Delete
        </button>
      </div>
    )
  }
}

class Graph extends React.Component {
  // TODO
}

export default App;
