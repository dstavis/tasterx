import React from 'react';
import './Prescription.css';

const Prescription = ({ show, message }) => {
  return (
    <div>
      <p>{show.name}</p>
      <img src={show.image} alt='show poster'/>
      <a href={show.officialSite}>Official TV show website</a>
      <p>{message}</p>
    </div>
  );
}

export default Prescription;