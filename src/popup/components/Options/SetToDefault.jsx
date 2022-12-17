import Store from "../../Store";
import { defaultOptions } from "../../../utils";
import { Button, Flex } from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
import { useState } from "react";

const SetToDefault = () => {

  const [confirm, setConfirm] = useState(false);

  const handleConfirm = () => {
    Store.setOptions(() => ({ ...defaultOptions }))
    setConfirm(false);
  };
  
  return (
    <Flex
      gap={2}
      mb={2}
    >
      <Button
        onClick={() => setConfirm(true)}
        size='sm'
        colorScheme={confirm ? 'yellow' : 'secondary'}
        variant='solid'
        flexGrow={1}
      >
        {confirm ? 'Are you sure?' : 'Set to Default'}
      </Button>
      {confirm &&
      <>
        <Button
          onClick={handleConfirm}
          size='sm'
          colorScheme='green'
          variant='outline'
        >
          <CheckIcon />
        </Button>
        <Button
          onClick={() => setConfirm(false)}
          size='sm'
          colorScheme='red'
          variant='outline'
        >
          <CloseIcon />
        </Button>
      </>}
    </Flex>
  );
}

export { SetToDefault };