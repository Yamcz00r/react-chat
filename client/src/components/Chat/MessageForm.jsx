import { useState } from "react";
import PropTypes from "prop-types";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Input, IconButton, Box, useToast } from "@chakra-ui/react";
import { socket } from "../../socket.js";

export default function MessageForm({ chatId, revalidate }) {
  const [messageContent, setMessageContent] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const toast = useToast();
  const handleChangeMessage = (event) => {
    setMessageContent(event.target.value);
  };
  const handleBlurMessage = () => {
    if (!messageContent.length) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    if (!messageContent.length) {
      return;
    }
    const response = await fetch("http://localhost:8080/message/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        conversationId: Number(chatId),
        text: messageContent,
      }),
    });
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
    const result = await response.json();
    socket.emit("newMessage", result);
    setMessageContent("");
    revalidate();
  };

  return (
    <form id="message" onSubmit={handleSubmit}>
      <Box width="full" display="flex" padding={4} gap={2}>
        <Input
          borderRadius={10}
          value={messageContent}
          onChange={handleChangeMessage}
          onBlur={handleBlurMessage}
          placeholder="Write your message"
        />
        <IconButton
          disabled={isDisabled}
          aria-label="Send message"
          type="submit"
          form="message"
          icon={<ArrowForwardIcon />}
        />
      </Box>
    </form>
  );
}
MessageForm.propTypes = {
  chatId: PropTypes.string,
  revalidate: PropTypes.func,
};
