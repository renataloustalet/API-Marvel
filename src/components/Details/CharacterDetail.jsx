import React, { useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { addFavorite, getDetail } from '../../actions/index'
import { Link } from 'react-router-dom'
import './characterDetail.scss'

function CharacterDetail(props) {

    const dispatch = useDispatch();
    const detail = useSelector(state => state.detail)
    const loading = useSelector(state => state.loading)

    useEffect(() => {
        dispatch(getDetail(props.match.params.id))
    }, [])

    return (
        <div>
            {loading ? <h2>loading...</h2> : detail.length > 0 ?
                <div className="card">
                    <div className="row align-items-center">
                        <div className="col-md-4">
                            <h1>{detail[0].name}</h1>
                            <img src={`${detail[0].thumbnail.path}.${detail[0].thumbnail.extension}`} alt="superhero" />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h4>Comics</h4>
                                <hr></hr>
                                <p>{detail[0].comics.length > 0 ? detail[0].comics : <p>Comics not found</p>}</p>
                            </div>
                            <div>
                                <Link to='/' className="back">Back</Link>
                                <button onClick={() => props.addFavorite({ name: detail[0].name, id: detail[0].id }, alert("Add favorite"))} type="button">Add favorite</button>
                            </div>
                        </div>
                    </div>
                </div> : <h2>Character not found</h2>
            }
        </div>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        addFavorite: character => dispatch(addFavorite(character))
    }
}

export default connect(null, mapDispatchToProps)(CharacterDetail);