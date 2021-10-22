import { combineReducers } from 'redux';
import { reducer } from 'redux-form';

export default combineReducers({
    form: reducer,
})