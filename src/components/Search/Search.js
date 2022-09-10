import React, { useState } from 'react';

const Search = (searchForShow) => {
    const [showName, setShowName] = useState('');

    return (
        <form>
            <input 
                type='text'
                name='showName'
                value={showName}
                onChange={(event) => setShowName(event.target.value)}
            />

            <button className='search-button' onClick={(event) => searchForShow(showName)}>Search</button>
        </form>
    )
}

export default Search