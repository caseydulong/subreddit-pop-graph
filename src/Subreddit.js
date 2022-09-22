import React from 'react'

export default class Subreddit extends React.Component {
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
          onClick={this.props.searchSubreddit} >
          Search
        </button>
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
