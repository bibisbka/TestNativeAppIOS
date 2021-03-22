import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import mainReducer from './mainReducer';

const rootReducer = combineReducers({
  mainState: mainReducer,
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export type AppDispatch = typeof store.dispatch;

export default store;
