import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from './constants';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get(API_URL)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  })

  return (
    <div className="App">
      <p>{ message }</p>
    </div>
  );
}

export default App;
