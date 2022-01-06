import axios from 'axios'

import {
    GET_CHARACTERS,
    GET_BY_NAME,
    GET_DETAIL,
    ADD_FAVORITE,
    REMOVE_FAVORITE,
    LOADING
} from './constantes'

const REACT_APP_URL = 'gateway.marvel.com:443/v1/public/characters'

export function getCharacters() {
    return async function (dispatch) {
        try {
            dispatch({
                type: LOADING
            })
            const res = await axios.get(`https://${REACT_APP_URL}?ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=${process.env.REACT_APP_HASH}&limit=100`);
            return dispatch({
                type: GET_CHARACTERS,
                payload: res.data.data.results.map(el => {
                    return {
                        id: el.id,
                        name: el.name,
                        thumbnail: el.thumbnail,
                        comics: el.comics.items
                    }
                })
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function getByName(name) {
    return async function (dispatch) {
        try {
            const res = await axios.get(`https://${REACT_APP_URL}?apikey=${process.env.REACT_APP_API_KEY}&hash=${process.env.REACT_APP_HASH}&nameStartsWith=${name}`);
            console.log(res)
            console.log(res.config)
            return dispatch({
                type: GET_BY_NAME,
                payload: res.data.data.results
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function getDetail(id) {
    return async function (dispatch) {
        try {
            dispatch({
                type: LOADING
            })
            const res = await axios.get(`https://${REACT_APP_URL}/${id}?apikey=${process.env.REACT_APP_API_KEY}&hash=${process.env.REACT_APP_HASH}`);
            return dispatch({
                type: GET_DETAIL,
                payload: res.data.data.results.map(e => {
                    return {
                        id: e.id,
                        name: e.name,
                        thumbnail: e.thumbnail,
                        comics: e.comics.items.map(e => e.name)
                    }
                })
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function addFavorite(payload) {
    return {
        type: ADD_FAVORITE,
        payload
    }
}

export function removeFavorite(name) {
    return {
        type: REMOVE_FAVORITE,
        payload: name
    }
}
