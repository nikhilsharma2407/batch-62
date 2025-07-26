import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard';
import { Container, Row } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import Sort from './Sort';
import ProductFilter from './ProductFilter';

const Products = ({ products, setProducts }) => {
    // const url = 'https://fakestoreapi.com/products';

    const [productCategories, setProductCategories] = useState([]);

    const [activeFilters, setActiveFilters] = useState([]);
    const [searchParams] = useSearchParams();

    // update the loading state here;
    // useEffect(() => {
    //     // IIFE
    //     (async () => {
    //         const data = (await axios.get(url)).data;
    //         setProducts(data);
    //         const uniqueFilters = new Set(data.map(({ category }) => category.toLowerCase()));
    //         console.log("🚀 ~ uniqueFilters:", uniqueFilters);
    //         console.log("🚀 ~ Setting ProductCategories:");
    //         setProductCategories([...uniqueFilters])
    //     })();
    // }, []);

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

    const onFilter = ({ category }) => {
        if (activeFilters.length === 0) {
            return true
        }
        return activeFilters.includes(category);
    }


    return (
        <Container fluid>
            <ProductFilter
                productCategories={productCategories}
                activeFilters={activeFilters}
                setActiveFilters={setActiveFilters}
            />
            <Sort products={products} setProducts={setProducts} />
            <Row>
                {products.filter(onFilter).filter(search).map(product => <ProductCard product={product} key={product.id} />)}
            </Row>
        </Container>
    )
}

export default Products