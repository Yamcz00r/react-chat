import { useState } from "react";
import { Inputs } from "../components/RegistrationPage/inputs";
import { Box, Heading, Input, useToast } from "@chakra-ui/react";
import { Links, PasswordInput } from "../components/Login/index";
import { RemoveScrollBar } from "react-remove-scroll-bar";
import { useNavigate } from "react-router-dom";
import { RegisterButton } from "../components/RegistrationPage/registerButton";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password || !email) {
      toast({
        status: "warning",
        isClosable: true,
        title: "Check form values",
        description: "Each input in form must be filled up!",
      });
      return;
    }
    try {
      const response = await fetch("http://localhost:8080/auth/create", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          username: username,
          password: password,
        }),
      });
      if (!response.ok) {
        toast({
          status: "error",
          isClosable: true,
          title: "Error",
          description: "Something went wrong",
        });
      }
      const token = await response.json();
      localStorage.set("token", token);
      toast({
        status: "success",
        isClosable: true,
        title: "Success",
        description: "You have successfully created your account",
      });
    } catch (error) {
      toast({
        status: "error",
        isClosable: true,
        title: "Error",
        description: "Something went wrong",
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
          <Inputs value={email} onChange={(e) => setEmail(e.target.value)} />
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
        <RegisterButton />
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
