import { Box, Divider, Heading } from "@chakra-ui/react";
import { Credits } from "./components/Credits";
import { Options } from "./components/Options";

const App = () => {
  return (
    <Box
      p={4}
    >
      <Heading
        size='xl'
        textAlign='center'
        color='primary'
      >
        Hint Extension
      </Heading>
      <Heading
        size='lg'
        textAlign='center'
        color='secondary.700'
      >
        Options
      </Heading>

      <Divider my={4} />

      <Options />

      <Divider my={4} />

      <Credits />
    </Box>
  )
};

export { App };