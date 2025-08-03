import React, { useEffect, useState } from 'react'
import { ENDPOINTS, axiosInstance } from '../apiUtils'
import ProductCard from '../Products/ProductCard'

const Success = () => {
    const [data, setData] = useState(null)
    useEffect(() => {
        (async () => {
            const { data } = (await axiosInstance.get(ENDPOINTS.STRIPE.GET_CHECKOUT_SESSION)).data;
            console.log("🚀 ~ Success ~ data:", data);
            setData(data);
        })()
    }, [])
    // {
    //     "stripeSessionId": "cs_test_a16sIVTszDiP0FsVXqY5KpR7YcbN1unlQOdVOKO9xR1ImCDSYAKsHoGB4E",
    //     "username": "nikhil1234",
    //     "amountTotal": 9506.28,
    //     "currency": "inr",
    //     "paymentStatus": "paid",
    //     "products": []
    // }
    return (
        <>
            <div>Payment Successful</div>
            <div>total - {data?.amountTotal}</div>
            <div>paymentStatus - {data?.paymentStatus}</div>
            {data?.products?.map((product) => <ProductCard product={product} key={product.id}  />)}
        </>
    )
}

export default Success