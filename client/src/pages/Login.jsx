import React, { useState } from 'react';
import { Box, Heading, Input } from '@chakra-ui/react';
import { Links, LocalButton, PasswordInput } from '../components/Login/index';
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <Box display='flex' justifyContent='center' alignItems='center' height='100vh' flexDirection='column' marginTop='2rem'>
            <Heading fontSize='4rem' textAlign='center'>Login</Heading>
            <form onSubmit={handleSubmit} >
                <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column' gap={10} marginTop='1.5rem'>
                    <Input  width='35rem' placeholder={`Enter your username`} size="md" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
                </Box>
                <LocalButton />
                
            </form>
            <Links titles={['Forgot your password ?', 'Privacy policy', 'Regulations', "You don't have an account? Sign up here"]}/>
        </Box>
    )
};

export default Login;
