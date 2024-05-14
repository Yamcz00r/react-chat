import PropTypes from "prop-types";
import Message from "./Message";
import { Box } from "@chakra-ui/react";
export default function MessagesContainer({ messages, user }) {
  return (
    <Box w="full" minHeight="85%" overflowY="auto">
      {messages?.map((message) => {
        return (
          <Message key={message.message_id} message={message} user={user} />
        );
      })}
    </Box>
  );
}

MessagesContainer.propTypes = {
  messages: PropTypes.array,
  user: PropTypes.object,
};
