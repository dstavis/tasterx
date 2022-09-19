import React from 'react';
import './ShareButton.css';

const ShareButton = () => {

  const currentURL = window.location.href;

  return (
    <button className='share-button' onClick={ () => { 
      console.log("clicked")
      navigator.clipboard.writeText(currentURL)
      }} >
      <div className='url-container'>
        <p className='rx-url'>{currentURL.substring(0, 30) + "..."}</p>
      </div>
      <div className='split-row'>
        <p className='button-label'>Copy Share Link <span className='link-icon'>🔗</span></p>
      </div>
    </button>
  );
}

export default ShareButton;