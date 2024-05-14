import PropTypes from "prop-types";
import { Input, Box } from "@chakra-ui/react";
export default function MultipleSelect({ data, onChange, onSelect, value }) {
  return (
    <Box
      width="full"
      borderRadius={3}
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDir="column"
    >
      <Input
        width="full"
        onChange={onChange}
        value={value}
        placeholder="Type username here..."
      />
      <Box
        bgColor="white"
        borderBottomLeftRadius={5}
        borderBottomRightRadius={5}
        boxShadow="lg"
        width="100%"
      >
        <Box width="full" listStyleType="none" aria-roledescription="list">
          {data.map((user) => (
            <Box
              aria-roledescription="list-item"
              width="full"
              padding={2}
              key={user.user_id}
              onClick={() => onSelect(user)}
              cursor="pointer"
              fontWeight="bold"
              borderRadius={3}
              _hover={{
                backgroundColor: "rgba(0, 0, 0, 0.06)",
              }}
            >
              {user.name}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

MultipleSelect.propTypes = {
  data: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  value: PropTypes.string,
};
