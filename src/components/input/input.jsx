import { forwardRef, Fragment, useState } from 'react';

import { ReactComponent as OpenEye } from '../../assets/open-eye.svg';
import { ReactComponent as CloseEye } from '../../assets/close-eye.svg';
import { ReactComponent as ValidIcon } from '../../assets/valid-success-icon.svg';

import './input.scss';

export const Input = forwardRef((props, ref) => {
  const { type, onChange, onFocus, onBlur, placeholder, checkMark, className, register, isError, ...restProps } = props;

  const [viewPasswordMode, setViewPasswordMode] = useState('private');
  const [inputFocus, setInputFocus] = useState(false);
  const [value, setValue] = useState('');

  const classFocusInputContainerClass = `${inputFocus || value ? 'focus-input-container' : 'un-focus-input-container'}`;
  const classErrorInputContainer = `${isError ? 'error-input' : ''}`;
  const classLabelPlaceholder = `${value || inputFocus ? 'form-label' : ''}`;
  const classInputFocusContent = `${value || inputFocus ? 'input-focus-content' : 'input-un-focus-content'}`;

  const onFocusHandler = (e) => {
    setInputFocus(true);
    if (onFocus) onFocus(e);
  };
  const onBlurHandler = (e) => {
    setValue(e.currentTarget.value);
    setInputFocus(false);
    if (onBlur) onBlur(e);
  };
  const onChangeHandler = (e) => {
    setValue(e.currentTarget.value);
    if (onChange) onChange(e);
  };

  return (
    <div className={`input-item ${classFocusInputContainerClass} ${classErrorInputContainer} `}>
      <input
        className={!isError ? 'input' : 'input error'}
        type={type === 'password' ? (viewPasswordMode === 'private' ? 'password' : 'text') : type}
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
        onChange={onChangeHandler}
        ref={ref}
        {...restProps}
      />
      <label className={classLabelPlaceholder}>{placeholder}</label>
      {/* </div> */}
      {(value || inputFocus) && (
        <Fragment>
          {type === 'password' && checkMark && (
            <ValidIcon data-test-id='checkmark' className='validation-success-icon' title='check-true' />
          )}
          {type === 'password' && viewPasswordMode === 'public' && (
            <OpenEye
              className='show-password-icon'
              data-test-id='eye-opened'
              onClick={() => setViewPasswordMode('private')}
            />
          )}
          {type === 'password' && viewPasswordMode === 'private' && (
            <CloseEye
              className='show-password-icon'
              data-test-id='eye-closed'
              onClick={() => setViewPasswordMode('public')}
            />
          )}
        </Fragment>
      )}
    </div>
  );
});
