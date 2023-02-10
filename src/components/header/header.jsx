
import { Link } from 'react-router-dom';

import { ReactComponent as BurgerMenu } from '../../assets/burger.svg';
import { ReactComponent as CloseBurgerMenu } from '../../assets/close-burger-menu-icon.svg';
import logo from '../../assets/logo.png';
import { LeftBarBurgerMenu } from '../leftbar-burger-menu';
import avatar from '../../assets/avatar.png';

import './header.scss';

const user = {
  name: 'Иван',
};

export const Header = ({ isMenuOpen, setIsMenuOpen }) => {
  const toggleMenuIcon = () => setIsMenuOpen(!isMenuOpen);
  return (
    <div className='header'>
      <div className='content'>
        <Link to='/' className='logo-container'>
          <img src={logo} alt='logo' className='logo-img' />
        </Link>
        <div className='burger-menu' data-test-id='button-burger'>
          {isMenuOpen ? (
            <CloseBurgerMenu onClick={toggleMenuIcon} />
          ) : (
            <BurgerMenu className='menu-icon' onClick={toggleMenuIcon}  />
          )}
        </div>
        <LeftBarBurgerMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <div className='personal-info'>
          <h3 className='library-container'>Библиотека</h3>
          <div className='person-container'>
            <div className='greeting-block'>{`Привет, ${user.name}`}</div>
            <div className='person-avatar'>
              <img src={avatar} alt='avatar' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
