import './detailed-info.scss';

export const DetailedInfoBlock = ({ book }) => {
  const {issueYear, publish, pages, cover, weight, format, ISBN, producer } = book;
  return (
    <div className='detailed-table'>
      <ul className='table-column-first'>
        <li className='table-row'>
          <div className='row-title'>Издательство</div>
          <div className='row-content'>{publish}</div>
        </li>
        <li className='table-row'>
          <div className='row-title'>Год издания</div>
          <div className='row-content'>{issueYear}</div>
        </li>
        <li className='table-row'>
          <div className='row-title'>Переплёт</div>
          <div className='row-content'>{cover}</div>
        </li>
        <li className='table-row'>
          <div className='row-title'>Формат</div>
          <div className='row-content'>{format}</div>
        </li>
      </ul>
      <ul className='table-column-second'>
        <li className='table-row'>
          <div className='row-title'>Жанр</div>
          <div className='row-content'>Компьютерная литература</div>
        </li>
        <li className='table-row'>
          <div className='row-title'>Вес</div>
          <div className='row-content'>{weight}г</div>
        </li>
        <li className='table-row'>
          <div className='row-title'>ISBN</div>
          <div className='row-content'>{ISBN}</div>
        </li>
        <li className='table-row'>
          <div className='row-title'>Изготовитель</div>
          <div className='row-content'>{producer}</div>
        </li>
      </ul>
    </div>
  );
};
