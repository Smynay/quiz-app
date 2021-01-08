import {
  QUIZ_CREATE_QUESTION,
  QUIZ_CREATION_RESET,
} from '../actions/actionTypes';

const initialState = {
  quiz: [],
};

export default function createReducer(state = initialState, action) {
  switch (action.type) {
    case QUIZ_CREATE_QUESTION:
      return {
        ...state,
        quiz: [...state.quiz, action.item],
      };

    case QUIZ_CREATION_RESET:
      return {
        ...state,
        quiz: [],
      };

    default:
      return state;
  }
}
