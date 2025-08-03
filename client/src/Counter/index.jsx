import React, { useState } from 'react'
import { Badge, Button, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { decrementActionCreator, incrementActionCreator } from './countReducer';

const Counter = () => {
    const state = useSelector(state => state.countReducer);
    console.log("🚀 ~ Counter ~ state:", state)

    const { count } = state
    const dispatch = useDispatch();

    const [incrementBy, setIncrementBy] = useState(1);

    const reduceCount = () => {
        dispatch(decrementActionCreator(1))
        // setCount(count - incrementBy)
    }
    const incrementCount = () => {
        dispatch(incrementActionCreator(10))
        // setCount(count + incrementBy);
    }

    return (
        <>
            <Container>
                <Row>
                    <h1>Reducer</h1>
                    <Col offset={3} className='mt-5'>
                        <Button onClick={reduceCount} style={{ borderRadius: '15rem' }} variant='outline-danger'>-</Button>
                        <Badge className='mx-2' pill>{count}</Badge>
                        <Button onClick={incrementCount} style={{ borderRadius: '15rem' }} variant='outline-success'>+</Button>

                        <h1>count- {count}</h1>
                        <h1>incrementBy- {incrementBy}</h1>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Counter