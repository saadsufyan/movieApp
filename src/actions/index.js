import { API_KEY, API_URL } from "../config";

// action types for home

export const GET_POPULAR_MOVIES = 'GET_POPULAR_MOVIES';
export const SEARCH_MOVIES = 'SEARCH_MOVIES';
export const LOAD_MORE_MOVIES = 'LOAD_MORE_MOVIES';
export const CLEAR_MOVIES = 'CLEAR_MOVIES';
export const SET_POPULAR_PERSISTED_STATE = 'SET_POPULAR_PERSISTED_STATE';

// action type for movies

export const GET_MOVIE = 'GET_MOVIE';
export const CLEAR_MOVIE = 'CLEAR_MOVIE';
export const SET_MOVIE_PERSISTED_STATE = 'SET_MOVIE_PERSISTED_STATE';

// action for both

export const SHOW_LOADING_SPINNER = 'SHOW_LOADING_SPINNER';

// action creators for both

export function showLoadingSpinner() {
    return {
        type: SHOW_LOADING_SPINNER,
        payload: null
    }    

}

// action creators for Home 

export function getPopularMovies() {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    const request = fetch(endpoint)
    .then(result => result.json())
    .then(result => {
        return result;
    })
    .catch(error => console.error('Error:', error))

    return {
        type: GET_POPULAR_MOVIES,
        payload: request
    }
}

export function searchMovies(searchTerm) {
    let endpoint;
    if (!searchTerm) {
        endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    } else {
        endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}`;
    }

    const request = fetch(endpoint)
    .then(result => result.json())
    .then(result => {
        return {...result, searchTerm};
    })
    .catch(error => console.error('Error:', error))

    return {
        type: SEARCH_MOVIES,
        payload: request
    }
}

export function loadMoreMovies(searchTerm, currentPage) {
    let endpoint;

    if (searchTerm === '') {
        endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage + 1}`;
    } else {
        endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}&page=${currentPage + 1}`;
    }
    const request = fetch(endpoint)
    .then(result => result.json())
    .then(result => {
        return result;
    })
    .catch(error => console.error('Error:', error))

    return {
        type: LOAD_MORE_MOVIES,
        payload: request
    }    
}

export function clearMovies() {
    return {
        type: CLEAR_MOVIES,
        payload: null
    }    

}

export function setPopularPersistedState(state) {
    return {
        type: SET_POPULAR_PERSISTED_STATE,
        payload: state
    }
}


// action creators for Movie 

export function  clearMovie() {
    return {
        type: CLEAR_MOVIE,
        payload: null
    }    
}

export function getMovie(movieId) {

    let endpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;
    let newState = {};

    const request = fetch(endpoint)
    .then(result => result.json())
    .then(result => {

        if (result.status_code) {
        // If we don't find any movie
            return newState;
        } else {
            newState = {movie:result};
            endpoint = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;

            return fetch(endpoint)
                .then(result => result.json())
                .then(result => {
                    const directors = result.crew.filter((member) =>  member.job === 'director');
                    newState.actors = result.cast;
                    newState.directors = directors;

                    return newState;
                }) 
        }
    })
    .catch(error => console.error('Error:', error));

    return {
        type: GET_MOVIE,
        payload: request
    }
}

export function setMoviePersistedState(state) {
    return {
        type: SET_MOVIE_PERSISTED_STATE,
        payload: state
    }
}