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
    setError('');
  }

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path='/' element={ 
          <>
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
        <Route path='/prescription/:id' element={
          <>
            <main className='prescription-container'>
              <Prescription />
              <button className='make-new-script' onClick={() => navigate('/')}>Write a new prescription</button>
            </main>
          </>
        }/>
        <Route path='/prescription/prescription-not-found' element={
             <>
             <main className='not-found-container'>
              <h1 className="message">Oops... the requested prescription is not on file. Check the URL or contact your taste physician.</h1>
              <button className='make-new-script' onClick={() => navigate('/')}>Write a new prescription</button>
             </main>
           </>
        }/>
        <Route path='*' element={
          <>
            <h1 className='not-found-message'>404: Not found</h1>
            <button className='make-new-script' onClick={ () => navigate('/') } >Back to TasteRX</button>
          </>
        }/>
      </Routes>
    </div>
  );
}

export default App;
