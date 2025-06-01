import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard';
import { Container, Row } from 'react-bootstrap';

const Products = () => {
    const url = 'https://fakestoreapi.com/products';
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // IIFE
        (async () => {
            const data  = (await axios.get(url)).data;
            console.log(data);
            setProducts(data);
        })();
    }, [])

    return (
        <Container fluid>
            <Row>
                {products.map(product => <ProductCard product={product} key={product.id} />)}
            </Row>
        </Container>
    )
}

export default Products