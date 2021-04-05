import styled from "styled-components";
import Head from "next/head";
import Sidebar from "../../components/Sidebar";
import ChatScreen from "../../components/ChatScreen";
import { auth, db } from "../../firebase";
import getRecipientEmail from './../../utils/getRecipientEmail';
import { useAuthState } from 'react-firebase-hooks/auth';

function Chat({ chat, messages }) {
    // pull in our user authenticated object
    const [user] = useAuthState(auth);


    return <Container>
        <Head>
            <title>Chat with {getRecipientEmail(chat.users, user)}</title>
        </Head>
        <Sidebar />

        <ChatContainer>
            
        <ChatScreen chat={chat} messages={messages} />
        </ChatContainer>
    </Container>

}

export default Chat;

// before the user sees the page, fetch props on the server (prefetching the data). 
//the chat will be ready as soon as you hit the page (its server side rendered)
// param context allows you to access the params of the url, and the root url
export async function getServerSideProps(context) {
    //we need to prep the chat and prep the messages beforehand
    //make a reference to the db collection of the chats collections
    const ref = db.collection("chats").doc(context.query.id);

    // prep the messages on the server
    //order the time stamp
    const messagesRes = await ref
    .collection("messages")
    .orderBy("timestamp", "asc")
    .get();
// prepare it, for every single doc create an object
const messages = messagesRes.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
})).map(messages => ({
    ...messages,
    timestamp: messages.timestamp.toDate().getTime()
}));

//prep the chats 
//using that initial reference to build everything off of
    const chatRes = await ref.get();
    //restructure/ create and object for that chat
    const chat = {
        id: chatRes.id,
        //spreading out the rest of the data / unwrapping it
        ... chatRes.data()
    }

    //check if its working 
    console.log(chat, messages);
    console.log(chat.id);
    console.log(chat.users);
//wreturn an object where the props are the following 
    //must stringify the object
    return {
        props: {
            messages: JSON.stringify(messages),
            chat: chat,
        }

    }

}

const Container = styled.div`
display:flex;
`;

const ChatContainer = styled.div``;

