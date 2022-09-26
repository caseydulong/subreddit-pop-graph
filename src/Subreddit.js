import React from 'react'
import { TextField, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

export default class Subreddit extends React.Component {
  render() {
    return (
      <div className='Subreddit'>
        <TextField
          error={this.props.value === ''}
          id={this.props.id}
          label='Enter Subreddit'
          variant='outlined'
          value={this.props.value}
          onChange={this.props.handleChange}
          onBlur={this.props.searchSubreddit}
        />
        <IconButton
          id={this.props.id}
          onClick={this.props.removeSubreddit}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    )
  }
}
