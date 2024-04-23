import { Wrap, WrapItem, Box, Link as ChakraLink } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const Links = ({ titles }) => {
  return (
    <Wrap justifyContent="center" alignItems="center" mt="6rem">
      {titles.map((title, index) => {
        return (
          <WrapItem key={index}>
            <Box fontSize="18px" marginRight="1rem">
              {title === "You have an account? Login up here" ? (
                <Link to="/">
                  <ChakraLink color="gray.500">{title}</ChakraLink>
                </Link>
              ) : (
                title === "You don't have an account? Sign up here" ? (
                  <Link to="/registration">
                    <ChakraLink color="gray.500">{title}</ChakraLink>
                  </Link>
                ) : (
                  <ChakraLink color="gray.500">{title}</ChakraLink>
                )
              )}
            </Box>
          </WrapItem>
        );
      })}
    </Wrap>
  );
};
