import React from 'react';
import './Header.css';
import logo from '../../assets/TasteRX-logo.svg';
import titleLogo from '../../assets/TasteRX-title-logo.svg';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <Link to='/' className='title-logo-link'>
        <img className='title-logo' src={titleLogo} alt='title logo' />
      </Link>
      <img className='logo' src={logo} alt='logo' />
    </header>
  );
}

export default Header;