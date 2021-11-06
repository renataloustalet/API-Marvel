import React from 'react'
import './paginado.scss'

function Paginado({ indexPerPage, index, paginado }) {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(index / indexPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <nav>
            <div className="pagination">
                <ul>
                    {pageNumbers &&
                        pageNumbers.map(number => (
                            <li key={number}>
                                <a onClick={() => paginado(number)}>{number}</a>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </nav>
    )
};


export default Paginado;