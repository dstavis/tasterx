import React from 'react';
import './Header.css';
import logo from '../../assets/TasteRX-logo.svg';
import titleLogo from '../../assets/TasteRX-title-logo.svg';

const Header = () => {
  return (
    <div>
      <img className='title-logo' src={titleLogo} alt='title logo' />
      <img className='logo' src={logo} alt='logo' />
    </div>
  )
}

export default Header;