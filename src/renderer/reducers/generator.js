import { extend } from 'lodash';

import {
  GRID_ITEM_SELECTED,
  GENERATOR_PROMPT_QUESTIONS,
  GENERATOR_DIFF,
  GENERATOR_INSTALL,
  GENERATOR_DONE,
  GENERATOR_INSTALLED_GENERATORS,
  NAVIGATE_HOME,
  NAVIGATE_BACK
} from '../actions/action-types';

const initialState = {
  generators: null,
  actualFormType: '',
  questions: [],
  selectedGenerator: {},
  isLoading: false
};

export default function generator(state = initialState, action) {
  switch (action.type) {
    case GRID_ITEM_SELECTED:
      return extend({}, state, {
        actualFormType: 'cwd',
        questions: [{
          message: 'Please specify a folder to be used to generate the project',
          name: 'cwd',
          type: 'folder'
        }],
        selectedGenerator: action.generator
      });
    case GENERATOR_PROMPT_QUESTIONS:
      return extend({}, state, {
        actualFormType: 'prompt',
        questions: action.questions
      });
    case GENERATOR_DIFF:
      return extend({}, state, {
        actualFormType: 'prompt',
        diffData: action.diffData
      });
    case GENERATOR_INSTALL:
      return extend({}, state, {
        isLoading: true,
        actualFormType: '',
        questions: []
      });
    case NAVIGATE_HOME:
    case GENERATOR_DONE:
      return extend({}, state, {
        isLoading: false,
        selectedGenerator: {},
        diffData: null
      });
    case GENERATOR_INSTALLED_GENERATORS:
      return extend({}, state, {
        generators: action.generators
      });
    case NAVIGATE_BACK:
      if (state.actualFormType === 'cwd' && state.questions.length === 1 && state.selectedGenerator.name) {
        return extend({}, state, {
          isLoading: false,
          selectedGenerator: {},
          diffData: null
        });
      }
      if (state.actualFormType === 'prompt' && state.questions.length > 0 && state.selectedGenerator.name) {
        return extend({}, state, {
          actualFormType: 'cwd',
          questions: [{
            message: 'Please specify a folder to be used to generate the project',
            name: 'cwd',
            type: 'folder'
          }],
          diffData: null
        });
      }
      return state;
    default:
      return state;
  }
}
