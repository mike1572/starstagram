import apiKey from '../../nasaApi';

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

    SET_ASTRONOMY_DATA,

} from '../types'

export const loadAstronomyPic = (time) => (dispatch) => {
    let today = new Date();
    let date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
    today = today.toString()
    let apiURL;
   
    if (time === 0){
        apiURL = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`;
    } else if (time === 1){
        let nDaysAgo = new Date()
        nDaysAgo.setDate(nDaysAgo.getDate() - 9);
        let endDate = `${nDaysAgo.getFullYear()}-${nDaysAgo.getMonth() + 1}-${nDaysAgo.getDate()}`
        apiURL = `https://api.nasa.gov/planetary/apod?start_date=${endDate}&end_date=${date}&api_key=${apiKey}`;
    } else if (time === 2){
        let nDaysAgo = new Date()
        nDaysAgo.setDate(nDaysAgo.getDate() - 39);
        let endDate = `${nDaysAgo.getFullYear()}-${nDaysAgo.getMonth() + 1}-${nDaysAgo.getDate()}`
        apiURL = `https://api.nasa.gov/planetary/apod?start_date=${endDate}&end_date=${date}&api_key=${apiKey}`;
    }

    fetch(apiURL)
        .then((response) => response.json())
        .then((data) => {
            if (data.error !== undefined){   
                dispatch({
                    type: SET_ASTRONOMY_DATA,
                    payload: []
                })

            } else {
                if (time === 0){
                    let array = []
                    array.push(data)
                    dispatch({
                        type: SET_ASTRONOMY_DATA,
                        payload: array
                    })
                } else {
                    dispatch({
                        type: SET_ASTRONOMY_DATA,
                        payload: data
                    })
                }
                dispatch({
                    type: LOADING_DATA_FALSE
                })
                dispatch({
                    type: SET_SHOW_TIME_CLOSE
                })
            }
        })
        .catch(err => {
            dispatch({
                type: SET_ASTRONOMY_DATA,
                payload: []
            })
            console.log("An error occured")
        })

}

export const setRoverData = (date, rover) => (dispatch) => {
    let apiURL = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?earth_date=${date}&api_key=${apiKey}`;

    if (rover === 'curiosity'){
        dispatch({
            type: SET_ROVER_NUM,
            payload: 0
        })
    } else if (rover === 'opportunity'){
        dispatch({
            type: SET_ROVER_NUM,
            payload: 1
        })
    } else if (rover === 'spirit'){
        dispatch({
            type: SET_ROVER_NUM,
            payload: 2
        })
    }

    dispatch({
        type: LOADING_MARS_POSTS_TRUE
    })
  
    fetch(apiURL)
        .then((response) => response.json())
        .then((data) => {

            if (data.error !== undefined){
                dispatch({
                    type: SET_ROVER_DATA,
                    payload: []
                })
                dispatch({
                    type: LOADING_MARS_POSTS_FALSE
                })

            } else {
                dispatch({
                    type: SET_ROVER_DATA,
                    payload: data.photos
                })
                dispatch({
                    type: LOADING_MARS_POSTS_FALSE
                })
            }
        })
        .catch(err => {
            console.log('An error occured')
        })

}

export const gotToMars = () => (dispatch) => {
    dispatch({
        type: SET_ON_MARS_TRUE
    })
}

export const returnFromoMars = () => (dispatch) => {
    dispatch({
        type: SET_ON_MARS_FALSE
    })
    dispatch({
        type: SET_ROVER_NUM,
        payload: -1
    })
}


export const loadingDataTrue = () => (dispatch) => {
    dispatch({
        type: LOADING_DATA_TRUE
    })
}

export const loadingDataFalse = () => (dispatch) => {
    dispatch({
        type: LOADING_DATA_FALSE
    })
}

export const setTimeToToday = () => (dispatch) => {
    dispatch({
        type: SET_TIME_TODAY
    })
}

export const setTimeTo5 = () => (dispatch) => {
    dispatch({
        type: SET_TIME_5
    })
}

export const setTimeTo10 = () => (dispatch) => {
    dispatch({
        type: SET_TIME_10
    })
}

export const setShowTimeOpen = () => (dispatch) => {
    dispatch({
        type: SET_SHOW_TIME_OPEN
    })
}

export const setShowTimeClose = () => (dispatch) => {
    dispatch({
        type: SET_SHOW_TIME_CLOSE
    })
}