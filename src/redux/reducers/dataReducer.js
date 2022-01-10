
import {
    SET_SHOW_TIME_CLOSE, 
    SET_SHOW_TIME_OPEN, 

    SET_TIME_TODAY, 
    SET_TIME_5, 
    SET_TIME_10, 

    LOADING_DATA_TRUE, 
    LOADING_DATA_FALSE,

    SET_ON_MARS_TRUE, 
    SET_ON_MARS_FALSE,

    LOADING_MARS_POSTS_TRUE,
    LOADING_MARS_POSTS_FALSE,

    SET_ROVER_DATA,
    SET_ROVER_NUM,

    SET_ASTRONOMY_DATA

} from '../types';

const initialState = {
    showTime: false,
    loadingData: true,
    time: 0,
    onMars: false,
    loadingMarsPosts: false,
    roverData: null, 
    roverNum: -1, 
    astronomyData: []
}

export default function (state = initialState, action){
    switch(action.type){
        case SET_ASTRONOMY_DATA: {
            return {
                ...state,
                astronomyData: action.payload
            }
        }
        case SET_ROVER_NUM : {
            return {
                ...state,
                roverNum: action.payload
            }
        }
        case SET_ROVER_DATA: {
            return {
                ...state, 
                roverData: action.payload
            }
        }
        case LOADING_MARS_POSTS_TRUE: {
            return {
                ...state, 
                loadingMarsPosts: true
            }   
        }
        case LOADING_MARS_POSTS_FALSE: {
            return {
                ...state, 
                loadingMarsPosts: false
            }   
        }
        case SET_ON_MARS_TRUE: {
            return {
                ...state, 
                onMars: true
            }
        }
        case SET_ON_MARS_FALSE: {
            return {
                ...state, 
                onMars: false
            }
        }
        case SET_SHOW_TIME_OPEN: {
            return{
                ...state, 
                showTime: true
            }
        }
        case SET_SHOW_TIME_CLOSE: {
            return {
                ...state, 
                showTime: false
            }
        }
        case LOADING_DATA_FALSE: {
            return {
                ...state, 
                loadingData: false
            }
        }
        case LOADING_DATA_TRUE: {
            return {
                ...state, 
                loadingData: true
            }
        }
        case SET_TIME_TODAY: {
            return {
                ...state, 
                time: 0
            }
        }
        case SET_TIME_5: {
            return {
                ...state, 
                time: 1
            }
        }
        case SET_TIME_10: {
            return {
                ...state, 
                time: 2
            }
        }
        default: 
            return state;
    }
}



