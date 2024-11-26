import { Box, Button, Container, HStack, Input, VStack } from "@chakra-ui/react";
import Message from "./Components/Message";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { app } from "./firebase";
import { useEffect, useRef, useState } from "react";
import { addDoc, collection, getFirestore, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";

const auth = getAuth(app);
const db = getFirestore(app);

const loginHandler = ()=>{
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider);
}

const logoutHandler = ()=> signOut(auth);

function App() {
  const [user, setUser] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  
  const divforscroll = useRef(null);

  const submitHandler = async (e)=>{
    e.preventDefault();

    try {
      setMessage("");

      await addDoc(collection(db, "Messages"), {
        text: message,
        uid: user.uid,
        uri: user.photoURL,
        createdAt: serverTimestamp(),
      });
      divforscroll.current.scrollIntoView({behavior:"smooth"});
    }
    catch (error) {
      alert(error);
    }
  }

  useEffect(()=>{
    const q = query(collection(db, "Messages"), orderBy("createdAt", "asc"));
    const unsubscribe = onAuthStateChanged(auth, (data)=>{
      setUser(data);
    })

    const unsubscribeforMessages = onSnapshot(q, (snap)=>{
      setMessages(snap.docs.map((item)=>{
        const id = item.id;
        return {id, ...item.data()};
      }));
    })

    return ()=>{
      unsubscribe();
      unsubscribeforMessages();
    }
  }, []);

  return (
    <Box bg={"red.100"}>
      {user ?
      (<Container h={"100vh"} bg={"white"}>
        <VStack h={"full"} paddingY={"4"}>
          <Button onClick={logoutHandler} w={"full"} colorScheme={"red"}>
            Log Out
          </Button>

          <VStack h="full" w="full" overflowY={"auto"} 
          css={{"&::-webkit-scrollbar":{display:"none",},
          }}>
             {
              messages.map((item)=>(
                <Message 
                key={item.id}
                text={item.text} 
                uri={item.uri}
                user={user.uid === item.uid ? "me":"Other"}
                />
              ))
             }
             <div ref={divforscroll}></div>
          </VStack>
          
          <form onSubmit={submitHandler} style={{width: "100%"}}>
            <HStack>
              <Input placeholder="Enter a Message..." value={message} 
                onChange={(e)=>setMessage(e.target.value)}/>

              <Button colorScheme={"purple"} type="submit">
                Send
              </Button>

            </HStack>
          </form>

        </VStack>
      </Container>)
      :
      (<VStack justifyContent={"center"} h={"100vh"} bg={"white"}>
        <Button onClick={loginHandler} colorScheme={"green"}>
          Sign in With Google
          </Button>
      </VStack>)
      }
    </Box>
  );
}

export default App;
