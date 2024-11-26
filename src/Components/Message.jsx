import { Avatar, HStack ,Text} from '@chakra-ui/react'
import React from 'react'

const Message = ({text, uri, user="Other"}) => {
  return (
    <HStack alignSelf={user==="me"?"flex-end":"flex-start"} borderRadius={"base"} bg={"gray.100"} paddingY={"2"} paddingX={user==="me"?"4":"2"}>
        {
            user==="Other" && <Avatar src='uri' />
        }
        <Text>{text}</Text>
        {
            user==="me" && <Avatar src='uri' />
        }
    </HStack>
  )
}

export default Message