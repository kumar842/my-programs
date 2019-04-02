import React, {Component} from 'react'
import TodoList from './TodoList';

class TodoApp extends Component {
    constructor(props){
        super(props);
        this.state = {
            todoItems: [],
            text: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.closeTask = this.closeTask.bind(this);
    }

    handleChange(e){
        this.setState({
            text: e.target.value
        });
    }

    handleSubmit(e){
        e.preventDefault();
        if(!this.state.text){
            return;
        }
        const newTodo = {
            id: this.state.todoItems.length + 1,
            text: this.state.text,
            isCompleted: false
        }

        this.setState({
            todoItems : this.state.todoItems.concat(newTodo),
            text: ''
        })
    }

    closeTask(id){
        this.setState(prevState => {
            const newTotoItems = prevState.todoItems.map(todo => {
                if(todo.id === id ){
                    todo.isCompleted = !todo.isCompleted;
                }
                return todo;
            })

            return {
                todoItems: newTotoItems
            }
        })
    }

    render(){
        return (
            <div>
                <h2>{this.props.name}</h2>
                <TodoList todoItems={this.state.todoItems} closeTask={this.closeTask}/>
                <form onSubmit={this.handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Enter what you want to do" 
                    value={this.state.text}
                    onChange={this.handleChange}></input>
                <button>Add</button>                    
                </form>
                <hr />
            </div>
        );
    }
}

export default TodoApp;