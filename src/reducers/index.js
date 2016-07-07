import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import editorReducer from './editorReducer';

export default combineReducers({
  editorReducer,
  routing: routerReducer,
});
