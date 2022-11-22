import Login from './Login/Login';
import Register from './Register/Register';
import Meeting from './Meeting/Meeting'
import './App.css';
import {useState} from 'react';

function App() {

  const [currTab, setCurrTab] = useState('');

  const handleClick = (type) => {
    if (type === 1) {
      setCurrTab('register-parent');
    }
    else if (type === 2) {
      setCurrTab('register-senior-citizen');
    }
    else if (type === 3) {
      setCurrTab('meeting');
    }
    else {
      setCurrTab('login');
    }
  }

  return (
    <div className="App">
      <div className='button-array'>
        <button label='Register Parent' className='button-click' onClick={() => handleClick(1)}/>
        <button label='Register Senior Citizen' className='button-click' onClick={() => handleClick(2)}/>
        <button label='Create Meeting' className='button-click' onClick={() => handleClick(3)}/>
        <button label='Login' className='button-click' onClick={() => handleClick(4)}/>
      </div>
      {
        (currTab === 'register-parent') && (
          <Register type='parent'/>
        )
      }
      {
        (currTab === 'register-senior-citizen') && (
          <Register type='senior_citizen'/>
        )
      }
      {
        (currTab === 'meeting') && (
          <Meeting/>
        )
      }
      {
        (currTab === 'login') && (
          <Login/>
        )
      }
    </div>

  );
}

export default App;
