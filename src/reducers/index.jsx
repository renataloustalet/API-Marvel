import {
    GET_BY_NAME,
    GET_CHARACTERS,
    GET_DETAIL,
    ADD_FAVORITE,
    LOADING,
    REMOVE_FAVORITE
} from '../actions/constantes';

const initialState = {
    characters: [],
    detail: [],
    favorites: [],
    loading: false
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_CHARACTERS:
            return {
                ...state,
                characters: action.payload
            }
        case GET_BY_NAME:
            return {
                ...state,
                characters: action.payload
            }
        case GET_DETAIL:
            return {
                ...state,
                detail: action.payload,
                loading: false
            }
        case ADD_FAVORITE:
            return {
                ...state,
                favorites: [...state.favorites, action.payload]
            }
        case REMOVE_FAVORITE:
            return {
                ...state,
                favorites: state.favorites.filter(character => character.name !== action.payload)
            }
        case LOADING:
            return {
                ...state,
                loading: true
            }
        default: return state;
    }
};

export default reducer;