import React from 'react'

export default class TodoList extends React.Component {
  render() {
    return (
      <div id='todos'>
          <h2>Todos:</h2>
            {
              this.props.todos.reduce((acc, todo) => {
                if (this.props.showAll || !todo.completed) return acc.concat(
                  <div onClick={this.props.toggleComplete(todo.id)} className='theTodos' key={todo.id}>{todo.name}{todo.completed ? ' ✔️' : ''}</div>
                )
                return acc
              }, [])
            }
        </div>
    )
  }
}
