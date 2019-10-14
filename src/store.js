import { createStore } from 'redux';
import rootReducer from '../src/store/reducer'
const store = createStore(rootReducer);

export default store;