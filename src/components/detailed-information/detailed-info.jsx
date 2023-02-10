import './detailed-info.scss';

export const DetailedInfoBlock = () => (
  <div className='detailed-table'>
    <ul className='table-column-first'>
      <li className='table-row'>
        <div className='row-title'>Издательство</div>
        <div className='row-content'>Питер</div>
      </li>
      <li className='table-row'>
        <div className='row-title'>Год издания</div>
        <div className='row-content'>2019</div>
      </li>
      <li className='table-row'>
        <div className='row-title'>Переплёт</div>
        <div className='row-content'>Мягкая обложка</div>
      </li>
      <li className='table-row'>
        <div className='row-title'>Формат</div>
        <div className='row-content'>70х100</div>
      </li>
    </ul>
    <ul className='table-column-second'>
      <li className='table-row'>
        <div className='row-title'>Жанр</div>
        <div className='row-content'>Компьютерная литература</div>
      </li>
      <li className='table-row'>
        <div className='row-title'>Вес</div>
        <div className='row-content'>370 г</div>
      </li>
      <li className='table-row'>
        <div className='row-title'>ISBN</div>
        <div className='row-content'>978-5-4461-0923-4</div>
      </li>
      <li className='table-row'>
        <div className='row-title'>Изготовитель</div>
        <div className='row-content'>ООО Питер Мейл.РФ,198206 г.Санкт-Петербург Петергофское ш, д.37</div>
      </li>
    </ul>
  </div>
);
