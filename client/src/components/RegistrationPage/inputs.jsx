import { InputGroup, Input, InputLeftElement } from "@chakra-ui/react";
import {EmailIcon} from "@chakra-ui/icons";
import React from "react";

export const Inputs = () =>{
    return(
        <InputGroup size='md'>
            <InputLeftElement pointerEvents='none'>
                <EmailIcon color='gray.300' />
            </InputLeftElement>
            <Input type='email' placeholder='Your email' />
        </InputGroup>
    )
};

