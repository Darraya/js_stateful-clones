'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateWithClones = [];

  for (const action of actions) {
    const newState = stateWithClones[stateWithClones.length - 1]
      ? { ...stateWithClones[stateWithClones.length - 1] }
      : { ...state };

    switch (action.type) {
      case 'clear':
        clear(stateWithClones);
        break;
      case 'addProperties':
        addProperties(stateWithClones, action.extraData, newState);
        break;
      case 'removeProperties':
        removeProperties(stateWithClones, action.keysToRemove, newState);
        break;
    }
  }

  return stateWithClones;
}

function addProperties(stateWithClones, extraData, state) {
  stateWithClones.push({
    ...state,
    ...extraData,
  });
}

function removeProperties(stateWithClones, keysToRemove, state) {
  for (const key of keysToRemove) {
    delete state[key];
  }

  stateWithClones.push(state);
}

function clear(stateWithClones) {
  stateWithClones.push({});
}

module.exports = transformStateWithClones;
