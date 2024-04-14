import React, { useState } from 'react';
import { Input, InputGroup, InputRightElement, Button, Checkbox, Box, Heading, Link } from '@chakra-ui/react';

const Login = () => {
    return (
        <Box display='flex' justifyContent='center' alignItems='center' height='100vh' flexDirection='column'>
            <Heading fontSize='4rem' textAlign='center'>Login Page</Heading>
            <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
                <InputField label="Username" />
                <br />
                <PasswordInput />
            </Box>
            <LocalButton />
            <Links />
        </Box>
    )
};

const InputField = ({ label }) => {
    return (
        <Input marginTop='1.5rem' width='35rem' placeholder={`Enter ${label}`} size="md" />
    );
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
                aria-label="Password"
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
        <Box marginTop='1.5rem'>
            <Button onClick={handleClick} colorScheme='blue' size='md'>Continue</Button>
            <br />
            <CheckboxField label="Remember me" />
        </Box>
    )
};

const CheckboxField = ({ label }) => {
    return (
        <Checkbox colorScheme='cyan' marginTop='1.5rem'>{label}</Checkbox>
    );
};

const Links = () => {
    return (
        <Box fontSize='12px'>
            <Link href="http://">You don't have an account? Sign up here.</Link>
        </Box>
    )
};

export { Login, PasswordInput, LocalButton, Links };
export default Login;
