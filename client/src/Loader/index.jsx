import React from 'react'
import { Spinner } from 'react-bootstrap'
import './style.css'

const Loader = ({ isLoading }) => {
    return (
        isLoading ? <Spinner className='loader' animation="border" size='xxl'/> : null
    )
}

export default Loader