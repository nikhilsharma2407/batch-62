import React, { useEffect } from 'react'
import { Col, Container, Form } from 'react-bootstrap';

const SORT_OPTIONS = [
    {
        id: 'price_increasing',
        label: 'Price Low-High',
        sortKey: 'price',
    },
    {
        id: 'price',
        label: 'Price High-Low',
        sortKey: 'price',
        increasing: false,
    },
    {
        id: 'rating_increasing',
        label: 'Rating Low-High',
        sortKey: 'rating',
    },
    {
        id: 'rating',
        label: 'Rating High-Low',
        sortKey: 'rating',
        increasing: false,
    }
]

const Sort = ({ products, setProducts }) => {

    const onSort = (sortKey, increasing = true) => {
        // p1 = 100
        // p2 = 10
        // p1-p2 +ve (sort)
        // p2-p1 -ve (don't sort)

        const sortedList = [...products];

        sortedList.sort((product_1, product_2) => {
            if (sortKey === 'rating') {
                if (increasing) {
                    return product_1[sortKey].rate - product_2[sortKey].rate;
                } else {
                    return product_2[sortKey].rate - product_1[sortKey].rate;
                }
            } else {
                if (increasing) {
                    return product_1[sortKey] - product_2[sortKey];
                } else {
                    return product_2[sortKey] - product_1[sortKey];
                }
            }
        });
        setProducts(sortedList)
    };

    const handleSort = (e) => {
        const selectedValue = e.target.value;
        const { sortKey, increasing } = JSON.parse(selectedValue);
        onSort(sortKey, increasing);
    }

    return (
        <Col md={4} className='my-2'>
            <Form.Select onChange={handleSort}>
                <option value="" disabled selected>==Select sort option==</option>
                {SORT_OPTIONS.map(({
                    id,
                    label,
                    sortKey,
                    increasing
                }) => <option value={JSON.stringify({ sortKey, increasing })}> {label} </option>)}
            </Form.Select>
        </Col>
    )
}

export default Sort