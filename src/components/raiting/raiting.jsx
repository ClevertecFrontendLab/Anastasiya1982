import { ReactComponent as StarIcon } from '../../assets/starIcon.svg';

import './raiting.scss';

export const Raiting = () => (
  <div className='raiting-container'>
    <StarIcon className='active' />
    <StarIcon className='active' />
    <StarIcon className='active' />
    <StarIcon className='active' />
    <StarIcon className='empty' />
  </div>
);
