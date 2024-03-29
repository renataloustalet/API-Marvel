import React from 'react';
import { useSelector, connect } from 'react-redux';
import { removeFavorite } from '../actions';
import { Link } from 'react-router-dom';
import { FAVORITE_CHARACTERS } from "../assets/data/data.json";
import nothingYet from '../assets/nothingYet.svg';
import '../styles/favoriteCharacters.scss';

function FavoriteCharacters(props) {
    const character = useSelector(state => state.favorites);
    const filtrarRepetidos = [...new Set(character.map(e => e.name))];

    return (
        <div className='favoriteCharacters'>
            <div className="contenedor">
                <div>
                    <h1>{FAVORITE_CHARACTERS.TITLE}</h1>
                </div>
                {filtrarRepetidos.length > 0 ? filtrarRepetidos.map(c => {
                    return (
                        <div className="cajitaComics">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <div className="comics">
                                        {c}
                                        <div className="d-md-flex comicButton">
                                            <button onClick={() => props.removeFavorite(c)} type="button">X</button>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    )
                }) : <img src={nothingYet} alt='spiderman' />
                }
                <div className="divLink">
                    <Link to='/' className="linkBack">{FAVORITE_CHARACTERS.BUTTON_BACK}</Link>
                </div>
            </div>
        </div>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        removeFavorite: idCharacter => dispatch(removeFavorite(idCharacter))
    };
}

export default connect(null, mapDispatchToProps)(FavoriteCharacters);