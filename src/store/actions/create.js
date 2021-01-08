import axios from '../../axios/axios-quiz';
import { QUIZ_CREATE_QUESTION, QUIZ_CREATION_RESET } from './actionTypes';

export function quizCreateQuestion(item) {
  return {
    type: QUIZ_CREATE_QUESTION,
    item,
  };
}

export function quizCreationReset() {
  return {
    type: QUIZ_CREATION_RESET,
  };
}

export function quizFinishCreate() {
  return async (dispatch, getState) => {
    await axios.post('quizes.json', getState().create.quiz);
  };
}
