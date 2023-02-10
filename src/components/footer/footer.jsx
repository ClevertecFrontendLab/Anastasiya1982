import { Link } from 'react-router-dom';

import { ReactComponent as FacebookSvg } from '../../assets/facebook.svg';
import { ReactComponent as InstagrammSvg } from '../../assets/instagram.svg';
 import { ReactComponent as VKSvg } from '../../assets/vk.svg';
 import { ReactComponent as LinkedInSvg } from '../../assets/linkedin.svg';
import './footer.scss';

export const Footer = () => (
  <div className='footer'>
    <div className='content'>
      <div className='info-block'>© 2020-2023 Cleverland. Все права защищены.</div>
      <div className='social-icons-block'>
        <a href='https://www.facebook.com/' target='_blank' rel='noopener noreferrer'>
          <FacebookSvg />
        </a>
        <a href='https://www.instagram.com/' target='_blank' rel='noopener noreferrer'>
          <InstagrammSvg />
        </a>
        <a href='https://www.vk.com/' target='_blank' rel='noopener noreferrer'>
          <VKSvg />
        </a>
        <a href='https://https://www.linkedin.com/' target='_blank' rel='noopener noreferrer'>
          <LinkedInSvg />
        </a>
      </div>
    </div>
  </div>
);
