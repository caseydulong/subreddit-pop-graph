import './App.css';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    // Required step: always call the parent class' constructor.
    super(props)

    // Set the state directly. Use props if necessary.
    this.state = {
      subreddits: []
    }

    // Note: think carefully before initializing.
    // State based on props!
    // someInitialValue: this.props.initialValue
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
          <AddSubs/>
        </main>
      </div>
    )
  }
}

class AddSubs extends React.Component {
  newSub() {

  }

  render() {
    return (
      <div className="Add-subs">
        <AddSub
          handleChange={this.handleChange}
          deleteSub={this.deleteSub}
        />
        <AddSub
          handleChange={this.handleChange}
          deleteSub={this.deleteSub}
        />
        <button onClick={this.newSub}>+</button>
      </div>
    )
  }
}

class AddSub extends React.Component {
  removeSub() {
    // TODO
  }

  render() {
    return (
      <div className="Add-sub">
        <form>
          <input
            type="text"
            onChange={this.props.handleChange} />
        </form>
        <button onClick={this.removeSub}>Delete</button>
      </div>
    )
  }
}

class Graph extends React.Component {
  // TODO
}

export default App;
