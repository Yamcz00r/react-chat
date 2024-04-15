import React, { useState } from 'react';
import { Input, InputGroup, InputRightElement, Button, Checkbox, Box, Heading, Link, Wrap, WrapItem } from '@chakra-ui/react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        alert('Logged in!');
        if (rememberMe) {
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
        }
    };

    const handleRememberMe = () => {
        if (!rememberMe) {
            localStorage.removeItem('username');
            localStorage.removeItem('password');
        }
        setRememberMe(!rememberMe);
    };

    return (
        <Box display='flex' justifyContent='center' alignItems='center' height='100vh' flexDirection='column' marginTop='2rem'>
            <Heading fontSize='4rem' textAlign='center'>Login Page</Heading>
            <form onSubmit={handleSubmit} >
                <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
                    <InputField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <br />
                    <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
                </Box>
                <LocalButton />
                <CheckboxField label="Remember me" isChecked={rememberMe} onChange={handleRememberMe} />
                <Links />
            </form>
        </Box>
    )
};

const InputField = ({ label, value, onChange }) => {
    return (
        <Input marginTop='1.5rem' width='35rem' placeholder={`Enter ${label}`} size="md" value={value} onChange={onChange} />
    );
};

const PasswordInput = ({ value, onChange }) => {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

    return (
        <InputGroup width='35rem' size='md'>
            <Input
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder='Enter password'
                aria-label="Password"
                value={value}
                onChange={onChange}
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
    return (
        <Box textAlign='center' marginTop='1.5rem'>
            <Button type="submit" colorScheme='blue' size='md'>Continue</Button>
        </Box>
    )
};

const CheckboxField = ({ label, isChecked, onChange }) => {
    return (
        <Box textAlign='center'>
            <Checkbox colorScheme='cyan' marginTop='1.5rem' isChecked={isChecked} onChange={onChange}>{label}</Checkbox>
        </Box>
        
    );
};

const Links = () => {
    return (
        <Wrap justifyContent="center" alignItems="center" mt="6rem">
            <WrapItem>
                <Box fontSize='18px' marginRight="1rem">
                    <Link href="http://">Forgot your password?</Link>
                </Box>
            </WrapItem>
            <WrapItem>
                <Box fontSize='18px' marginRight="1rem">
                    <Link href="http://">Regulations</Link>
                </Box>
            </WrapItem>
            <WrapItem>
                <Box fontSize='18px' marginRight="1rem">
                    <Link href="http://">Privacy Policy</Link>
                </Box>
            </WrapItem>
            <WrapItem>
                <Box fontSize='18px' marginRight="1rem">
                    <Link href="http://">You don't have an account? Sign up here.</Link>
                </Box>
            </WrapItem>
            <WrapItem>
                <Box fontSize='18px'>
                    <p>@Project</p>
                </Box>
            </WrapItem>
        </Wrap>
    )
};

export { Login, PasswordInput, LocalButton, CheckboxField, Links };
export default Login;
