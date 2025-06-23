import React from 'react'
import { Badge, Button } from 'react-bootstrap'
import { BagDash, BagPlus } from 'react-bootstrap-icons'
import './style.css'
const CartCounter = ({ quantity }) => {
    return (
        <>
            <BagDash size={25} className='cart-icon text-danger' />
            <Badge className='cart-icon mx-2' pill>{quantity}</Badge>
            <BagPlus size={25} className='cart-icon text-success'/>
        </>
    )
}

export default CartCounter