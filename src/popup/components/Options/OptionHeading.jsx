import { Heading } from "@chakra-ui/react";

const OptionHeading = ({ children }) =>
  <Heading
    size='md'
    color='secondary.700'
    mb={2}
  >
    {children}
  </Heading>

export { OptionHeading };