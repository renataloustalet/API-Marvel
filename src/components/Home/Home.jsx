import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCharacters } from '../../actions/index'
import { Link } from 'react-router-dom'
import Nav from '../Nav/Nav'
import './home.scss'

function renderData(data) {
    return (
        <div>
            <Nav />
            <div className="container">
                <div className="row">
                    {data?.map(e => {
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
        </div>
    )

};

function Home() {

    const dispatch = useDispatch()
    const data = useSelector(state => state.characters)
    const [currentPage, setcurrentPage] = useState(1);
    const [itemsPerPage, setitemsPerPage] = useState(6);

    const [pageNumberLimit, setpageNumberLimit] = useState(5);
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setminPageNumberLimit] = useState(0);


    useEffect(() => {
        dispatch(getCharacters())
    }, [dispatch])

    const handleClick = (event) => {
        setcurrentPage(Number(event.target.id));
    };

    const pages = [];
    for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
        pages.push(i);
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const renderPageNumbers = pages.map((number) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
            return (
                <li
                    key={number}
                    id={number}
                    onClick={handleClick}
                    className={currentPage === number ? "active" : null}>
                    {number}
                </li>
            );
        } else {
            return null;
        }
    });

    function handleNextbtn() {
        setcurrentPage(currentPage + 1);

        if (currentPage + 1 > maxPageNumberLimit) {
            setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    };

    function handlePrevbtn() {
        setcurrentPage(currentPage - 1);

        if ((currentPage - 1) % pageNumberLimit === 0) {
            setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    };

    let pageIncrementBtn = null;
    if (pages.length > maxPageNumberLimit) {
        pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
    }

    let pageDecrementBtn = null;
    if (minPageNumberLimit >= 1) {
        pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
    }

    return (
        <div>
            {renderData(currentItems)}
            <div className="pagination">
                <ul>
                    <li>
                        <a
                            onClick={handlePrevbtn}
                            disabled={currentPage === pages[0] ? true : false}>
                            &#171;
                        </a>
                    </li>
                    {pageDecrementBtn}
                    {renderPageNumbers}
                    {pageIncrementBtn}
                    <li>
                        <a
                            onClick={handleNextbtn}
                            disabled={currentPage === pages[pages.length - 1] ? true : false}>
                            &#187;
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}


export default Home;