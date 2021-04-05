import styled from "styled-components";


function ChatScreen(){
    return (
        <Container>
            
        </Container>
    )
}

export default ChatScreen;
const Container = styled.div`
flex: 1;
overflow:scroll;
height: 100vh;

//to hide the scroll 
::-webkit-scrollbar {
    display:none;
}

--ms-overflow-style: none;
scrollbar-width: none;
`;
