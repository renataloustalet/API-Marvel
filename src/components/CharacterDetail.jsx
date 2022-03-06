import React, { useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { addFavorite, getDetail } from '../actions/index'
import { useHistory } from 'react-router-dom'
import loadingImg from '../assets/loading.png'
import notFound from '../assets/notFound.png'
import '../styles/characterDetail.scss'
import Swal from 'sweetalert2'

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
    }, [dispatch])

    return (
        <div className='characterDetail'>
            {loading ? <img src={loadingImg} className='loading' alt='loading' /> :
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
                                <div className='buttons'>
                                    <button onClick={backHome} className="back">Back</button>
                                    <button onClick={() => props.addFavorite({ name: detail[0].name, id: detail[0].id }, Swal.fire({ title: "Added to favorites successfully", confirmButtonColor: 'grey' }))} type="button">Add favorite</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> /* :
                !detail.length ?
                    <div className='notFound'>
                        <img src={notFound} alt='not found' />
                        <button onClick={backHome}>Back</button>
                    </div> : <img src={loadingImg} className='loading' alt='loading' /> */
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