import { Flex } from "@chakra-ui/react";

const OptionList = ({ children }) => {
  return (
    <Flex
      direction='column'
      mb={4}
    >
      {children}
    </Flex>
  )
}

export { OptionList };