import React, { useEffect } from 'react'

const SORT_OPTION = [
    {
        id:1,
        label:'Price High-Low',
        sortKey:'price',
    },
    {
        id:2,
        label:'Price Low-High',
        sortKey:'price',
        increasing: false,
    },
    {
        id:3,
        label:'Rating Low-High',
        sortKey:'rating',
    },
    {
        id:4,
        label:'Rating Low-High',
        sortKey:'rating',
        increasing: false,
    }
]

const Sort = ({ products, setProducts }) => {
    // {
    //     "id": 1,
    //     "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    //     "price": 109.95,
    //     "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    //     "category": "men's clothing",
    //     "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    //     "rating": {
    //         "rate": 3.9,
    //         "count": 120
    //     }
    // }

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

    useEffect(() => {
        // onSort('rating', false);
    }, [])

    return (
        <div>Sort</div>
    )
}

export default Sort