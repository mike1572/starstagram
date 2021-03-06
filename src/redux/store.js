
import { createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import dataReducer from './reducers/dataReducer';

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
    data: dataReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducers,
    initialState, 
    composeEnhancers(
        applyMiddleware(...middleware) 
    )
);

export default store;
