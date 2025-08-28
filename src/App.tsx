import React from 'react';
import Header from './components/Header/Header';
import TodoList from './components/TodoList/TodoList';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <main className='mainContainer'>
        <TodoList />
      </main>
    </>
  );
};

export default App;