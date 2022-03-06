import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getByName, getCharacters } from '../actions/index'
import logo from '../assets/logo-marvel.png'
import '../styles/nav.scss'

function Nav() {
    const dispatch = useDispatch()
    const location = useLocation()

    const [name, setName] = useState('')

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getByName(name))
        setName('')
    }

    function handleChange(e) {
        setName(e.target.value)
    }

    function handleClick() {
        dispatch(getCharacters())
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-dark style">
                <div className="container">
                    <Link to='/'>
                        <img src={logo} height="50px" alt="logo-marvel" onClick={handleClick} />
                    </Link>
                    {location.pathname !== '/favoriteCharacters' && location.pathname === '/' ?
                        <>
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
                                        <input className="form-control me-2" type="search" value={name} placeholder="Character name..." onChange={handleChange} />
                                        <button className="btn btn-outline-success" type="submit" onClick={handleSubmit}>Search</button>
                                    </div>
                                </form>
                            </div>
                        </> :
                        location.pathname !== '/favoriteCharacters' && location.pathname !== '/' ?
                            <>
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
                                </div>
                            </> : ""
                    }
                </div>
            </nav>
        </div>
    )
}

export default Nav;