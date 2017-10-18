import { combineReducers } from 'redux'

import collectionList from './components/CollectionList/reducer'
import dialogCreateCollection from './components/DialogCreateCollection/reducer'

const defaultState = {};

const main = (state = defaultState, action) => {
  switch(action.type) {
    default:
      return state;
  }
};

const reducer = combineReducers({
  main,
  collectionList,
  dialogCreateCollection
});


export default reducer;