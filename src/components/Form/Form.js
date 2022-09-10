import React, { useState, useEffect } from 'react';
import './Form.css';
import { useNavigate } from 'react-router-dom';

const Form = ({ setPersonalMessage, id, resetAppState, hasShow }) => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => resetAppState(), []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setPersonalMessage(message);
    navigate(`/prescription/${id}`);
    setMessage('');
  }

  return (
    <form className='personalized-form' onSubmit={(event) => handleSubmit(event)}>
      <label htmlFor='textarea'>Write a message for your prescription:</label>
      <textarea
        id='textarea'
        name='message'
        placeholder='Personalized message'
        rows='7'
        cols='35'
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
      <button type='submit' className='submit-button' disabled={!message || !hasShow}>Submit</button>
    </form>
  )
}

export default Form;