import { Wrap, WrapItem, Box, Link } from "@chakra-ui/react"

export const Links = ({ titles }) => {
  return (
    <Wrap justifyContent="center" alignItems="center" mt="6rem">
      {titles.map((title) => {
        return (
          <WrapItem>
            <Box fontSize="18px" marginRight="1rem">
              <Link color="gray">{title}</Link>
            </Box>
          </WrapItem>
        );
      })}
    </Wrap>
  );
};
