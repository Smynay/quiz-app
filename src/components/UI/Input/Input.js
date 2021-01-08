import React from 'react';
import './Input.scss';

function isInvalid({ valid, touched, shouldValidate }) {
  return !valid && shouldValidate && touched;
}

function Input(props) {
  const inputType = props.type || 'text';
  const cls = ['Input'];
  const htmlFor = `${inputType}-${Math.random()}`;

  if (isInvalid(props)) {
    cls.push('invalid');
  }

  return (
    <div className={cls.join(' ')}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <input
        id={htmlFor}
        type={inputType}
        value={props.value}
        onChange={props.onChange}
      />
      {isInvalid(props) ? (
        <span>{props.errorMessage || 'Введите верное значение'}</span>
      ) : null}
    </div>
  );
}

export default Input;
