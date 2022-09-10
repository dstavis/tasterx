import './App.css';
import React, { useState } from 'react';
import Form from '../Form/Form';
import Search from '../Search/Search';
import { formatShowSearch } from '../../utility-functions/utility-functions';
import { getShow } from '../../api-calls/api-calls';

function App() {
  const [show, setShow] = useState({});
  
  const searchForShow = (string) => {
    const endpoint = formatShowSearch(string);
    getShow(endpoint)
    .then(data => {
      setShow({
        id: data.id,
        name: data.name,
        image: data.image.medium,
        officialSite: data.officialSite
      })
    })
    .catch(error => console.log(error));
  }

  return (
    <div className="App">
      <Search searchForShow={searchForShow} />
      <Form />
    </div>
  );
}

export default App;
