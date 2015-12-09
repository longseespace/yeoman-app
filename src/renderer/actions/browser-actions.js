import {
  GENERATOR_INSTALLED_GENERATORS,
  GENERATOR_PROMPT_QUESTIONS,
  GENERATOR_DIFF,
  GENERATOR_INSTALL,
  GENERATOR_DONE,
  FOLDER_SELECTED,
  NAVIGATE_HOME,
  NAVIGATE_BACK
} from './action-types';

import insight from '../utils/insight.js';

import ipc from 'ipc';

export function generatorsDataReceived(generators) {
  insight.sendEvent('generator', 'total-installed-generators', 'Total installed generators', generators.length);

  return {
    type: GENERATOR_INSTALLED_GENERATORS,
    generators
  };
}

export function questionPrompt(questions) {
  return {
    type: GENERATOR_PROMPT_QUESTIONS,
    questions
  };
}

export function diff(diffData) {
  return {
    type: GENERATOR_DIFF,
    diffData
  };
}

export function generatorInstall() {
  return {
    type: GENERATOR_INSTALL
  };
}

export function generatorDone() {
  insight.sendEvent('generator', 'done');
  return {
    type: GENERATOR_DONE
  };
}

export function folderSelected(cwd) {
  return {
    type: FOLDER_SELECTED,
    cwd
  };
}

export function navigateHome() {
  ipc.send('context-appwindow', 'generator:cancel');
  return {
    type: NAVIGATE_HOME
  };
}

export function navigateBack() {
  ipc.send('context-appwindow', 'generator:cancel');
  return {
    type: NAVIGATE_BACK
  };
}
