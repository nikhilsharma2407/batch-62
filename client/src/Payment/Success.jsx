import React, { useEffect, useState } from 'react'
import { ENDPOINTS, axiosInstance } from '../apiUtils'
import ProductCard from '../Products/ProductCard'

const Success = () => {
    const [data, setData] = useState(null)
    useEffect(() => {
        (async () => {
            const { data } = (await axiosInstance.get(ENDPOINTS.STRIPE.GET_CHECKOUT_SESSION)).data;
            setData(data);
        })()
    }, [])
    return (
        <>
            <h1>Payment Successful page</h1>
            <div>total - {data?.amountTotal}</div>
            <div>paymentStatus - {data?.paymentStatus}</div>
            {data?.products?.map((product) => <ProductCard product={product} key={product.id}  />)}
        </>
    )
}

export default Success