import React from 'react';
import './ErrorMessage.css';

const ErrorMessage = ({ error }) => {
  return (
    <div className='error-message-container'>
      <p className='error-message'>{`${error}`}</p>
    </div>
  );
}

export default ErrorMessage;