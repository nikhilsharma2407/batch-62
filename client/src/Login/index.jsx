import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Container, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap'
import './style.css'
import { ENDPOINTS, REQUEST_TYPES, axiosInstance } from '../apiUtils'
import { UserContext } from '../UserContextProvider'
import useApi from '../useApi'
import { useIsLoggedIn } from '../useIsLoggedIn'
import { useLocation, useNavigate } from 'react-router-dom'

const Login = () => {
  const { makeRequest } = useApi(ENDPOINTS.USER.LOGIN, REQUEST_TYPES.POST);
  const { makeRequest: resetPwdRequest, success } = useApi(ENDPOINTS.USER.RESET_PASSWORD, REQUEST_TYPES.PATCH);

  const isLoggedIn = useIsLoggedIn();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showResetForm, setShowResetForm] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      if (state?.redirectionFrom) {
        navigate(state?.redirectionFrom);
      }
    }
  }, [isLoggedIn, state]);

  useEffect(() => {
    if (success) {
      setShowResetForm(false);
      setOtp('')
      setUsername('')
      setPassword('')
    }
  }, [success])

  const onLogin = () => {
    const payload = { username, password };
    makeRequest(payload);
  };

  const onPassowrordReset = () => {
    const payload = { username, password, otp };
    resetPwdRequest(payload);
  }

  return (
    <Container fluid>
      <Row>
        <Col lg={{ span: 4, offset: 4 }} md={{ span: 6, offset: 3 }} sm={{ span: 8, offset: 2 }}
          xs={{ span: 10, offset: 1 }}>
          <Card className='mt-5 login'>
            <CardHeader>
              Login
            </CardHeader>
            <CardBody>
              <FormGroup controlId='username' className='mb-3'>
                <FormLabel>username</FormLabel>
                <FormControl onChange={e => setUsername(e.target.value)} placeholder='Enter username' />
              </FormGroup>
              <FormGroup controlId='Password' className='mb-3'>
                <FormLabel>Password</FormLabel>
                <FormControl onChange={e => setPassword(e.target.value)} placeholder='Enter Password' type='password' />
              </FormGroup>
              {
                showResetForm && <FormGroup controlId='OTP' className='mb-3'>
                  <FormLabel>OTP</FormLabel>
                  <FormControl onChange={e => setOtp(e.target.value)} placeholder='Enter OTP' type='number' />
                </FormGroup>
              }

            </CardBody>
            <CardFooter className='d-flex justify-content-between'>
              {!showResetForm ? <>
                <Button onClick={onLogin} variant='outline-primary'>Login</Button>
                <Button onClick={() => setShowResetForm(true)} variant='outline-danger'>Forgot Password</Button>
              </> :
                <Button onClick={onPassowrordReset} variant='outline-primary'>Reset Password</Button>
              }


            </CardFooter>
          </Card>
        </Col>
      </Row>

    </Container>
  )
}

export default Login