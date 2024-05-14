import PropTypes from "prop-types";
import { Box, Text } from "@chakra-ui/react";

export default function Message({ message, user }) {
  const messagePosition =
    message.senderId === user.user_id ? "flex-end" : "flex-start";
  const messageBackgroundColor =
    message.senderId === user.user_id ? "#00B2FF" : "gray.200";
  const messageColor = message.senderId === user.user_id ? "white" : "black";
  return (
    <Box
      w="full"
      display="flex"
      alignItems="center"
      padding={3}
      justifyContent={messagePosition}
    >
      <Box
        bgColor={messageBackgroundColor}
        paddingX={4}
        paddingY={2}
        borderRadius={4}
      >
        <Text color={messageColor} fontWeight="medium">
          {message.text}
        </Text>
      </Box>
    </Box>
  );
}
Message.propTypes = {
  message: PropTypes.object,
  user: PropTypes.object,
};
