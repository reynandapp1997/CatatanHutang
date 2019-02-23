import { combineReducers } from 'redux';
import HutangReducer from './HutangReducer';
import FormReducer from './FormReducer';

export default combineReducers({
    hutang: HutangReducer,
    form: FormReducer
});
