import React from 'react'
import axios from 'axios'
import { Input } from 'reactstrap'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  state = {
    todos: [],
    error: '',
    todoInput: ''
  }

  formReset = () => {
    this.setState({ ...this.state, todoInput: '' })
  }

  setAxiosError = (err) => {
    this.setState({ ...this.state, error: err.response.data.message })
  }

  onChange = evt => {
    const { value } = evt.target
    this.setState({ ...this.state, todoInput: value })
  }

  postTodo = () => {
    axios.post(URL, { name: this.state.todoInput })
      .then(res => {
        this.fetchAllTodos()
        this.formReset()
      })
      .catch(this.setAxiosError)
  }

  onSubmit = evt => {
    evt.preventDefault()
    this.postTodo()
  }

  fetchAllTodos = () => {
    axios.get(URL)
      .then(res => {
        this.setState({ ...this.state, todos: res.data.data })
      })
      .catch(this.setAxiosError)
  }

  componentDidMount() {
    this.fetchAllTodos()
  }
  
  render() {
    return (
      <div>
        {this.state.error && <div id='error'>Error: {this.state.error}</div>}
        <div id='todos'>
          <h2>Todos:</h2>
            {
              this.state.todos.map(todo => {
                return (<div key={todo.id}>{todo.name}</div>)
              })
            }
        </div>
        <form id='todoForm' onSubmit={this.onSubmit}>
          <input value={this.state.todoInput} type='text' placeholder='Type todo' onChange={this.onChange}></input>
          <input type='submit'></input>
          <button>Clear Completed</button>
        </form>
      </div>
    )
  }
}
