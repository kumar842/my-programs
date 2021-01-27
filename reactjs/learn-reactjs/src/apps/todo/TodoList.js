import React, {Component} from 'react';

class TodoList extends Component {
    render(){
        const completedStyle = {
            fontStyle: 'italic',
            color: '#cdcdcd',
            textDecoration: 'line-through'
        }

        return(
           <ul>
               {this.props.todoItems.map(todo =>
                    <li 
                        key={todo.id} 
                        onClick={ () => this.props.closeTask(todo.id)}>
                        <p style={todo.isCompleted ? completedStyle : null}>{todo.text}</p>
                        </li>
               )}
           </ul> 
        );
    }
}

export default TodoList;