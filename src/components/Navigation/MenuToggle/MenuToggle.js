import React from 'react';
import './MenuToggle.scss';

function MenuToggle(props) {
  const cls = ['MenuToggle', 'fa', props.isOpen];

  if (props.isOpen) {
    cls.push('fa-times');
    cls.push('open');
  } else {
    cls.push('fa-bars');
  }

  return <i className={cls.join(' ')} onClick={props.onToggle}></i>;
}

export default MenuToggle;
