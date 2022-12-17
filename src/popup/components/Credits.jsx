import { Flex, Image, Link, Text } from "@chakra-ui/react";

const Credits = () => {
  return (
    <>
      <Link
        href="https://github.com/KirillGoryakin/Helper_Extension"
        target='_blank'
        display='flex'
        alignItems='center'
        justifyContent='center'
        mt={2}
        gap={1}
        fontSize='xl'
        fontWeight={600}
        textAlign='center'
        color='secondary.700'
      >
        GitHub repository
        <Image
          src={chrome.runtime.getURL('icons/github.svg')}
          w={6}
          h={6}
        />
      </Link>
      <Flex
        justifyContent='center'
        alignItems='center'
        gap={2}
      >
        <Text
          fontSize='lg'
          fontWeight={600}
          textAlign='center'
          color='primary'
        >
          Extension by
        </Text>
        <Link
          href="https://github.com/KirillGoryakin"
          target='_blank'
          display='flex'
          alignItems='center'
          justifyContent='center'
          gap={1}
          fontSize='xl'
          fontWeight={600}
          textAlign='center'
          color='secondary.700'
        >
          Kirill Goryakin
          <Image
            src={chrome.runtime.getURL('icons/github.svg')}
            w={6}
            h={6}
          />
        </Link>
      </Flex>
    </>
  )
}

export { Credits };