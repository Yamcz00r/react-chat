import PropTypes from "prop-types";
import { Box, Text } from "@chakra-ui/react";
//I will leave here the link to the image instead of image handling
//TODO: Image handling in the future of course😎
export default function ChatItem({ chat, onJoin, currentChat }) {
  const backgroundColor =
    chat.conversation_id.toString() === currentChat
      ? "rgba(0, 0, 0, 0.06)"
      : "transparent";

  return (
    <Box
      w="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      padding={2}
      borderRadius="5px"
      cursor="pointer"
      bgColor={backgroundColor}
      _hover={{
        backgroundColor: "rgba(0, 0, 0, 0.06)",
      }}
      onClick={() => onJoin(chat)}
    >
      <Text fontWeight="medium" fontSize="large">
        {chat.conversation_name}
      </Text>
    </Box>
  );
}

ChatItem.propTypes = {
  chat: PropTypes.object,
  onJoin: PropTypes.func,
  currentChat: PropTypes.string,
};
