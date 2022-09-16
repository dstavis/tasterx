import React from 'react';
import './Instructions.css';

const Instructions = () => {
  return (
    <article className='instructions-container'>
      <h1>Instructions:</h1>
      <ol>
        <li>Search for a TV show that you want to prescribe to a friend</li>
        <li>Once you have found the correct show, write a personalized message for the person you are writing the prescription for.</li>
        <li>Click submit and you will see the prescription!</li>
      </ol>
    </article>
  )
}

export default Instructions;