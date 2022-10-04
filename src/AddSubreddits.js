import React from 'react'
import Subreddit from './Subreddit.js'
import { IconButton, Container } from '@mui/material'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined'

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
      <Container>
        {subreddits}
        <IconButton
          type='button'
          onClick={this.props.newSubreddit} >
          <AddBoxOutlinedIcon />
        </IconButton>
      </Container>
    )
  }
}
