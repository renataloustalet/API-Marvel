import React from 'react'
import { useSelector, connect } from 'react-redux'
import './favoriteCharacters.scss'
import { removeFavorite } from '../../actions'

function FavoriteCharacters(props) {

    const character = useSelector(state => state.favorites)

    const filtrarRepetidos = [...new Set(character.map(e => e.name))]

    return (
        <div>
            <div className="contenedor">
                <h1>My favorite characters</h1>
                {filtrarRepetidos.length > 0 ? filtrarRepetidos.map(c => {
                    return (
                        <div className="cajitaComics">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <div className="comics">
                                        {c}
                                        <div className="d-md-flex comicButton" >
                                            <button onClick={() => props.removeFavorite(c)} className="bt" type="button">X</button>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    )
                }) : <p>there is nothing yet</p>
                }
            </div>
        </div>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        removeFavorite: idCharacter => dispatch(removeFavorite(idCharacter))
    }
}

export default connect(null, mapDispatchToProps)(FavoriteCharacters);