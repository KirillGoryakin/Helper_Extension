import { Flex, Switch, Text } from "@chakra-ui/react";

const OptionItem = ({ children, value, setValue, type = 'switch' }) => {
  if (type === 'switch') return (
    <Flex
      as='label'
      justifyContent='space-between'
      alignItems='center'
      py={1}
      px={2}
      mr={2}
      borderRadius={5}
      cursor='pointer'
      transition='background 0.15s ease-in-out'
      _hover={{
        background: 'rgba(0, 0, 0, 10%)'
      }}
    >
      <Text
        fontSize={16}
        fontWeight={500}
      >
        {children}
      </Text>
      <Switch
        colorScheme='secondary'
        isChecked={value}
        onChange={(e) => setValue(e.target.checked)}
      />
    </Flex>
  )

  return null;
}

export { OptionItem };