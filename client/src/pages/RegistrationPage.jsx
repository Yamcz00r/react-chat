import { useState } from "react";
import {
  Box,
  Button,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  useToast,
} from "@chakra-ui/react";
import { Links, PasswordInput } from "../components/Login/index";
import { RemoveScrollBar } from "react-remove-scroll-bar";
import { useNavigate } from "react-router-dom";
import { EmailIcon } from "@chakra-ui/icons";
const Registration = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.length || !password.length || !email.length) {
      toast({
        status: "warning",
        isClosable: true,
        title: "Check form values",
        description: "Each input in form must be filled up!",
        position: "bottom-right",
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/auth/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password }),
      });
      if (!response.ok) {
        toast({
          status: "error",
          isClosable: true,
          title: "Error",
          description: "Something went wrong",
          position: "bottom-right",
        });
      }
      const { token } = await response.json();
      localStorage.set("token", token);
      toast({
        status: "success",
        isClosable: true,
        title: "Success",
        description: "You have successfully created your account",
        position: "bottom-right",
      });
      navigate("/home");
    } catch (error) {
      toast({
        status: "error",
        isClosable: true,
        title: "Error",
        description: "Something went wrong",
        position: "bottom-right",
      });
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
        Sign In
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
          <InputGroup size="md">
            <InputLeftElement pointerEvents="none">
              <EmailIcon color="gray.300" />
            </InputLeftElement>
            <Input
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </InputGroup>
          <Input
            width="35rem"
            placeholder={`Enter your username`}
            size="md"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        <Box textAlign="center" marginTop="1.5rem">
          <Button type="submit" colorScheme="blue" size="md">
            Continue
          </Button>
        </Box>
      </form>
      <Links
        titles={[
          "Forgot your password ?",
          "Privacy policy",
          "Regulations",
          "You already have an account? Login up here",
        ]}
      />
      <RemoveScrollBar />
    </Box>
  );
};

export default Registration;
