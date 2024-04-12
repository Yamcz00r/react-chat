import React, { useState } from 'react';
import { Input, InputGroup, InputRightElement, Button, Stack } from '@chakra-ui/react';

const Login = () => {
    return (
        <>
          <div style={{display:'flex', justifyContent:'center',alignItems:'center', maxHeight:'100vh',flexDirection:'column'}}>
              <h1 style={{fontSize:'4rem'}}>Login</h1>
              <div>
                  <Input width='35rem' placeholder='Enter Username' size="md" />
                  <br />
                  <PasswordInput />
              </div>
            </div>
        </>
    )
};

const PasswordInput = () => {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

    return (
        <InputGroup margin-top='5rem' width='35rem' size='md'>
            <Input
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder='Enter password'
            />
            <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                </Button>
            </InputRightElement>
        </InputGroup>
    );
};
  const LocalButton = () => {
    
    return(
      <Stack align='center'>
        <Button onClick={handleClick} colorScheme='blue' size='sm'>Continue</Button>
      </Stack>
      
  )
  };
export { Login, PasswordInput,LocalButton };
export default Login;
