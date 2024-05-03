import { Container, Box, Text, Button, useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";

import ChatBar from "../components/Chat/ChatBar";
export default function Home() {
  const [chats, setChats] = useState([]);
  const toast = useToast();
  useEffect(() => {
    const getChats = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/room", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        toast({
          status: "error",
          isClosable: true,
          title: "Error",
          position: "bottom-right",
          description: "Something went wrong",
        });
      }
      const rooms = await response.json();
      setChats(rooms);
    };
    getChats();
  }, []);
  return (
    <Box w="100%" height="100vh" display="flex">
      <ChatBar chats={chats} />
    </Box>
  );
}
