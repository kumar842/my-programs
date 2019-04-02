import React, { Component } from 'react';
import TodoApp from './todo/TodoApp';
import ApiApp from './ApiApp'
import JokesApp from './jokes/JokesApp';
import ContactsApp from './contacts/ContactsApp';
import ConditionalApp from './ConditionalApp';
import GameApp from './tic-tak-tao/GameApp';
import SlateApp from './slate/SlateApp';
import '../styles/tic-tac-tao.css';

class App extends Component {
  render() {
    return (
      <div >
        <h1>React JS Practise</h1>
        <hr />
        <GameApp name="Tik-Tak-Tao"/>
        <SlateApp name="slate-game"/>
        <TodoApp name="ToDo App"/>
        <ApiApp name="Api Calling Example"/>
        <JokesApp name="Joke App"/>
        <ContactsApp name="Contacts App"/>
        <ConditionalApp name="Conditional App"/>
      </div>
    );
  }
}

export default App;
