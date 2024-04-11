import { Input } from '@chakra-ui/react'
import { InputGroup } from '@chakra-ui/react'
import { show } from '@chakra-ui/react';
import { InputRightElement } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
const Login = () => {
    return (
        
        <><>
            <h1>Login</h1>
        </><div>
                <Input placeholder='Username' size="md" />
                <br></br>
                <InputGroup size='md'>
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
            </div></>
        
    )
};
export default Login;