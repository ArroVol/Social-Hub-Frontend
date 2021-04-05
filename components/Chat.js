import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import getRecipientEmail from "../utils/getRecipientEmail";
import { useAuthState } from "react-firebase-hooks/auth";
import {auth, db} from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";


function Chat({id, users}){
    const router = useRouter();
    const [user] = useAuthState(auth);
    const [recipientSnapshot] = useCollection(db.collection('users').where('email','==', getRecipientEmail(users, user))
    );

    const enterChat = () => {
        //using back ticks for string manipulation to include variables 
        router.push(`/chat/${id}`)
    }
    //an optional chain
    const recipient = recipientSnapshot?.docs?.[0]?.data();
    const recipientEmail = getRecipientEmail(users, user);

    return (
   <Container onClick={enterChat}>
       {recipient ? (
           // turnery statement- if you have the recipient
           //render the user avatar
           <UserAvatar src={recipient?.photoURL} />
        //else
       ) : (
        <UserAvatar>{recipientEmail[0]}
            </UserAvatar>
       )
    }
       
       <p>
           {recipientEmail}
        </p>
   </Container>
    )
    }

export default Chat;

const Container = styled.div`
display: flex;
align-items: center;
cursor: pointer;
padding: 15px;
//protects against super long email addresses
word-break: break-word;

:hover {
    background-color: #e9eaeb;
}
`;

const UserAvatar = styled(Avatar)`
margin: 5px;
margin-right: 15px;
`;