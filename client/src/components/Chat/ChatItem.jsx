import PropTypes from "prop-types";
import { Box, Avatar, Text } from "@chakra-ui/react";
export default function ChatItem({ chat, onJoin }) {
  return (
    <Box
      w="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      padding={2}
      borderRadius="5px"
      _hover={{
        backgroundColor: "rgba(0, 0, 0, 0.06)",
      }}
      onClick={() => onJoin(chat)}
    >
      <Avatar src="https://bit.ly/broken-link" />
      <Text fontWeight="medium" fontSize="large">
        {chat.conversation_name}
      </Text>
    </Box>
  );
}

ChatItem.propTypes = {
  chat: PropTypes.object,
  onJoin: PropTypes.func,
};
