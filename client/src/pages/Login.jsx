import { useState } from "react";
import { Box, Heading, Input, useToast } from "@chakra-ui/react";
import { Links, LocalButton, PasswordInput } from "../components/Login/index";
import { RemoveScrollBar } from "react-remove-scroll-bar";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        status: "warning",
        isClosable: true,
        title: "Check form values",
        description: "Each input in form must be filled up!",
      });
      return;
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      flexDirection="column"
      marginTop="2rem"
    >
      <Heading fontSize="4rem" textAlign="center">
        Login
      </Heading>
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          gap={10}
          marginTop="1.5rem"
        >
          <Input
            width="35rem"
            placeholder={`Enter your email`}
            size="md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        <LocalButton />
      </form>
      <Links
        titles={[
          "Forgot your password ?",
          "Privacy policy",
          "Regulations",
          "You don't have an account? Sign up here",
        ]}
      />
      <RemoveScrollBar />
    </Box>
  );
};

export default Login;
