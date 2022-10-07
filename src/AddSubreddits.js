import React from 'react'
import Subreddit from './Subreddit.js'
import { Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

export default class AddSubreddits extends React.Component {
  renderSubreddit(i) {
    return (
      <Subreddit
        id={i}
        key={i}
        value={this.props.subreddits[i].data.name}
        validation={this.props.subreddits[i].validation}
        helperText={this.handleError(this.props.subreddits[i].validation)}
        handleChange={this.props.editSubreddit}
        removeSubreddit={this.props.removeSubreddit}
        searchSubreddit={this.props.searchSubreddit}
      />
    )
  }

  handleError(error) {
    const errorString = error.toString()
    const errorCodes = {
      '-1': 'Invalid subreddit'
    }
    return error < 0 ? errorCodes[errorString] : ''
  }

  render() {
    // Prepares array of Subreddit components for each subredit in state
    let subreddits = []
    for (let i = 0; i < this.props.subreddits.length; i++) {
      subreddits.push(this.renderSubreddit(`${i}`))
    }

    return (
      <div className='Add-subreddits'>
      <p>Enter subreddits to compare user populations.</p>
        <div class='Add-subreddits-container'>
          {subreddits}
        </div>
        <Fab
          sx={{ position: 'fixed', bottom: '0', right: '0', margin: '1rem' }}
          color='primary'
          onClick={this.props.newSubreddit} >
          <AddIcon />
        </Fab>
      </div>
    )
  }
}
