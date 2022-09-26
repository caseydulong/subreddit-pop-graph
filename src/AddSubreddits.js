import React from 'react'
import Subreddit from './Subreddit.js'

export default class AddSubreddits extends React.Component {
  renderSubreddit(i) {
    return (
      <Subreddit
        id={i}
        key={i}
        value={this.props.subreddits[i].name}
        handleChange={this.props.editSubreddit}
        removeSubreddit={this.props.removeSubreddit}
        searchSubreddit={this.props.searchSubreddit}
      />
    )
  }

  render() {
    // Prepares array of Subreddit components for each subredit in state
    let subreddits = []
    for (let i = 0; i < this.props.subreddits.length; i++) {
      subreddits.push(this.renderSubreddit(`${i}`))
    }

    return (
      <div className='Add-subreddits'>
        {subreddits}
        <button
          type='button'
          onClick={this.props.newSubreddit} >
          +
        </button>
      </div>
    )
  }
}
