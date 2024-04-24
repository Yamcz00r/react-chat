import React, {useState} from "react";
import { Inputs } from "../components/RegistrationPage/inputs";
import { Box ,Heading, Input } from "@chakra-ui/react";
import { Links, LocalButton, PasswordInput } from '../components/Login/index';
import {RemoveScrollBar} from 'react-remove-scroll-bar';

const Registration = () =>{
    
    const [email, setEmail] = useState('');
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return(
        <Box display='flex' justifyContent='center' alignItems='center' height='100vh' flexDirection='column' marginTop='2rem' >
            <Heading fontSize='4rem' textAlign='center'>Sign Up</Heading> 
            <form onSubmit={handleSubmit} >
                <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column' gap={10} marginTop='1.5rem'>
                    <Inputs value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <Input  width='35rem' placeholder={`Enter your username`} size="md" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
                </Box>
                <LocalButton />
            </form>
            <Links titles={['Forgot your password ?', 'Privacy policy', 'Regulations', "You already have an account? Login up here"]}/>
            <RemoveScrollBar/>
        </Box>
    )
};

export default Registration;