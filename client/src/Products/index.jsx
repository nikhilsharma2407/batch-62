import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard';
import { Container, Row } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import Sort from './Sort';

const Products = () => {
    const url = 'https://fakestoreapi.com/products';
    const [products, setProducts] = useState([]);
    const [searchParams] = useSearchParams();
    useEffect(() => {
        // IIFE
        (async () => {
            const data = (await axios.get(url)).data;
            console.log(data);
            setProducts(data);
        })();
    }, []);

    const search = ({
        title,
        description,
        category
    }) => {
        const searchTerm = searchParams.get('search')?.toLowerCase();
        if (searchTerm) {
            const isPresent = title.toLowerCase().includes(searchTerm) || description.toLowerCase().includes(searchTerm) || category.toLowerCase().includes(search);
            return isPresent
        }
        return true
    }

    return (
        <Container fluid>
            <Sort products={products} setProducts={setProducts} />
            <Row>
                {products.filter(search).map(product => <ProductCard product={product} key={product.id} />)}
            </Row>
        </Container>
    )
}

export default Products