import React, { useState, useEffect, useRef } from 'react';
import './Form.css';

const Form = ({ setPersonalMessage, resetAppState, hasShow }) => {
  const [message, setMessage] = useState('');
  const [signature, setSignature] = useState('');
  const appStateReset = useRef(false);

  useEffect(() => {
    if (!appStateReset.current) {
      resetAppState();
      appStateReset.current = true;
    }
  }, [resetAppState]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setPersonalMessage(message, signature);
    setMessage('');
    setSignature('');
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

      <label htmlFor='signature'>Prescribed by:</label>
      <input
        className='signature-input'
        id='signature'
        type='text'
        name='signature'
        placeholder='Doctor [...]'
        value={signature}
        onChange={(event) => setSignature(event.target.value)}
      />

      <button type='submit' className='submit-button' disabled={!message || !hasShow || !signature}>Submit</button>
    </form>
  )
}

export default Form;