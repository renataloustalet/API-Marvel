import axios from 'axios'
import {
    GET_CHARACTERS,
    GET_BY_NAME,
    GET_COMICS,
    GET_DETAIL,
    ADD_FAVORITE,
    REMOVE_FAVORITE,
    LOADING
} from './constantes'

// privada : 681080f9c28857045887b54ed35bbc3a7e06cf3b
//publica : fefdc47db4bc9791134225bea5d66311
// ts: 1
//1681080f9c28857045887b54ed35bbc3a7e06cf3bfefdc47db4bc9791134225bea5d66311

// hash: 7c2c51474eb597df7725e0850fb4f254

export function getCharacters() {
    return async function (dispatch) {
        try {
            dispatch({
                type: LOADING
            })
            const res = await axios.get(`https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=fefdc47db4bc9791134225bea5d66311&hash=7c2c51474eb597df7725e0850fb4f254&limit=100`);
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

export function getComics() {
    return async function (dispatch) {
        try {
            const res = await axios.get("https://gateway.marvel.com:443/v1/public/comics?ts=1&apikey=fefdc47db4bc9791134225bea5d66311&hash=7c2c51474eb597df7725e0850fb4f254")
            return dispatch({
                type: GET_COMICS,
                payload: res.data.data.results.map(e => {
                    return {
                        id: e.id,
                        comic: e.title
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
            const res = await axios.get(`https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${name}&apikey=fefdc47db4bc9791134225bea5d66311&hash=7c2c51474eb597df7725e0850fb4f254`);
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
            const res = await axios.get(`https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=fefdc47db4bc9791134225bea5d66311&hash=7c2c51474eb597df7725e0850fb4f254`)
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
