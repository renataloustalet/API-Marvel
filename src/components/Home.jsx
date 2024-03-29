import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCharacters } from '../actions/index';
import { Link } from 'react-router-dom';
import loading from '../assets/loading.png';
import '../styles/home.scss';

function renderData(data) {
    return (
            <div className="container">
                <div className="row">
                    {data.length > 0 ? data?.map(e => {
                        return (
                            <div key={e.id} className="col grid">
                                <div className="cuadrado">
                                    <p>{e.name}</p>
                                    <Link to={"/character/" + e.id}>
                                        <img alt="superhero" src={`${e.thumbnail.path}.${e.thumbnail.extension}`} className='superhero' />
                                    </Link>
                                </div>
                            </div>
                        )
                    }) : <img src={loading} className='loading' alt='loading' />}
                </div>
        </div>
    )
};

function Home() {

    const dispatch = useDispatch();
    const data = useSelector(state => state.characters);
    const [currentPage, setcurrentPage] = useState(1);
    const [itemsPerPage, setitemsPerPage] = useState(6);

    const [pageNumberLimit, setpageNumberLimit] = useState(5);
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setminPageNumberLimit] = useState(0);


    useEffect(() => {
        dispatch(getCharacters());
    }, [dispatch]);

    const handleClick = (event) => {
        setcurrentPage(Number(event.target.id));
    };

    const pages = [];
    for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
        pages.push(i);
    };

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
        };
    });

    function handleNextbtn() {
        setcurrentPage(currentPage + 1);

        if (currentPage + 1 > maxPageNumberLimit) {
            setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        };
    };

    function handlePrevbtn() {
        setcurrentPage(currentPage - 1);

        if ((currentPage - 1) % pageNumberLimit === 0) {
            setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        };
    };

    let pageIncrementBtn = null;
    if (pages.length > maxPageNumberLimit) {
        pageIncrementBtn = <li onClick={handleNextbtn}> &gt; </li>;
    };

    let pageDecrementBtn = null;
    if (minPageNumberLimit >= 1) {
        pageDecrementBtn = <li onClick={handlePrevbtn}> &lt; </li>;
    };

    return (
        <div>
            {renderData(currentItems)}
            <div className="pagination">
                <ul>
                    {pageDecrementBtn}
                    {renderPageNumbers}
                    {pageIncrementBtn}
                </ul>
            </div>
        </div>
    );
};


export default Home;