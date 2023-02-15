import { useState } from 'react';
import { ReactComponent as StarIcon } from '../../assets/starIcon.svg';

import './raiting.scss';

export const Raiting = ({ rating }) => {
 const [activeStar, setActiveStar] = useState(-1);

 const handleClick = (index) => {
   setActiveStar(index);
 };

  const starArray = [...Array(5)].map((star, index) => ({ index: index + 1, id: index + 1 }));

  return (
    <div className='raiting-container'>
      {starArray.map((star) => (
        <button
          type='button'
          key={star.id}
          disabled={true}
          className={star.index <= (Math.round(rating))? 'active-star' : 'empty-star'}
        >
          <StarIcon />
        </button>
      ))}
    </div>
  );
};
