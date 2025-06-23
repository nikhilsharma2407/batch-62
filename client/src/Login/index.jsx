import React, { useContext, useState } from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Container, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap'
import './style.css'
import { ENDPOINTS, REQUEST_TYPES, axiosInstance } from '../apiUtils'
import { UserContext } from '../UserContextProvider'
import useApi from '../useApi'

const Login = () => {
  const { isLoading, makeRequest, message, success } = useApi(ENDPOINTS.USER.LOGIN, REQUEST_TYPES.POST);
  const { userData } = useContext(UserContext)
  
  console.log("🚀 ~ Login ~ isLoading:", isLoading)
  console.log("🚀 ~ Login ~ success:", success)
  console.log("🚀 ~ Login ~ message:", message)
  console.log("🚀 ~ Login ~ userData:", userData)

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = () => {
    const payload = { username, password };
    makeRequest(payload);
  };

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
            </CardBody>
            <CardFooter className='d-flex justify-content-center'>
              <Button onClick={onLogin} variant='outline-primary'>Login</Button>
            </CardFooter>
          </Card>
        </Col>
      </Row>

    </Container>
  )
}

export default Login