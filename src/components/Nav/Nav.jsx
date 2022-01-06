import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch} from 'react-redux'
import { getByName, getCharacters } from '../../actions/index'
import './nav.scss'

function Nav() {

    const dispatch = useDispatch()

    function handleChange(e) {
        dispatch(getByName(e.target.value))
    }

    function handleClick(){
        dispatch(getCharacters())
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-dark style">
                <div className="container">
                    <Link to='/'>
                        <img src="/images/logo-marvel.png" height="50px" alt="logo-marvel" onClick={handleClick}/>
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span><i className="fa fa-bars"></i></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav mx-auto">
                            <li className="nav-item">
                                <Link to="/favoriteCharacters">
                                    My favorite Characters
                                </Link>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <div className="input-group">
                                <input className="form-control me-2" type="search" placeholder="Character name..." onChange={handleChange} />
                            </div>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Nav;