import './hightligth-element.scss';

export const Highlight = (props) => {
  const { filter, str } = props;
  if (!filter) return str;
  const regexp = new RegExp(filter, 'ig');
  const matchValue = str.match(regexp);
  if (matchValue) {
    return str.split(regexp).map((s, index, array) => {
      if (index < array.length - 1) {
        const matchEl = matchValue.shift();
        return (
          <>
            {s}
            <span className='highligth-element' key={s} data-test-id='highlight-matches'>
              {matchEl}
            </span>
          </>
        );
      }
      return s;
    });
  }
  return str;
};
