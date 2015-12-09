import ipc from 'ipc';

import {
  GENERATOR_INSTALLED_GENERATORS,
  GENERATOR_PROMPT_QUESTIONS,
  GENERATOR_DIFF,
  GENERATOR_INSTALL,
  GENERATOR_DONE,
  FOLDER_SELECTED,
  NAVIGATE_HOME,
  NAVIGATE_BACK
} from '../actions/action-types';

import * as BrowserActions from '../actions/browser-actions';

// List events to listen from browser and broadcast to view
const BrowserEvents = {
  [GENERATOR_INSTALLED_GENERATORS]: 'generatorsDataReceived',
  [GENERATOR_PROMPT_QUESTIONS]: 'questionPrompt',
  [GENERATOR_DIFF]: 'diff',
  [GENERATOR_INSTALL]: 'generatorInstall',
  [GENERATOR_DONE]: 'generatorDone',
  [FOLDER_SELECTED]: 'folderSelected',
  [NAVIGATE_HOME]: 'navigateHome',
  [NAVIGATE_BACK]: 'navigateBack'
};

export default function ({ dispatch }) {
  Object.keys(BrowserEvents).forEach((event) => {
    ipc.on(event, function (data) {
      let eventFn = BrowserEvents[event];
      dispatch(BrowserActions[eventFn](data));
    });
  });
}
