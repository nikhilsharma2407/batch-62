import React, { useContext, useEffect, useReducer, useRef, useState } from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Container, Form, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap'
import './style.css'
import { initialState, signupReducer } from './signupReducer';
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import useApi from '../useApi';
import { ENDPOINTS, REQUEST_TYPES } from '../apiUtils';
import { UserContext } from '../UserContextProvider';

const Signup = () => {
  const { makeRequest: signupApiRequest } = useApi(ENDPOINTS.USER.SIGNUP, REQUEST_TYPES.POST);
  const { userData: qrCode } = useContext(UserContext) || "data:image/png;base64,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";;

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

  useEffect(() => {
    nameRef.current?.focus();
  }, [])

  const togglePwd = () => {
    setShowPassword(!showPassword);
  }

  // const isPasswordValid = password.validation.hasLowerCase &&
  // password.validation.hasUpperCase &&
  // password.validation.hasDigit &&
  // password.validation.hasSpecialSymbol &&
  // password.validation.meetsMinLengthReq;

  const isPasswordValid = Object.values(password.validation).every(Boolean)


  const isFormValid = name.isValid && email.isValid && username.isValid && isPasswordValid;

  const onSignup = () => {
    const payload = {
      name: name.value,
      email: email.value,
      password: password.value,
      username: username.value,
    }
    signupApiRequest(payload)
  }


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
              {qrCode ?
                <section className='d-flex flex-column'>
                  <h1>Two Factor Auth Setup</h1>
                  <h6>Scan this QR code with Google Authenticator</h6>
                  <section className='align-self-center'>
                    <img src={qrCode} />
                  </section>
                </section> : <Form>
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
                  <FormGroup controlId='Password' className='mb-3 position-relative'>
                    <FormLabel>Password</FormLabel>
                    <FormControl autoComplete={false} placeholder='Enter Password' type={showPassword ? 'text' : 'password'}
                      onChange={e => dispatch({ type: "password", payload: e.target.value })} />
                    {password.value && !isPasswordValid && <ul className='small mt-3'>
                      <li className={password.validation.hasLowerCase ? 'text-success' : 'text-danger'}>At least one lowercase letter</li>
                      <li className={password.validation.hasUpperCase ? 'text-success' : 'text-danger'}>At least one uppercase letter</li>
                      <li className={password.validation.hasDigit ? 'text-success' : 'text-danger'}>At least one digit</li>
                      <li className={password.validation.hasSpecialSymbol ? 'text-success' : 'text-danger'}>At least one special symbol</li>
                      <li className={password.validation.meetsMinLengthReq ? 'text-success' : 'text-danger'}>At least 8 characters</li>
                    </ul>}
                    <span className='password-toggle' onClick={togglePwd}>{showPassword ? <Eye /> : <EyeSlash />}</span>
                  </FormGroup>
                </Form>}

            </CardBody>
            {!qrCode && <CardFooter className='d-flex justify-content-center'>
              <Button onClick={onSignup} disabled={!isFormValid} variant='outline-primary'>Signup</Button>
            </CardFooter>}


          </Card>
        </Col>
      </Row>

    </Container>
  )
}

export default Signup