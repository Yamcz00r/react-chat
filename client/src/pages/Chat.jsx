import { useParams, useNavigate } from "react-router-dom";
import { Flex, Box, Text, useToast, Button } from "@chakra-ui/react";
import { useState, useEffect, useContext } from "react";
import { authContext } from "../context/AuthContext.jsx";
import MessagesContainer from "../components/Chat/MessagesContainer";
import { socket } from "../socket";
import MessageForm from "../components/Chat/MessageForm";
export default function Chat() {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [chatData, setChatData] = useState({});
  const [refresh, setRefresh] = useState(false);
  const { user } = useContext(authContext);

  const revalidate = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    const getChat = async () => {
      const response = await fetch(`http://localhost:8080/room/${chatId}`);
      if (!response.ok) {
        const errorMessage = await response.json();
        toast({
          status: "error",
          isClosable: true,
          title: "Error",
          description: errorMessage.message,
          position: "bottom-right",
        });
        return;
      }
      const chatData = await response.json();
      setChatData(chatData);
    };
    getChat();
  }, [chatId, refresh]);

  useEffect(() => {
    socket.on("message", (message) => {
      if (message.conversationId !== Number(chatId)) {
        return setChatData(chatData);
      }
      setChatData((prevData) => {
        const existingMessage = prevData.Message.find(
          (messageItem) => messageItem.message_id === message.message_id,
        );
        if (existingMessage) {
          return { ...prevData };
        }
        return { ...prevData, Message: [...prevData.Message, message] };
      });
      console.log(chatData);
    });
  }, [socket, refresh]);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Flex w="full" flexFlow="column" style={{ height: "100vh" }}>
      <Box
        w="full"
        padding={2}
        borderBottom="1px"
        borderBottomColor="rgba(0, 0, 0, 0.1)"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text fontWeight="bold">Chat name: {chatData.conversation_name}</Text>
        <Button colorScheme="red" onClick={logoutHandler}>
          Logout
        </Button>
      </Box>
      <MessagesContainer messages={chatData.Message} user={user} />
      <MessageForm revalidate={revalidate} chatId={chatId} />
    </Flex>
  );
}
