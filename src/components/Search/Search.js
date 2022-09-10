import React, { useState } from 'react';

const Search = ({ searchForShow }) => {
    const [showName, setShowName] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
        searchForShow(showName);
        setShowName('');
    }

    return (
        <form onSubmit={(event) => handleSubmit(event)}>
            <input 
                type='text'
                name='showName'
                placeholder='TV Show Name'
                value={showName}
                onChange={(event) => setShowName(event.target.value)}
            />

            <button type='submit' className='search-button' disabled={!showName}>Search</button>
        </form>
    );
}

export default Search;