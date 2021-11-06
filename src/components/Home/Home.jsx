import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCharacters } from '../../actions/index'
import { Link } from 'react-router-dom'
import Paginado from '../Paginado/Paginado'
import './home.scss'

function Home() {

    const dispatch = useDispatch()
    const index = useSelector(state => state.characters)

    const [currentPage, setCurrentPage] = useState(1)
    const [indexPerPage, setIndexPerPage] = useState(6)
    const indexLast = currentPage * indexPerPage
    const indexFirst = indexLast - indexPerPage
    const indexPag = index.slice(indexFirst, indexLast)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    };

    useEffect(() => {
        dispatch(getCharacters())
    }, [dispatch])

    return (
        <div>
            <div className="container">
                <div className="row">
                    {indexPag?.map(e => {
                        return (
                            <div key={e.id} className="col grid">
                                <div className="cuadrado">
                                    <p className="title">{e.name}</p>
                                    <Link to={"/character/" + e.id}>
                                        <img alt="superhero" src={`${e.thumbnail.path}.${e.thumbnail.extension}`} className="imagen" />
                                    </Link>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div>
                <Paginado
                    indexPerPage={indexPerPage}
                    index={index.length}
                    paginado={paginado}
                ></Paginado>
            </div>
        </div>

    )
}


export default Home;