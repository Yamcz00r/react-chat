import { Box, useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import ChatBar from "../components/Chat/ChatBar";
import { Outlet, useParams } from "react-router-dom";
export default function Home() {
  const [chats, setChats] = useState([]);
  const [refresh, runRefresh] = useState(false);
  const toast = useToast();
  const { chatId } = useParams();

  const revalidate = () => {
    runRefresh(!refresh);
  };

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
  }, [refresh]);

  return (
    <Box w="100%" height="100vh" display="flex" overflow="hidden">
      <ChatBar revalidate={revalidate} currentChat={chatId} chats={chats} />
      <Outlet />
    </Box>
  );
}
