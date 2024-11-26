import { Box, Button, Container, HStack, Input, VStack } from "@chakra-ui/react";
import Message from "./Components/Message";

function App() {
  return (
    <Box bg={"red.100"}>
      <Container h={"100vh"} bg={"white"}>
        <VStack h={"full"} paddingY={"4"}>
          <Button w={"full"} colorScheme={"red"}>
            Log Out
          </Button>

          <VStack h="full" w="full">
            <Message text={"Sample Message"} user={"me"}/>
            <Message text={"Sample Message"} />
            <Message text={"Sample Message"} user={"me"}/>
            <Message text={"Sample Message"} user={"me"}/>
            <Message text={"Sample Message"} />
            <Message text={"Sample Message"} />
          </VStack>

          <form style={{width: "100%"}}>
            <HStack>
              <Input placeholder="Enter a Message..."/>
              <Button colorScheme={"purple"} type="submit">
                Send
              </Button>
            </HStack>
          </form>
        </VStack>
      </Container>
    </Box>
  );
}

export default App;
