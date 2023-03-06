import { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { logout } from '../../store/user-reducer';

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
  const [isUserProfileSectionOpen, setIsUserProfileSectionOpen] = useState(false);

  const toggleMenuIcon = () => setIsMenuOpen(!isMenuOpen);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const openSectionWithLinks = useRef();
  const userProfileBtn=useRef();
  

  useEffect(() => {
    function handler(event) {
      if ( !openSectionWithLinks.current?.contains(event.target)) {
      setIsUserProfileSectionOpen(false)
      }
      if (userProfileBtn.current?.contains(event.target)) {
       setIsUserProfileSectionOpen(!isUserProfileSectionOpen);
      }
    }
    window.addEventListener('click', handler);
    return () => window.removeEventListener('click', handler);
  }, [isUserProfileSectionOpen]);

  const logoutUser = () => {
    dispatch(logout());
    setIsUserProfileSectionOpen(false);
    navigate('/auth');
  };


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
            <BurgerMenu className='menu-icon' onClick={toggleMenuIcon} />
          )}
        </div>
        <LeftBarBurgerMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <div className='personal-info'>
          <h3 className='library-container'>Библиотека</h3>
          <div className='person-container'>
            <div className='greeting-block'>{`Привет, ${user.name}`}</div>
            <div
              ref={userProfileBtn}
              className='person-avatar'
              role='presentation'
            //   onClick={() => setIsUserProfileSectionOpen(!isUserProfileSectionOpen)}
            >
              <img src={avatar} alt='avatar' />
            </div>
          </div>
        </div>
        {isUserProfileSectionOpen && (
          <div className='profile-section' ref={openSectionWithLinks}>
            <button type='button' onClick={() => navigate('/profile')} className='profile-section-button'>
              Профиль
            </button>
            <button type='button' onClick={logoutUser} className='profile-section-button' data-test-id='exit-button'>
              Выход
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
