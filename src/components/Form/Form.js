import React, { useState } from 'react';

const Form = (postToAPI) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  return (
    <form>
      <input
        type='text'
        name='name'
        placeholder='Name'
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <input
        type='text'
        name='message'
        placeholder='Message'
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />

      <button className='submit-button' onClick={() => postToAPI(name, message)}>Submit</button>
    </form>
  )
}

export default Form;