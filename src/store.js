import {createStore, combineReducers, applyMiddleware} from 'redux';
import {logger} from 'redux-logger';
import thunk from 'redux-thunk';
import logInfo from './reducers/logReducer';
import PhotosInfo from './reducers/photoReducer';
import order from './reducers/orderInfoReducer';


export default createStore(
    combineReducers({
        logInfo: logInfo,
        PhotosInfo: PhotosInfo,
        order: order
    }),
    {},
    applyMiddleware(logger, thunk)
);