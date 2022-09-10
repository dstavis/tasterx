import React, { useState } from 'react';
import './Form.css'
import { NavLink } from 'react-router-dom';

const Form = ({ setPersonalMessage, goToPrescription }) => {
  const [message, setMessage] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    setPersonalMessage(message);
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

      <button type='submit' className='submit-button' disabled={!message}>Submit</button>
    </form>
  )
}

export default Form;