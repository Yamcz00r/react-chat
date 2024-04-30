import { Box, Button } from "@chakra-ui/react";

export const Popup = ({ message, onClose }) => {
  return (
    <Box
      position="fixed"
      bottom="2rem"
      right="2rem"
      bg="#f5f5f5" 
      boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)" 
      p={4}
      borderRadius="md"
    >
      <p>{message}</p>
      <Button onClick={onClose} ml={2}>
        Close
      </Button>
    </Box>
  );
};
