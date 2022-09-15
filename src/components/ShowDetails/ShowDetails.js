import React from 'react';
import './ShowDetails.css';
import rxLogo from '../../assets/RX-logo.svg';

const ShowDetails = ({ name, image }) => {
  return (
    <div className='show-details'>
      <div className='prescription-pad'>
        <div className='rx-and-prompt'>
          <img className='rx-logo' src={rxLogo} alt='rx logo' />
          <p className='prompt'>Show to be prescribed:</p>
        </div>
        {name && <p className='show-name'>{name}</p>}
      </div>
      <div className='poster-container'>
        {image && <img className='show-poster' src={image} alt='tv show poster'/>}
      </div>
    </div>
  )
}

export default ShowDetails;