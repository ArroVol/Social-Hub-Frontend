import { Avatar, IconButton, Button } from "@material-ui/core"
import styled from "styled-components";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChatIcon from '@material-ui/icons/Chat';
import SearchIcon from '@material-ui/icons/Search';
import * as EmailValidator from "email-validator";
import {auth, db} from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Chat from "../components/chat";

// making sidebar with material ui
// and styled componenets
// UserAvatar is a self closing component
function Sidebar(){
    //this will keep a real time mapping of the users auth
    const [user] = useAuthState(auth);
    //make a reference to the db
    //goes to our firebase database and queries the user arrays, checks where our email is seen, gives us all of the chats
    const userChatRef = db.collection('chats').where('users', 'array-contains', user.email);
    // maps it to a real time listener for, gives us a snapshot of the database
    //a real time listener
    const [chatsSnapshot] = useCollection(userChatRef);


    const createChat = () => {
        const input = prompt("please enter an email address for the user you wish to chat with");
        if (!input) return;

        //2 checks for
        //1. check if the email is valid (email validator, from packages)
        // also check to make sure its not a chat with themself
        
        if(EmailValidator.validate(input) && !chatAlreadyExists(input) && input !== user.email) {
            //if the email is valid, and it doesnt already exist, and its not the same as the user email
            // push it into the database/ add the chat into the db 'chats' collection
            db.collection('chats').add({
                users: [user.email, input],
            });
        }

    };
        //2. check if the chat already exists

        //recipient email is the person intending to chat with (input)
    const chatAlreadyExists = (recipientEmail) => 
        //need a real time connection to the chats collection
        //use react firebase
        //? optional channing. it could be undefined
        //see if you can find a record of the recipient email alraedy there
        //!! makes it return a boolean if this statement returns true
        !!chatsSnapshot?.docs.find(
            (chat) => 
            chat.data().users.find((user) => user === recipientEmail)?.length > 0
            );

    

    return (
    <Container>
        <Header>
            
        <UserAvatar src={user.photoURL} onClick={() => auth.signOut()}/>
        <IconsContainer>
            <IconButton>
            <ChatIcon />
            </IconButton>
           <IconButton>
           <MoreVertIcon />
           </IconButton>
            
        </IconsContainer>
        </Header> 
        <Search>
        <SearchIcon />
        <SearchInput placeholder="Search in chats" />
        </Search>
        <SideBarButton onClick={createChat}>Start a new chat</SideBarButton>
        {/*Chat list*/}
        {chatsSnapshot?.docs.map((chat) => (
            <Chat key={chat.id} id={chat.id} users={chat.data().users} />
        ))}
    </Container>
    );
}

export default Sidebar;

const Container = styled.div``;

const Search = styled.div`
display: flex;
align-items: center;
padding: 20px;
border-radius: 2px;
`;

const SideBarButton = styled(Button)`
width: 100%;

&&&{
border-top: 1px solid whitesmoke;
border-bottom: 1px solid whitesmoke;
}

`;

const SearchInput = styled.input`
//gets rid of blue outline
outline-width: 0;
border: none;
//uses up the entire width
flex: 1;
`;

const Header = styled.div`
display: flex;
position: sticky;
top: 0;
background-color: white;
z-index: 1;
justify-content: space-between;
align-items: center;
padding: 15px;
height: 80px;
border-bottom: 1px solid whitesmoke;

`;

const UserAvatar = styled(Avatar)`
cursor: pointer;
:hover {
    opacity: 0.8;
}
`;

const IconsContainer = styled.div``;