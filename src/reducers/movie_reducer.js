import { GET_MOVIE, CLEAR_MOVIE, SHOW_LOADING_SPINNER, SET_MOVIE_PERSISTED_STATE } from '../actions';

const defaultState = {
    movie: null,
    actors: null,
    directors: [],
    loading: false
}

export default function(state=defaultState, action) {
    switch(action.type) {

        case SET_MOVIE_PERSISTED_STATE:
            return {
                ...state,
                ...action.payload
            }

        case GET_MOVIE:
            return {
                ...state,
                movie: action.payload.movie,
                actors: action.payload.actors,
                loading: false,
                directors: action.payload.directors
            }
        case CLEAR_MOVIE:
            return {
                ...state,
                actors: null,
                directors: []
            } 
        case SHOW_LOADING_SPINNER:
            return {
                ...state,
                loading: true
            }

        default:
            return state;
    }
}