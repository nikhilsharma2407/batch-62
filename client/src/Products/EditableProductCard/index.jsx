import React, { useState } from 'react'
import { Badge, Button, Card, CardBody, CardFooter, CardImg, CardTitle, Col, Container, FormCheck, FormControl, FormGroup, FormLabel, InputGroup, Row } from 'react-bootstrap'
// import '../ProductCard/style.css'
import { Rating } from 'react-simple-star-rating'
import { Field, Form, useFormik } from 'formik'
import { PencilSquare } from 'react-bootstrap-icons'

const FIELD_NAMES = {
    ID: '    id',
    TITLE: 'title',
    PRICE: 'price',
    DESCRIPTION: 'description',
    IMAGE: 'image',
    DISCOUNT_PERCENT: 'discountPercent',
    HAS_DISCOUNT: 'hasDiscount',
}

const EditIcon = ({ onClick }) => {
    return <PencilSquare onClick={onClick} className='cursor-pointer ms-3' size={25} />
}

const EditableProductCard = ({ values, initialValues, resetForm }) => {
    const [editField, setEditField] = useState(null);

    const {
        id,
        title,
        price,
        description,
        image,
        rating,
        hasDiscount,
        discountPercent
    } = values || {};

    const discountedPrice = (price * (1 - discountPercent / 100)).toFixed(2);

    const onSubmit = () => {
        console.log("🚀 ~ onSubmit ~ values:", values);
    }


    return (
        <Form>
            <Container fluid>
                <Row>
                    <Col md={{ span: 5, offset: 3 }}>
                        <Card className='product mb-3'>
                            <CardImg loading='lazy' className='image' src={image} variant='top'></CardImg>
                            <CardBody>
                                <FormGroup className='mb-3'>
                                    <FormLabel>Product Title</FormLabel>
                                    {editField === FIELD_NAMES.TITLE ?
                                        <Field name={FIELD_NAMES.TITLE} as={FormControl} /> :
                                        <>
                                            <section className='d-flex align-items-center'>
                                                <CardTitle>{title}</CardTitle>
                                                <EditIcon onClick={() => setEditField(FIELD_NAMES.TITLE)} />
                                            </section>
                                        </>
                                    }
                                </FormGroup>

                                <FormGroup className='mb-3'>
                                    <FormLabel>Product Price</FormLabel>
                                    {editField === FIELD_NAMES.PRICE ?
                                        <>
                                            <InputGroup className="mb-3">
                                                <InputGroup.Text>$</InputGroup.Text>
                                                <Field name={FIELD_NAMES.PRICE} as={FormControl} />
                                            </InputGroup>

                                            <FormGroup className='mt-3 d-flex align-items-center'>
                                                <Field type="checkbox" name={FIELD_NAMES.HAS_DISCOUNT} as={FormCheck} label="Apply Discount" />
                                            </FormGroup>

                                            {hasDiscount ? <InputGroup className="mb-3">
                                                <Field name={FIELD_NAMES.DISCOUNT_PERCENT} as={FormControl} />
                                                <InputGroup.Text>%</InputGroup.Text>
                                            </InputGroup> : null}
                                        </>
                                        :
                                        <>
                                            <section className='d-flex align-items-center'>
                                                {hasDiscount && discountPercent ? <>
                                                    <span className='text-muted me-2' style={{ textDecoration: "line-through" }}>${price}</span>
                                                    <span className='fw-bold text-danger me-2'> - {discountPercent}%</span>
                                                    <span className='fw-bold text-success'>${discountedPrice}</span>
                                                </> : <section>${price}</section>
                                                }

                                                <EditIcon onClick={() => setEditField(FIELD_NAMES.PRICE)} />
                                            </section>
                                        </>
                                    }
                                </FormGroup>

                                <FormGroup className='mb-3'>
                                    
                                    <FormLabel>Product Description</FormLabel>
                                    <EditIcon onClick={() => setEditField(FIELD_NAMES.DESCRIPTION)}/>
                                    {editField === FIELD_NAMES.DESCRIPTION ?
                                        <Field name={FIELD_NAMES.DESCRIPTION} >
                                            {({ field }) => <FormControl {...field} as="textarea" style={{ height: '100px' }} />}
                                        </Field> :
                                        <>
                                            <section className='d-flex align-items-center'>
                                                <section>{description}</section>
                                            </section>
                                        </>
                                    }
                                </FormGroup>

                                <section className='d-flex align-items-center'>
                                    <Rating
                                        readonly
                                        allowFraction
                                        initialValue={rating.rate}
                                        size={20}
                                    />
                                    <Badge pill bg="info" className='align-self-end ms-1'>
                                        {rating.count}
                                    </Badge>
                                </section>

                            </CardBody>
                            <CardFooter>
                                <Button variant='outline-danger' onClick={() => { resetForm(); setEditField(null) }}>Reset</Button>
                                <Button variant='outline-primary' className='ms-5 ' onClick={() => setEditField(null)}>Preview </Button>
                                <Button variant='outline-success' className='ms-5' onClick={onSubmit}>Submit</Button>

                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Form>
    )
}

export default EditableProductCard