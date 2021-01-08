import React from 'react';
import './Button.scss';

function Button(props) {
  const cls = ['Button', props.type];

  return (
    <button
      onClick={props.onClick}
      className={cls.join(' ')}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}

export default Button;
