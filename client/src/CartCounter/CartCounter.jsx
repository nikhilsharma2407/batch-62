import React from 'react'
import { Badge, Button } from 'react-bootstrap'
import { BagDash, BagPlus } from 'react-bootstrap-icons'
import './style.css'
const CartCounter = ({ quantity,
    increaseProductInCart,
    decreaseProductInCart }) => {
    return (
        <>
            <BagDash onClick={decreaseProductInCart} size={25} className='cart-icon text-danger' />
            <Badge className='cart-icon mx-2' pill>{quantity}</Badge>
            <BagPlus onClick={increaseProductInCart} size={25} className='cart-icon text-success' />
        </>
    )
}

export default CartCounter