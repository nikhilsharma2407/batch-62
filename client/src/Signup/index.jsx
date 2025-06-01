import React, { useEffect, useReducer, useRef, useState } from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Container, Form, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap'
import './style.css'
import { initialState, signupReducer } from './signupReducer';

const Signup = () => {
  const nameRef = useRef(null);
  const [state, dispatch] = useReducer(signupReducer, initialState);
  const [showPassword, setShowPassword] = useState(false);

  const { name, email, password, username } = state;
  // const [name, setName] = useState({value:'', isValid})

  // const [state, setState] = useState('');
  // const [isNameValid, setIsNameValid] = useState(false)
  // useEffect(()=>{
  //   setIsNameValid(namePattern.test(name));
  // },[name]);

  useEffect(()=>{
    nameRef.current.focus();
  },[])

  const togglePwd = () => {
    setShowPassword(!showPassword);
  }

  // const isPasswordValid = password.validation.hasLowerCase &&
  // password.validation.hasUpperCase &&
  // password.validation.hasDigit &&
  // password.validation.hasSpecialSymbol &&
  // password.validation.meetsMinLengthReq;

  const isPasswordValid = Object.values(password.validation).every(Boolean)
  console.log("🚀 ~ Signup ~ isPasswordValid:", isPasswordValid)


  const isFormValid = name.isValid && email.isValid && username.isValid && isPasswordValid;


  return (
    <Container fluid>
      <Row>
        <Col lg={{ span: 4, offset: 4 }} md={{ span: 6, offset: 3 }} sm={{ span: 8, offset: 2 }}
          xs={{ span: 10, offset: 1 }}>
          <Card className='mt-5 signup'>
            <CardHeader>
              Signup
            </CardHeader>
            <CardBody>
              <Form>
                <FormGroup controlId='name' className='mb-3'>
                  <FormLabel>Name</FormLabel>
                  <FormControl autoComplete={false} ref={nameRef} placeholder='Enter Name' onChange={e => dispatch({ type: "name", payload: e.target.value })} />
                  {name.value && !name.isValid && <span className='text-danger'>Name is invalid!</span>}
                </FormGroup>
                <FormGroup controlId='username' className='mb-3'>
                  <FormLabel>username</FormLabel>
                  <FormControl autoComplete={false} placeholder='Enter username' onChange={e => dispatch({ type: "username", payload: e.target.value })} />
                  {username.value && !username.isValid && <span className='text-danger'>Username is invalid!</span>}
                </FormGroup>
                <FormGroup controlId='email' className='mb-3'>
                  <FormLabel>email</FormLabel>
                  <FormControl autoComplete={false} placeholder='Enter Email' onChange={e => dispatch({ type: "email", payload: e.target.value })} />
                  {email.value && !email.isValid && <span className='text-danger'>Email is invalid!</span>}
                </FormGroup>
                <FormGroup controlId='Password' className='mb-3'>
                  <FormLabel>Password</FormLabel>
                  <FormControl autoComplete={false} placeholder='Enter Password' type={showPassword ? 'text' : 'password'}
                    onChange={e => dispatch({ type: "password", payload: e.target.value })} />
                  {password.value && !isPasswordValid &&<ul className='small mt-3'>
                    <li className={password.validation.hasLowerCase ? 'text-success' : 'text-danger'}>At least one lowercase letter</li>
                    <li className={password.validation.hasUpperCase ? 'text-success' : 'text-danger'}>At least one uppercase letter</li>
                    <li className={password.validation.hasDigit ? 'text-success' : 'text-danger'}>At least one digit</li>
                    <li className={password.validation.hasSpecialSymbol ? 'text-success' : 'text-danger'}>At least one special symbol</li>
                    <li className={password.validation.meetsMinLengthReq ? 'text-success' : 'text-danger'}>At least 8 characters</li>
                  </ul>}
                </FormGroup>
              </Form>
            </CardBody>
            <CardFooter className='d-flex justify-content-center'>
              <Button disabled={!isFormValid} variant='outline-primary'>Signup</Button>
              <Button variant='outline-primary' onClick={togglePwd}>Toggle Password</Button>
            </CardFooter>
          </Card>
        </Col>
      </Row>

    </Container>
  )
}

export default Signup