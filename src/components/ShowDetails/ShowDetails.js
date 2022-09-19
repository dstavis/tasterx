import React from 'react';
import './ShowDetails.css';
import rxLogo from '../../assets/RX-logo.svg';

const ShowDetails = ({ name, image }) => {
  return (
    <div className='show-details'>
        <div className='rx-logo'>
          <img className='logo-img' src={rxLogo} alt='rx logo' />
        </div>
        <div className='prompt-show-name-image-container'>
        <div className='prompt-show-name-container'>
          <p className='prompt'>Show to be prescribed:</p>
          {name && <p className='show-name'>{name}</p>}
        </div>
        {image && <img className='show-poster' src={image} alt='tv show poster'/>}
        </div>
    </div>
  );
}

export default ShowDetails;