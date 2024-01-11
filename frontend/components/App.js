import React from 'react'
import axios from 'axios'
import { Input } from 'reactstrap'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  state = {
    todos: [],
    error: '',
    todoInput: '',
    showAll: true
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
        this.setState({ ...this.state, todos: this.state.todos.concat(res.data.data) })
        this.formReset()
      })
      .catch(this.setAxiosError)
  }

  onSubmit = evt => {
    evt.preventDefault()
    this.postTodo()
  }

  toggleComplete = id => () => {
    axios.patch(`${URL}/${id}`)
      .then(res => {
        this.setState({ ...this.state, todos: this.state.todos.map(todo => {
            if (id === todo.id) return res.data.data
            return todo
          })
        })
      })
      .catch(this.setAxiosError)
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

  toggleShowAll = () => {
    this.setState({ ...this.state, showAll: !this.state.showAll })
  }
    
  render() {
    return (
      <div>
        {this.state.error && <div id='error'>Error: {this.state.error}</div>}
        <div id='todos'>
          <h2>Todos:</h2>
            {
              this.state.todos.reduce((acc, todo) => {
                if (this.state.showAll || !todo.completed) return acc.concat(
                  <div onClick={this.toggleComplete(todo.id)} className='theTodos' key={todo.id}>{todo.name}{todo.completed ? ' ✔️' : ''}</div>
                )
                return acc
              }, [])
            }
        </div>
        <form id='todoForm' onSubmit={this.onSubmit}>
          <input value={this.state.todoInput} type='text' placeholder='Type todo' onChange={this.onChange}></input>
          <input type='submit'></input>
        </form>
        <button onClick={this.toggleShowAll}>{this.state.showAll ? 'Clear Completed' : "Show All"}</button>
      </div>
    )
  }
}
