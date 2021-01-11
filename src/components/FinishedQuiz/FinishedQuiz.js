import React from 'react';
import { Link } from 'react-router-dom';
import './FinishedQuiz.scss';
import Button from '../UI/Button/Button';

function FinishedQuiz(props) {
  const successCount = Object.keys(props.results).reduce(
    (total, key) => (props.results[key] === 'success' ? ++total : total),
    0
  );

  return (
    <div className="FinishedQuiz">
      <ul>
        {props.quiz.map((quizItem, index) => {
          const cls = [
            'fa',
            props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
            props.results[quizItem.id],
          ];
          return (
            <li key={index}>
              <strong>{index + 1}</strong>.&nbsp;
              {quizItem.question}
              <i className={cls.join(' ')} />
            </li>
          );
        })}
      </ul>
      <p>
        Правильно&nbsp;
        {successCount}&nbsp;из {props.quiz.length}
      </p>
      <div>
        <Button onClick={props.onRetry} type="primary">
          Повторить
        </Button>
        <Link to="/">
          <Button type="success">Список тестов</Button>
        </Link>
      </div>
    </div>
  );
}

export default FinishedQuiz;
