import React, { useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { addFavorite, getDetail } from '../actions/index'
import { Link, useHistory } from 'react-router-dom'
import loadingImg from '../assets/loading.png'
import notFound from '../assets/notFound.png'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import '../styles/characterDetail.scss'

function CharacterDetail(props) {

    const dispatch = useDispatch();
    const history = useHistory();
    const detail = useSelector(state => state.detail)
    const loading = useSelector(state => state.loading)
    const backHome = () => {
        history.push('/')
    }

    useEffect(() => {
        dispatch(getDetail(props.match.params.id))
    }, [])

    return (
        <div className='characterDetail'>
            {loading && detail.length ? <img src={loadingImg} className='loading' /> : !loading && detail.length ?
                <div>
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
                                    <button onClick={backHome} className="back">Back</button>
                                    <button onClick={() => props.addFavorite({ name: detail[0].name, id: detail[0].id }, alert("add favorite"))} type="button">Add favorite</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> :
                !loading && detail.length < 0 ? 
                <div>
                    <img src={notFound} />
                    <button>Back</button>
                </div> : <img src={loadingImg} className='loading' />
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