import React from 'react'
import { Badge, Button, ButtonGroup, Card, CardBody, Col, Container, FormCheck, Image, ProgressBar, Row } from 'react-bootstrap'
import './styles.css';
import { Plus, Trash } from 'react-bootstrap-icons';

const Cart = () => {
    const product = {
        "id": 1,
        "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        "price": "9506.28",
        "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        "rating": {
            "rate": 3.9,
            "count": 120
        }
    };

    const {
        id,
        title,
        price,
        description,
        category,
        image,
        quantity = 1
    } = product

    const totalCount = 10;
    const totalPrice = 58000;
    return (
        <Container fluid>
            <Row>
                <h2>Shopping Cart</h2>
                <hr />
                {/* left section */}
                <Col md={9}>
                    <Card className='cart-item mb-3'>
                        <CardBody>
                            <Row>
                                <Col md={3}>
                                    <Image src={image} fluid />
                                </Col>

                                <Col md={7}>
                                    <h5>{title}</h5>
                                    <section className='text-success'>In Stocks</section>
                                    <small className='text-muted'>Eligible for FREE Shipping</small>

                                    <FormCheck type='checkbox' label="This will be a gift" className='mt-2' />

                                    <span className='cart-qty rounded-border'>
                                        <span>🗑️</span>

                                        {/* <Trash fontWeight={900} /> */}
                                        <span>{quantity}</span>
                                        <span>➕</span>
                                        {/* <Plus fontWeight={900} /> */}
                                    </span>

                                    <Button size='sm' variant='link'>Delete</Button>
                                    <Button size='sm' variant='link'>Save for Later</Button>
                                    <Button size='sm' variant='link'>See more like this</Button>
                                    <Button size='sm' variant='link'>Share</Button>

                                </Col>
                                <Col md={2} className='text-end'>

                                    <h5>₹{new Intl.NumberFormat("en-IN", { maximumSignificantDigits: 2 }).format(
                                        price
                                    )}</h5>
                                </Col>
                            </Row>


                        </CardBody>
                    </Card>
                </Col>

                {/* right */}
                <Col md={3}>
                    <Card>
                        <CardBody>
                            <section>
                                <section className='d-flex align-items-center'>
                                    <ProgressBar className='w-100 me-3' variant="success" now={price} max={499} />
                                    <span>₹499</span>
                                </section>
                                {price > 499 && <small className='text-success'>Your order is eligible for FREE Delivery. Choose FREE Delivery option at checkout</small>}

                            </section>

                            <h5>
                                Subtotal ({totalCount} items) : {new Intl.NumberFormat("en-IN", { maximumSignificantDigits: 2 }).format(
                                    totalPrice
                                )}
                            </h5>
                            <FormCheck label='This order contains a gift' className='mt-3' />
                            <Button variant='warning' className='w-100 rounded-border'>
                                Proceed to Buy
                            </Button>
                        </CardBody>
                    </Card>
                </Col>

            </Row>
        </Container >
    )
}

export default Cart
