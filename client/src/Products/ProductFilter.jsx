import React from 'react'
import { Card, Form } from 'react-bootstrap'

const ProductFilter = ({ productCategories,
    activeFilters,
    setActiveFilters }) => {
    const onFilter = (e) => {
        const selectedFilter = e.target.value;
        // console.log("🚀 ~ onFilter ~ selectedValue:", selectedValue);
        const copyActiveFilters = [...activeFilters];

        const index = copyActiveFilters.indexOf(selectedFilter);
        if (index === -1) {
            // elem does not exist in active filter list
            copyActiveFilters.push(selectedFilter);
        } else {
            // elem exists in active filter list, delete from array
            copyActiveFilters.splice(index, 1)
        }

        setActiveFilters(copyActiveFilters);
    }

    return (
        <Card>
            <Card.Title>Categories</Card.Title>
            <Card.Body>{productCategories.map(productCategory => (
                <Form.Check id={productCategory}
                    label={productCategory}
                    value={productCategory}
                    onChange={onFilter}
                />))
            }</Card.Body>
        </Card>
    )
}

export default ProductFilter