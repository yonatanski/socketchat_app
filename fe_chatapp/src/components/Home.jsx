import "bootstrap/dist/css/bootstrap.min.css"
import { Socket, io } from "socket.io-client"
import { Container, Row, Col, Form, ListGroup, Button, Image  } from "react-bootstrap"
import Spinner from 'react-bootstrap/Spinner'
import Navbar from 'react-bootstrap/Navbar';
// import { io } from "socket.io-client"
import { FormEvent, KeyboardEventHandler, useEffect, useState } from "react"
import FlushExample from "./ConnectdUserList";
import DefaultExample from "./ConnectdUserList";
import ChatListFiled from "./ChatListFiled";


// import { purple, red } from '@mui/material/colors';

// const primary = red[500]; // #f44336
// const accent = purple['A200']; // #e040fb
// const accent = purple.A200


import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const ADDRESS = "http://localhost:3030"
const socket = io(ADDRESS, { transports: ["websocket"] })

const Home = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [tempo, setTempo] = useState("")
    const [username, setUsername ] = useState("")
    const [room, setRoom] = useState("Blue")
    const [message, setMessage] = useState("")
    const [chatHistory, setChatHistory] = useState([])
    const [onlineUsersList, setOnlineUsersList] = useState([])


    
//           const condtionalStyling= chatHistory && chatHistory?.map((list) =>  console.log("condtionalStyling", list))
//  console.log("condtionalStyling", condtionalStyling)

   const Message ={
        text: "" ,// the content of the message
        sender: "string", // the username of the person who sent the message
        id: "string", // the socket we're sending the message from
        timestamp: null // the number of ms elapsed from 01/01/1970
      }
   
 
 
 
    useEffect(() =>{
        socket.on('connect', ()=>{
            console.log("connection established!")
         })

        socket.on("loggedin", ()=>{
            console.log("You're correctly logged in now")
            setIsLoggedIn(true)
            fecthOnlineUsersList()
     

        socket.on("newConnection",() =>{
            console.log("Look! another client connected!")
            fecthOnlineUsersList()
          
        })
        socket.on("disconnectedUser", () =>{
            console.log("Another client disconnected, refreshing the list...")
            fecthOnlineUsersList()
        })

        socket.on("message", (Message)=>{
            console.log("Another client disconnected, refreshing the list...")
            setChatHistory((chatHistory) => [...chatHistory, Message])
          
        })
    })
   


    },[])

    console.log(username)
    console.log(room)
    console.log(message)
//-----------------------------


const fecthOnlineUsersList = async () =>{
    try{
        let response = await fetch(ADDRESS +"/online-users");
               
         if(response.ok){
            console.log("type", response)
            let data = await response.json()
            console.log("online users: ", data)
            setOnlineUsersList(data.onlineUsers) 
            console.log(onlineUsersList)
          }
        } catch (error) {
            console.log(error)
          }
  }

  const handleUsernameSubmit = (e) => {
    e.preventDefault()
    // we need to send the username to the server
    // the username is safely stored in a 'username' state variable
    // we'll EMIT AN EVENT to the server!
    socket.emit("setUsername", {
      // username: username
      username, 
      room, 
    })
        
  }

  const handleMessageSubmit = (e) => {
    e.preventDefault()

    const messageToSend ={
        text:message,
        sender:username,
        id:socket.id,
        timestamp:Date.now()
  }

  

  socket.emit("sendmessage", {message:messageToSend,room})
  setChatHistory([...chatHistory,messageToSend]) //[hi, hello].map()
  console.log(chatHistory)
  setMessage("")


//   setTempo(messageToSend)

  }



  const handleToggleRoom = () => {
    setRoom((room) => (room === "Blue" ? "Red" : "Blue"))
  }     
  
 

  const userLogo= <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
</svg>
 
 

  return (
    <Container  className="px-4 mt-3 border border-dark" >
        <Navbar className="bg-body-tertiary border border-primary rounded-4 ">
       
          <Navbar.Brand href="#home">
            <>
          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-link-45deg" viewBox="0 0 16 16">
  <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/>
  <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z"/>
</svg>
    <Spinner animation="grow" className="mr-4 " text="bold" />
          <p class="text-capitalize font-weight-bold">Link Me</p>  
          </>
          </Navbar.Brand>
  
      </Navbar>
      <Row style={{ height: "95vh" }} className="px-4 mt-3 ">
        <Col md={9} className="d-flex flex-column justify-content-between mb-0 border border-dark">
          {/* MAIN VIEW COL */}
          {/* TOP SECTION: USERNAME INPUT FIELD */}
          <Form onSubmit={handleUsernameSubmit}  className="d-flex mt-2">
            {isLoggedIn?<Container fluid className="d-flex justify-content-between"><i class="bi bi-person font-weight-bold"> {username} </i> <i class="bi bi-house-door-fill ">{room =="Blue" ? "Blue":"Red"}</i></Container> :
            <>
            <Form.Control type="text" placeholder="Enter your username" value={username} onChange={(e)=>setUsername(e.target.value)} disabled={isLoggedIn}/>
            <Button className="ml-2"  onClick={handleToggleRoom} variant={room === "Blue" ? "primary" : "danger"} disabled={isLoggedIn} >
              Room
            </Button>
            </>
}
          </Form>
          {/* MIDDLE SECTION: CHAT HISTORY */}
          {/* <ListGroup>
         { chatHistory && chatHistory.map((msg) => (
          <ListGroup.Item key={msg.timeStamp} className="d-flex ">
        
            <strong className="d-inline-block" style={{ minWidth: 80 }}>
            {msg.sender}
            </strong>
         
            <span className="ml-auto text-muted">{new Date(msg.timeStamp).toLocaleTimeString()}</span>
           
         
      
             <p>{msg.text}</p>
          
          </ListGroup.Item>
            ))}
          </ListGroup> */}

          {/* <ChatListFiled chatHistory={chatHistory}/> */}


          {/* ------------------------------------- test start---------------------*/}

          <ListGroup>
            {chatHistory.map((message) => (
                    <ListGroup.Item key={message.timestamp} className={message.sender == username? 'd-flex bg-danger' :'d-flex bg-primary'}>
                   
                <div>
                    <Image  alt="Remy Sharp" className="rounded-circle"  src={`https://ui-avatars.com/api/?name=${message.sender}&length=1`} />
                <strong className="d-inline-block" style={{ minWidth:50 }}>
                  {message.sender}
                </strong>
                </div>
                <div>
                <p>{message.text}</p>
                </div>
           
                <span className="ml-auto text-muted">{new Date(message.timestamp).toLocaleTimeString()}</span>
              </ListGroup.Item>
            ))}
          </ListGroup>


                    {/* ------------------------------------- test end---------------------*/}

          {/* BOTTOM SECTION: NEW MESSAGE INPUT FIELD */}
          <div class="position-static">
          <Form onSubmit={handleMessageSubmit} className="px-4 mb-4 rounded-3 text-white" >
            <Form.Control className="px-4 mb-4 rounded-5 bg-dark text-light" type="text" placeholder="Enter your message" value={message} onChange={(e)=>setMessage(e.target.value)}  />
          </Form>
          </div>
        </Col>
        <Col md={3} className="bg-secondary mb-5 pl-2 ">
          {/* ONLINE USERS COL */}
          <h5>{room} ChatRoom Connected Userlist</h5>
          
          <DefaultExample onlineUsersList={onlineUsersList}/>
          
        </Col>
      </Row>
    </Container>
  )
}

export default Home



