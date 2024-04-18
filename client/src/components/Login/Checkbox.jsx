import { Box, Checkbox } from '@chakra-ui/react';
export const CheckboxField = ({ label, isChecked, onChange }) => {
    return (
        <Box textAlign='center'>
            <Checkbox colorScheme='cyan' marginTop='1.5rem' isChecked={isChecked} onChange={onChange}>{label}</Checkbox>
        </Box>
    );
};
