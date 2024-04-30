import React from 'react';
import { Box, Button } from '@chakra-ui/react';
export const RegisterButton = ({onClick}) => {
    return (
        <Box textAlign='center' marginTop='1.5rem'>
            <Button type="submit" colorScheme='blue' size='md' onClick={onClick}>Continue</Button>
        </Box>
    )
};
