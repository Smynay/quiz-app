import {
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZ_SUCCESS,
  QUIZ_SET_STATE,
  QUIZ_FINISH,
  QUIZ_NEXT_QUIESTION,
  QUIZ_RETRY,
} from '../actions/actionTypes';

const initialState = {
  quizes: [],
  loading: true,
  error: null,
  quiz: null,
  results: {},
  isFinished: false,
  answerState: null,
  activeQuestion: 0,
};

export default function quizReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_QUIZES_START:
      return { ...state, loading: true };

    case FETCH_QUIZES_SUCCESS:
      return { ...state, loading: false, quizes: action.quizes };

    case FETCH_QUIZ_SUCCESS:
      return { ...state, loading: false, quiz: action.quiz };

    case FETCH_QUIZES_ERROR:
      return { ...state, loading: false, error: action.error };

    case QUIZ_SET_STATE:
      return {
        ...state,
        answerState: action.answerState,
        results: action.results,
      };

    case QUIZ_FINISH:
      return {
        ...state,
        isFinished: true,
      };

    case QUIZ_NEXT_QUIESTION:
      return {
        ...state,
        activeQuestion: action.activeQuestion,
        answerState: null,
      };

    case QUIZ_RETRY:
      return {
        ...state,
        activeQuestion: 0,
        answerState: 0,
        isFinished: false,
        results: {},
      };

    default:
      return state;
  }
}
