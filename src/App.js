import React from 'react';
import Todo from './components/App';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className='container-fluid p-0'>
      <div className='row'>
        <div className='col-lg-2 d-sm-none d-none d-lg-block'>
          <Sidebar />
        </div>
        <div className='col-lg-9'>
          <Todo />
        </div>
      </div>
    </div>
  );
}

export default App;
