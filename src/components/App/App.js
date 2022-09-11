import './App.css';
import React, { useState } from 'react';
import Form from '../Form/Form';
import Search from '../Search/Search';
import Instructions from '../Instructions/Instructions';
import Prescription from '../Prescription/Prescription';
import { formatShowSearch } from '../../utility-functions/utility-functions';
import { getShow, postPrescription} from '../../api-calls/api-calls';
import { Routes, Route, useNavigate } from 'react-router-dom';

function App() {
  const [show, setShow] = useState({});
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  
  const searchForShow = (string) => {
    const endpoint = formatShowSearch(string);
    getShow(endpoint)
    .then(data => {
      setShow({
        showID: data.id,
        name: data.name
      })
    })
    .catch(error => console.log(error));
  }

  const setPersonalMessage = (message) => {
    setMessage(message);
    postPrescription({
      message: message,
      showID: show.showID
    })
    .then(data => {      
      setShow(data.prescription);
      navigate(`/prescription/${data.prescription.id}`);
    })
    .catch(error => console.log(error));
  }

  const resetState = () => {
    setShow({});
    setMessage('');
  }

  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={
          <div>
            <Search searchForShow={searchForShow} />
            {show.name && <p>{`${show.name}`}</p>}
            <Form setPersonalMessage={setPersonalMessage} hasShow={show.showID} id={show.id} resetAppState={resetState} />
            <Instructions />
          </div>
        }/>
        <Route exact path='/prescription/:id' element={<Prescription />}/>  
      </Routes>
    </div>
  );
}

export default App;
