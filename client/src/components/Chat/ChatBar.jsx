import PropTypes from "prop-types";
import { Box, Text, Button, useDisclosure } from "@chakra-ui/react";
import ChatItem from "./ChatItem.jsx";
import { useNavigate } from "react-router-dom";
import { socket } from "../../socket";
import ChatCreationModal from "./ChatCreationModal";
export default function ChatBar({ chats, currentChat, revalidate }) {
  const navigate = useNavigate();
  const handleJoinChat = (chat) => {
    socket.emit("joinRoom", chat);
    navigate(`chat/${chat.conversation_id}`);
  };
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      width="25%"
      height="100%"
      padding={2}
      borderRight="1px solid"
      borderRightColor="rgba(0, 0, 0, 0.1)"
      position="relative"
    >
      <Box marginY={6}>
        <Text fontWeight="bold" fontSize="x-large">
          Chats
        </Text>
      </Box>
      {chats.length > 0 ? (
        chats.map((chat) => {
          return (
            <ChatItem
              key={chat.conversation_id}
              chat={chat}
              onJoin={handleJoinChat}
              currentChat={currentChat}
            />
          );
        })
      ) : (
        <Box display="flex" flexDirection="column" gap={3}>
          <Text textAlign="center" fontWeight="medium">
            You dont have any chats!
          </Text>
          <Button w="40%" alignSelf="center" onClick={onOpen}>
            Create chat
          </Button>
        </Box>
      )}
      {isOpen && (
        <ChatCreationModal
          onClose={onClose}
          isOpen={isOpen}
          revalidate={revalidate}
        />
      )}
      <Box
        padding={3}
        width="full"
        position="absolute"
        bottom="0"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Button colorScheme="green" onClick={onOpen}>
          Create new chat
        </Button>
      </Box>
    </Box>
  );
}

ChatBar.propTypes = {
  chats: PropTypes.array,
  currentChat: PropTypes.string,
  revalidate: PropTypes.func,
};
