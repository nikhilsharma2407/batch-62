import React from 'react'
import { Badge, Button, Card, CardBody, CardFooter, CardImg, Col } from 'react-bootstrap'
import './style.css'
import { Rating } from 'react-simple-star-rating'
import { BagHeartFill } from 'react-bootstrap-icons'

const ProductCard = ({ product }) => {
    const { id,
        title,
        price,
        description,
        category,
        image,
        rating } = product
    return (
        <Col xl={{ span: 3 }} lg={{ span: 4 }} md={{ span: 5, offset: 0 }} sm={{ span: 10, offset: 1 }}>
            <Card className='product mb-3'>
                <CardImg className='image' src={image} variant='top'></CardImg>
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
                    <Button variant='outline-primary'><BagHeartFill /> Add to Cart</Button>
                </CardFooter>
            </Card>
        </Col>
    )
}

export default ProductCard