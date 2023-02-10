import { useState, useEffect } from 'react';

import { Outlet } from 'react-router-dom';
import { Header } from '../../../components/header';
import { Footer } from '../../../components/footer';

import './layout.scss';

export const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);
  return (
    <div className='layout'>
      <div className='container'>
        <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <div className='main-page-content'>
          <Outlet context={[isMenuOpen, setIsMenuOpen]} />
        </div>
        <Footer />
      </div>
    </div>
  );
};
