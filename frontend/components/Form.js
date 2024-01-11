import React from 'react'

export default class Form extends React.Component {
  render() {
    return (
      <>
        <form id='todoForm' onSubmit={this.props.onSubmit}>
          <input
            value={this.props.todoInput}
            type='text'
            placeholder='Type todo'
            onChange={this.props.onChange}>
          </input>
          <input type='submit'></input>
        </form>
        <button
          onClick={this.props.toggleShowAll}
        >
          {this.props.showAll ? 'Clear Completed' : "Show All"}
        </button>
      </>
    )
  }
}
