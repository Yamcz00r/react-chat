import {
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  ModalCloseButton,
  Button,
  Box,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import MultipleSelect from "./MultipleSelect.jsx";
import { socket } from "../../socket.js";

export default function ChatCreationModal({ onClose, isOpen, revalidate }) {
  const [filterValue, setFilterValue] = useState("");
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [roomName, setRoomName] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch(
        `http://localhost:8080/auth/search?name=${filterValue}`,
      );
      const users = await response.json();
      setData(users);
    };
    if (filterValue.length) {
      getUsers();
    } else {
      setData([]);
    }
  }, [filterValue]);

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  };
  const handleUserSelect = (user) => {
    setUsers((prevState) => {
      const existingUser = prevState.find(
        (element) => element.user_id === user.user_id,
      );
      if (existingUser) {
        return prevState;
      }
      return [...prevState, user];
    });
    //We are checking if the user is already in the list
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const membersId = [];
    users.forEach((user) => membersId.push(user.user_id.toString()));
    try {
      const response = await fetch("http://localhost:8080/room/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          conversationName: roomName,
          membersId: membersId,
        }),
      });
      if (!response.ok) {
        throw new Error("Error creating a conversation");
      }
      const data = await response.json();
      socket.emit("roomCreated", data);
      revalidate();
    } catch (error) {
      console.error(error);
    }
    onClose();
  };

  const handleCancel = () => {
    setFilterValue("");
    setData([]);
    setUsers([]);
    setRoomName("");
    onClose();
  };

  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      blockScrollOnMount={true}
      size="xl"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create chat</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form id="chat-creation" onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel>Enter a chat name</FormLabel>
              <Input
                type="text"
                value={roomName}
                onChange={(event) => setRoomName(event.target.value)}
              />
            </FormControl>
            <FormControl marginTop={2}>
              <FormLabel>Choose users to invite</FormLabel>
              <MultipleSelect
                data={data}
                onChange={handleFilterChange}
                onSelect={handleUserSelect}
                value={filterValue}
              />
            </FormControl>
            <Text fontWeight="bold">Invited users:</Text>
            <Box marginY={2} display="flex" flexWrap="wrap" gap={5}>
              {users.map((user) => (
                <Box
                  key={user.user_id}
                  width="min-content"
                  borderRadius={6}
                  padding={2}
                  bgColor="green.300"
                  border="1px"
                  borderColor="green"
                >
                  <Text color="white" fontWeight="bold">
                    {user.name}
                  </Text>
                </Box>
              ))}
            </Box>
          </form>
        </ModalBody>
        <ModalFooter gap={5}>
          <Button colorScheme="green" type="submit" form="chat-creation">
            Create chat
          </Button>
          <Button colorScheme="red" onClick={handleCancel}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

//TODO: Make the multiple select component with the text filtering

ChatCreationModal.propTypes = {
  onClose: PropTypes.func,
  isOpen: PropTypes.bool,
  revalidate: PropTypes.func,
};
