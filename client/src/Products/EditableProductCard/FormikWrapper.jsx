import { Form, Formik } from 'formik'
import React from 'react'
import EditableProductCard from '.'
import { useLocation } from 'react-router-dom';

const FormikWrapper = () => {
    const { state: { product } } = useLocation();
    console.log("🚀 ~ FormikWrapper ~ product:", product)

    const {
        id,
        title,
        price,
        description,
        image,
        rating
    } = product


    return (
        <Formik
            initialValues={{
                id,
                title,
                price,
                description,
                image,
                rating,
                hasDiscount:false,
                discountPercent:null,
            }}>
            {(props) => <EditableProductCard {...props} />}
        </Formik>
    )
}

export default FormikWrapper