import './App.css';
import React, { useState } from 'react';
import Form from '../Form/Form';
import Search from '../Search/Search';
import Instructions from '../Instructions/Instructions';
import Prescription from '../Prescription/Prescription';
import { formatShowSearch } from '../../utility-functions/utility-functions';
import { getShow } from '../../api-calls/api-calls';
import { Routes, Route, NavLink, Redirect } from 'react-router-dom';

function App() {
  const [show, setShow] = useState({});
  const [message, setMessage] = useState('');
  
  const searchForShow = (string) => {
    const endpoint = formatShowSearch(string);
    getShow(endpoint)
    .then(data => {
      setShow({
        id: Date.now(),
        showID: data.id,
        name: data.name,
        image: data.image.medium,
        officialSite: data.officialSite
      })
    })
    .catch(error => console.log(error));
  }

  const setPersonalMessage = (message) => {
    setMessage(message);
  }

  const resetState = () => {
    setShow({});
    setMessage('');
  }

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={
          <div>
            <Search searchForShow={searchForShow} />
            {show.name && <p>{`${show.name}`}</p>}
            <Form setPersonalMessage={setPersonalMessage} hasShow={show.name} id={show.id} resetAppState={resetState} />
            <Instructions />
          </div>
        }/>
        <Route path='/prescription/:id' element={<Prescription show={show} message={message} />} />  
      </Routes>
    </div>
  );
}

export default App;
