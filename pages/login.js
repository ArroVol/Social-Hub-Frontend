import styled from "styled-components";
import Head from "next/head";
import { Avatar, IconButton, Button } from "@material-ui/core"
import { auth, provider } from "../firebase";


//routes to "/login" 
//1:10 recommends flex bow froggy the game
function Login(){
//const sign In is an anonymous function (ES6)
    const signIn = () => {
        auth.signInWithPopup(provider).catch(alert)
    }
    return (
        <Container>
            <Head> 
                <title>Login</title>
            </Head>
            <LoginContainer>
             
        <Logo src="https://cdn4.iconfinder.com/data/icons/weby-flat-phone/64/Phone-07-512.png" />
             {/* <Logo src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png" */}
             {/* <img src="../images/call.png" /> */}
        <Button onClick={signIn} variant="outlined">
            Sign in with Google
        </Button>
        {/* <Button variant="outlined">
            Sign in with Google
        </Button> */}
            </LoginContainer>
        </Container>
    )
}
export default Login;

const Container = styled.div`
display: grid;
place-items: center;
height: 100vh;
background-color: whitesmoke;
`;

//flex box froggy
const LoginContainer = styled.div`
padding: 100px;
display: flex;
flex-direction:column;
align-items: center;
background-color: white;
border-radius: 5px;
/* box-shadow: 0px 4px 14px --3px; */
box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7);
`;

const Logo = styled.img`
height: 200px;
width: 200px;
margin-bottom: 50px;
`;