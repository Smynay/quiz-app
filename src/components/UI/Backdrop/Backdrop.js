import React from 'react';
import './Backdrop.scss';

function Backdrop(props) {
  return <div className="Backdrop" onClick={props.onClick} />;
}

export default Backdrop;
