import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './Quiz.scss';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import Loader from '../../components/UI/Loader/Loader';
import {
  fetchQuizById,
  quizAnswerClick,
  quizRetry,
} from '../../store/actions/quiz';

function Quiz(props) {
  useEffect(() => {
    props.fetchQuizById(props.match.params.id).then(console.log(props.quiz));

    return props.quizRetry;
    //eslint-disable-next-line
  }, [props.match.params.id, props.fetchQuizById]);

  return (
    <div className="Quiz">
      <div className="QuizWrapper" style={{ width: 600 }}>
        <h1> Ответьте на все вопросы </h1>

        {props.loading && !!!props.quiz ? (
          <Loader />
        ) : props.isFinished ? (
          <FinishedQuiz
            results={props.results}
            quiz={props.quiz}
            onRetry={props.quizRetry}
          />
        ) : (
          <ActiveQuiz
            answers={props.quiz[props.activeQuestion].answer}
            question={props.quiz[props.activeQuestion].question}
            onAnswerClick={(id) => props.quizAnswerClick.bind(null, id)}
            quizLength={props.quiz.length}
            answerNumber={props.activeQuestion + 1}
            state={props.answerState}
          ></ActiveQuiz>
        )}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    loading: state.quiz.loading,
    error: state.quiz.error,
    quiz: state.quiz.quiz,
    results: state.quiz.results,
    isFinished: state.quiz.isFinished,
    answerState: state.quiz.answerState,
    activeQuestion: state.quiz.activeQuestion,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizById: (id) => dispatch(fetchQuizById(id)),
    quizAnswerClick: (answerId) => dispatch(quizAnswerClick(answerId)),
    quizRetry: () => dispatch(quizRetry()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
