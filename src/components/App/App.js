import './App.css';
import React, { useState } from 'react';
import Form from '../Form/Form';
import Search from '../Search/Search';
import Instructions from '../Instructions/Instructions';
import Prescription from '../Prescription/Prescription';
import ShareButton from '../ShareButton/ShareButton';
import Header from '../Header/Header';
import ShowDetails from '../ShowDetails/ShowDetails';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { formatShowSearch } from '../../utility-functions/utility-functions';
import { getShow, postPrescription} from '../../api-calls/api-calls';
import { Routes, Route, useNavigate } from 'react-router-dom';

function App() {
  const [show, setShow] = useState({});
  const [message, setMessage] = useState('');
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
    .catch(error => {
      setError(error)
    });
  }

  const resetState = () => {
    setShow({});
    setMessage('');
    setError('');
  }

  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={
          <main className='home-page'>
            <Header />
            <section className='search-form-container'>
              {error && <ErrorMessage error={error} />}
              <Search searchForShow={searchForShow} />
              <div className='prescription-preview'>
                <ShowDetails name={show.name} image={show.image} error={error} />
                <Form setPersonalMessage={setPersonalMessage} hasShow={show.showID} id={show.id} resetAppState={resetState} />
              </div>
            </section>
            <article className='instructions-container'>
              <Instructions />
            </article>
          </main>
        }/>
        <Route exact path='/prescription/:id' element={
          <main className='prescription-container'>
            <Header />
            <ShareButton />
            <Prescription />
            <button className='make-new-script' onClick={() => navigate('/')}>Write a new prescription</button>
          </main>
        }/>
      </Routes>
    </div>
  );
}

export default App;
