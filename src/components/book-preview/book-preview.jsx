import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, Navigation, Pagination, Scrollbar } from 'swiper';
import { useState } from 'react';

import defaultBookCover from '../../assets/default-book-cover.png';

import 'swiper/scss';
import 'swiper/scss/thumbs';
import 'swiper/scss/scrollbar';
import 'swiper/scss/pagination';

import './book-preview.scss';

export const BookPreview = ({ imageRoute }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const imagesCount = imageRoute ? imageRoute.length : 0;

  return (
    <>
      <Swiper
        data-test-id='slide-big'
        className='book-images-slider'
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation, Thumbs, Pagination]}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        loop={true}
      >
        {!imageRoute && (
          <SwiperSlide>
            <img src={defaultBookCover} alt='book cover' />
          </SwiperSlide>
        )}
        {imageRoute &&
          imageRoute.map((image) => (
            <SwiperSlide key={image}>
              <img src={image} alt='book cover' />
            </SwiperSlide>
          ))}
      </Swiper>

      {imageRoute && imageRoute.length > 1 && (
        <Swiper
          spaceBetween={30}
          slidesPerView={imagesCount - 2}
          freeMode={true}
          onSwiper={setThumbsSwiper}
          scrollbar={
            imagesCount > 4
              ? {
                  draggable: true,
                  clickable: true, 
                  hide:true                 
                }
              : false
          }
          className='book-images-slider-carusel'
          watchSlidesProgress={true}
          modules={[Navigation, Thumbs, Pagination, Scrollbar]}
        >
          {imageRoute &&
            imageRoute.map((image) => (
              <SwiperSlide key={image} data-test-id='slide-mini' className='pagination-image'>
                <img src={image} alt='book cover' />
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </>
  );
};
