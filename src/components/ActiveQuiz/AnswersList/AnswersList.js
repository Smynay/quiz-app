import React from 'react';
import './AnswersList.scss';
import AnswerItem from './AnswerItem/AnswerItem';

function AnswersList(props) {
  return (
    <ul className="AnswersList">
      {props.answers.map((answer, index) => (
        <AnswerItem
          answer={answer}
          key={index}
          onAnswerClick={props.onAnswerClick}
          state={props.state ? props.state[answer.id] : null}
        ></AnswerItem>
      ))}
    </ul>
  );
}

export default AnswersList;
