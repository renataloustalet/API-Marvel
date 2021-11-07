import React, { useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { addFavorite, getDetail } from '../../actions/index'
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
            <div className="container">
                {loading ? <h2>loading...</h2> : detail.length > 0 ?
                    <div className="card">
                        <div>
                            <h1>{detail[0].name}</h1>
                            <button onClick={() => props.addFavorite({ name: detail[0].name, id: detail[0].id}, alert("Add favorite"))} type="button" className="bt">♥</button>
                        </div>
                        <hr></hr>
                        <img src={`${detail[0].thumbnail.path}.${detail[0].thumbnail.extension}`} className="image" alt="superhero" />
                        <div className="comicsDetail">
                            <hr></hr>
                            <h4>{detail[0].comics.length > 0 ? detail[0].comics : <p>Comics not found</p>}</h4>
                        </div>
                    </div> : <h2>Character not found</h2>
                }
            </div>
        </div>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        addFavorite: character => dispatch(addFavorite(character))
    }
}

export default connect(null, mapDispatchToProps)(CharacterDetail);