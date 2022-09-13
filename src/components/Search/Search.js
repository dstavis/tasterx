import React, { useState } from 'react';
import './Search.css';

const Search = ({ searchForShow }) => {
    const [showName, setShowName] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
        searchForShow(showName);
        setShowName('');
    }

    return (
        <form className='search-form' onSubmit={(event) => handleSubmit(event)}>
            <input 
                className='search-input'
                type='text'
                name='showName'
                placeholder='TV Show Name'
                value={showName}
                onChange={(event) => setShowName(event.target.value)}
            />

            <button className='search-button' type='submit' disabled={!showName}>Search</button>
        </form>
    );
}

export default Search;