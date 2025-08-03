import React, { useEffect } from 'react'
import { ENDPOINTS, axiosInstance } from '../apiUtils'

const Success = () => {
    useEffect(() => {
        (async () => {
            const data = await axiosInstance.get(ENDPOINTS.STRIPE.GET_CHECKOUT_SESSION);
            console.log("🚀 ~ Success ~ data:", data)
        })()
    }, [])
    return (
        <div>Payment Successful</div>
    )
}

export default Success