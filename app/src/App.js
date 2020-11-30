import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('api')
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
