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
} from "@chakra-ui/react";
import PropTypes from "prop-types";

export default function ChatCreationModal({ onClose, isOpen }) {
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
          <form id="chat-creation">
            <FormControl>
              <FormLabel>Enter a chat name</FormLabel>
              <Input type="text" />
            </FormControl>
          </form>
        </ModalBody>
        <ModalFooter gap={5}>
          <Button colorScheme="green" type="submit" form="chat-creation">
            Create chat
          </Button>
          <Button colorScheme="red">Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

//TODO: Make the multiple select component with the text filtering

ChatCreationModal.propTypes = {
  onClose: PropTypes.func,
  isOpen: PropTypes.bool,
};
