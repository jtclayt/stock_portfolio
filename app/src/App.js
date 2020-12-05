import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from './constants';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get(API_URL)
      .then(res => setMessage(res.data))
      .catch(err => console.log(err));
  })

  return (
    <div className="App">
      <h1>{ message }</h1>
    </div>
  );
}

export default App;
