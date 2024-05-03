import PropTypes from "prop-types";
import { Box, Text, Button, useDisclosure } from "@chakra-ui/react";
import ChatItem from "./ChatItem.jsx";
import { socket } from "../../socket";
import ChatCreationModal from "./ChatCreationModal";
export default function ChatBar({ chats }) {
  const handleJoinChat = (chat) => {
    socket.emit("join_room", chat);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      width="25%"
      height="100%"
      padding={2}
      borderRight="1px solid"
      borderRightColor="rgba(0, 0, 0, 0.1)"
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
      {isOpen && <ChatCreationModal onClose={onClose} isOpen={isOpen} />}
    </Box>
  );
}

ChatBar.propTypes = {
  chats: PropTypes.array,
};
