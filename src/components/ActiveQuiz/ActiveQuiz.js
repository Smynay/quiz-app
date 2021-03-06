import React from 'react';
import './ActiveQuiz.scss';
import AnswersList from './AnswersList/AnswersList';

function ActiveQuiz(props) {
  return (
    <div className="ActiveQuiz">
      <p className="Question">
        <span>
          <strong>{props.answerNumber}</strong>.&nbsp; {props.question}
        </span>

        <small>
          {props.answerNumber} из {props.quizLength}
        </small>
      </p>

      <AnswersList
        state={props.state}
        answers={props.answers}
        onAnswerClick={props.onAnswerClick}
      ></AnswersList>
    </div>
  );
}

export default ActiveQuiz;
