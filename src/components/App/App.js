import './App.css';
import React, { useState } from 'react';
import Form from '../Form/Form';
import Search from '../Search/Search';
import Instructions from '../Instructions/Instructions';
import Prescription from '../Prescription/Prescription';
import Header from '../Header/Header';
import ShowDetails from '../ShowDetails/ShowDetails';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { formatShowSearch } from '../../utility-functions/utility-functions';
import { getShow, postPrescription} from '../../api-calls/api-calls';
import { Routes, Route, useNavigate } from 'react-router-dom';

function App() {
  const [show, setShow] = useState({});
  const [message, setMessage] = useState('');
  const [signature, setSignature] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const searchForShow = (string) => {
    const endpoint = formatShowSearch(string);
    setError('');
    getShow(endpoint)
    .then(data => {
      setShow({
        showID: data.id,
        name: data.name,
        image: data.image && data.image.medium
      })
    })
    .catch(error => {
      setError(error);
      setShow({});
    })
  }

  const setPersonalMessage = (message, signature) => {
    setMessage(message);
    setSignature(signature);
    postPrescription({
      message: message,
      signature: signature,
      showID: show.showID
    })
    .then(data => {
      setShow(data.prescription);
      navigate(`/prescription/${data.prescription.id}`);
    })
    .catch(error => {
      setError(error)
    });
  }

  const resetState = () => {
    setShow({});
    setMessage('');
    setSignature('');
    setError('');
  }

  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={ 
          <>
            <Header />
            <main className='home-page'>
              <section className='prescription-preview-container'>
                {error && <ErrorMessage error={error} />}
                <Search searchForShow={searchForShow} />
                <div className='prescription-preview'>
                  <ShowDetails name={show.name} image={show.image} error={error} />
                  <Form setPersonalMessage={setPersonalMessage} hasShow={show.showID} id={show.id} resetAppState={resetState} />
                </div>
              </section>
              <Instructions />
            </main>
          </>
        }/>
        <Route exact path='/prescription/:id' element={
          <>
            <Header />
            <main className='prescription-container'>
              <Prescription />
              <button className='make-new-script' onClick={() => navigate('/')}>Write a new prescription</button>
            </main>
          </>
        }/>
      </Routes>
    </div>
  );
}

export default App;
