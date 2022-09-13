import React, { useState, useEffect, useRef } from 'react';
import './Form.css';

const Form = ({ setPersonalMessage, resetAppState, hasShow }) => {
  const [message, setMessage] = useState('');
  const appStateReset = useRef(false);

  useEffect(() => {
    if (!appStateReset.current) {
      resetAppState();
      appStateReset.current = true;
    }
  }, [resetAppState]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setPersonalMessage(message);
    setMessage('');
  }

  return (
    <form className='personalized-form' onSubmit={(event) => handleSubmit(event)}>
      <label htmlFor='textarea'>Write a message for the prescription:</label>
      <textarea
        className='text-area'
        id='textarea'
        name='message'
        placeholder='Personalized message'
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
      <button type='submit' className='submit-button' disabled={!message || !hasShow}>Submit</button>
    </form>
  )
}

export default Form;