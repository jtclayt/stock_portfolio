import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from './constants';
// import { Router } from '@reach-router';
import NavBar from './components/NavBar/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get(API_URL)
      .then(res => setMessage(res.data))
      .catch(err => console.log(err));
  });

  return (
    <div className="App">
      <NavBar />
      <h1>{ message }</h1>
    </div>
  );
}

export default App;
