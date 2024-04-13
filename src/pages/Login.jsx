import React, { useState } from 'react';
import { Input, InputGroup, InputRightElement, Button, Checkbox} from '@chakra-ui/react';

const Login = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
            <h1 style={{ fontSize: '4rem', textAlign: 'center' }}>Login Page</h1>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <Input marginTop='1.5rem' width='35rem' placeholder='Enter Username' size="md" />
                <br />
                <PasswordInput />
            </div>
            <LocalButton />
        </div>
    )
};

const PasswordInput = () => {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

    return (
        <InputGroup width='35rem' size='md'>
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
    const handleClick = () => {
        alert('Logged in!')
    }
    return (
        <div style={{ marginTop: '1.5rem' }}>
            <Button onClick={handleClick} colorScheme='blue' size='md'>Continue</Button>
            <br />
            <div>
                <Checkbox colorScheme='cyan' marginTop='1.5rem' >Remember me</Checkbox>
            </div>
        </div>
    )
};
const Links = () =>{
    return(
        
            <p fontSize='12px'>
                <a href="http://">You dont have account</a>
            </p>
        
    )
};

export { Login, PasswordInput, LocalButton,Links };
export default Login;
