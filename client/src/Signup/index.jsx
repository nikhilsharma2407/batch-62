import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Container, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap'
import './style.css'

const Signup = () => {
const passwordRef = useRef(null);
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');


const [isNameValid, setIsNameValid] = useState(false)

const namePattern = /^[A-Z][a-z]+$/;
const usernamePattern = /^[a-z]+$/;
const emailPattern = /^\w+@[a-z]+\.[a-z]+$/;

useEffect(()=>{
  setIsNameValid(namePattern.test(name));
  console.log("🚀 ~ useEffect ~ isNameValid:", isNameValid)
},[name]);

// const isNameValid = namePattern.test(name);

console.log("🚀 ~ Signup ~ isNameValid:", isNameValid)
const isEmailValid = emailPattern.test(email);
console.log("🚀 ~ Signup ~ isEmailValid:", isEmailValid)
const isUsernameValid = usernamePattern.test(username);
console.log("🚀 ~ Signup ~ isUsernameValid:", isUsernameValid)

const hasLowerCase = /[a-z]/.test(password);
console.log("🚀 ~ Signup ~ hasLowerCase:", hasLowerCase)
const hasUpperCase = /[A-Z]/.test(password);
console.log("🚀 ~ Signup ~ hasUpperCase:", hasUpperCase)
const hasDigit = /\d/.test(password);
console.log("🚀 ~ Signup ~ hasDigit:", hasDigit)
const hasSpecialSymbol = /[\W_]/.test(password);
console.log("🚀 ~ Signup ~ hasSpecialSymbol:", hasSpecialSymbol)

const meetsMinChReq = password.length>=8;
console.log("🚀 ~ Signup ~ meetsMinChReq:", meetsMinChReq)


console.log("🚀 ~ Signup ~ nameRef.current:", passwordRef.current)

const togglePwd  = ()=>{
  const currentType = passwordRef.current.type;
  if (currentType === 'password'){
    passwordRef.current.type = 'text'
  } else {
    passwordRef.current.type = 'password'
  }
}


  return (
    <Container fluid>
      <Row>
        <Col lg={{span:4, offset:4}} md={{span:6, offset:3}} sm={{span:8, offset:2}} 
        xs={{span:10, offset:1}}>
          <Card className='mt-5 signup'>
            <CardHeader>
              Signup
            </CardHeader>
            <CardBody>
                <FormGroup controlId='name' className='mb-3'>
                  <FormLabel>Name</FormLabel>
                  <FormControl placeholder='Enter Name' onChange={e=>setName(e.target.value)}/>
                  {name && !isNameValid && <span className='text-danger'>Name is invalid</span>}
                </FormGroup>
                <FormGroup controlId='username' className='mb-3'>
                  <FormLabel>username</FormLabel>
                  <FormControl placeholder='Enter username' onChange={e=>setUsername(e.target.value)}/>
                </FormGroup>
                <FormGroup controlId='email' className='mb-3'>
                  <FormLabel>email</FormLabel>
                  <FormControl placeholder='Enter Email'onChange={e=>setEmail(e.target.value)}/>
                </FormGroup>
                <FormGroup controlId='Password' className='mb-3'>
                  <FormLabel>Password</FormLabel>
                  <FormControl placeholder='Enter Password' type='password'
                    ref={passwordRef}
                   onChange={e=>setPassword(e.target.value)}/>
                </FormGroup>
            </CardBody>
            <CardFooter className='d-flex justify-content-center'>
              <Button variant='outline-primary'>Signup</Button>
              <Button  variant='outline-primary' onClick={togglePwd}>Toggle Password</Button>
            </CardFooter>
          </Card>
        </Col>
      </Row>

    </Container>
  )
}

export default Signup