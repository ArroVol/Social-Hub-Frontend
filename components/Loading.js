//spinner/loader library (yarn add better-react-spinkit)
import { Circle } from "better-react-spinkit";


function Loading(){
    return (
        //applying light styling in in line styling
        //when you are doing in line styles its camel case, also needs two brackets***
        <center style={{ display: "grid", placeItems: "center", height: "100vh"}}>
            <div> 
                <img
                src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png"
                alt=""
                style={{marginBottom: 10}}
                height={200}
                />
                <Circle color="#3CBC28" size={60}/>
            </div>

        </center>
    )
    }

export default Loading

//important!
//when we do server side rendering (which is whats happening here),
// you can use styled components but you have to do aditional steps 
// use in line styles