import React, { useContext, useEffect } from 'react'
import { Badge, Button, Card, CardBody, CardFooter, CardImg, Col } from 'react-bootstrap'
import './style.css'
import { Rating } from 'react-simple-star-rating'
import { BagHeartFill, BagX, Trash } from 'react-bootstrap-icons'
import { UserContext } from '../../UserContextProvider'
import CartCounter from '../../CartCounter/CartCounter'
import useApi from '../../useApi'
import { ENDPOINTS, REQUEST_TYPES } from '../../apiUtils'
import '../../CartCounter/style.css'
import { useIsLoggedIn } from '../../useIsLoggedIn'
import { useLocation, useNavigate } from 'react-router-dom'

const ProductCard = ({ product }) => {
    const { makeRequest: incrementCartItemRequest, } = useApi(ENDPOINTS.CART.INCREMENT, REQUEST_TYPES.PATCH)
    const { makeRequest: decrementCartItemRequest, } = useApi(ENDPOINTS.CART.DECREMENT, REQUEST_TYPES.PATCH)
    const { makeRequest: addToCartRequest, } = useApi(ENDPOINTS.CART.ADD, REQUEST_TYPES.POST)
    const { makeRequest: removeFromCartRequest, } = useApi(ENDPOINTS.CART.REMOVE, REQUEST_TYPES.POST)
    const isLoggedIn = useIsLoggedIn();

    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { id,
        title,
        price,
        description,
        category,
        image,
        rating } = product

    const { userData, isLoading } = useContext(UserContext);
    useEffect(() => {
    }, [userData])
    const { cart } = userData || {};

    const productFromCart = cart?.find(product => product.id === id);
    const { quantity } = productFromCart || {}

    const increaseProductInCart = () => {
        if (isLoading) return;
        incrementCartItemRequest(product);
    }
    const decreaseProductInCart = () => {
        if (isLoading) return;
        decrementCartItemRequest(product)
    }

    const addToCart = (e) => {
        if (!isLoggedIn) {
            navigate('/login', { state: { redirectionFrom: pathname } });
        }
        else {
            addToCartRequest({ ...product, quantity });
        }
    }

    const removeFromCart = () => {
        if (isLoading) return;
        removeFromCartRequest({ ...product, quantity });
    }

    const onEdit = () => {
        navigate('/edit', { state: { product } });
    }

    return (
        <Col xl={{ span: 3 }} lg={{ span: 4 }} md={{ span: 5, offset: 0 }} sm={{ span: 10, offset: 1 }}>
            <Card className='product mb-3' onClick={onEdit}>
                <CardImg loading='lazy' className='image' src={image} variant='top'></CardImg>
                <CardBody className='content'>
                    <section className='product-text'>{title}</section>
                    <section className='product-text'>{price}</section>
                    <section className='product-text desc'>{description}</section>
                    <section className='d-flex align-items-center'>
                        <Rating
                            readonly
                            allowFraction
                            initialValue={rating.rate}
                            size={20}
                        />
                        <Badge pill bg="info" className='align-self-end ms-1'>
                            {rating.count}
                        </Badge>
                    </section>
                </CardBody>
                <CardFooter>
                    {quantity ?
                        <>
                            <CartCounter quantity={quantity} disabled={isLoading}
                                increaseProductInCart={increaseProductInCart}
                                decreaseProductInCart={decreaseProductInCart} />
                            <Trash disabled={isLoading} onClick={removeFromCart} className='ms-3 cart-icon text-danger' size={25} />

                        </>

                        :
                        <Button disabled={isLoading} variant='outline-primary' onClick={addToCart}><BagHeartFill /> Add to Cart</Button>}

                </CardFooter>
            </Card>
        </Col>
    )
}

export default ProductCard