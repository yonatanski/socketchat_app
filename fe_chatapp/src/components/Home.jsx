import "bootstrap/dist/css/bootstrap.min.css"
import { Socket, io } from "socket.io-client"
import { Container, Row, Col, Form, ListGroup, Button } from "react-bootstrap"
// import { io } from "socket.io-client"
import { FormEvent, KeyboardEventHandler, useEffect, useState } from "react"

const ADDRESS = "http://localhost:3030"
const socket = io(ADDRESS, { transports: ["websocket"] })

const Home = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [tempo, setTempo] = useState("")
    const [username, setUsername ] = useState("")
    const [room, setRoom] = useState("blue")
    const [message, setMessage] = useState("")
    const [chatHistory, setChatHistory] = useState([""])
    const [onlineUsersList, setOnlineUsersList] = useState([])
   
 
 
 
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

        socket.on("message", ()=>{
            console.log("Another client disconnected, refreshing the list...")
          
        })
    })
   


    },[])

    console.log(username)
    console.log(room)
    console.log(message)
//-----------------------------


const fecthOnlineUsersList = async () =>{
    try{
        let response = await fetch("/online-users");
         if(response.ok){
            let data = await response.json()
            console.log("online users: ", data)
            setOnlineUsersList(data)  
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
        timeStamp:Date.now()
  }

  

  socket.emit("sendmessage", {message:messageToSend,room})
  setChatHistory([...chatHistory,messageToSend]) //[hi, hello].map()
  setMessage("")


//   setTempo(messageToSend)

  }



  const handleToggleRoom = () => {
    setRoom((room) => (room === "blue" ? "red" : "blue"))
  }     
  
 

  
 
 

  return (
    <Container fluid className="px-4 mt-4">
      <Row style={{ height: "95vh" }}>
        <Col md={10} className="d-flex flex-column justify-content-between">
          {/* MAIN VIEW COL */}
          {/* TOP SECTION: USERNAME INPUT FIELD */}
          <Form onSubmit={handleUsernameSubmit}  className="d-flex">
            <Form.Control type="text" placeholder="Enter your username" value={username} onChange={(e)=>setUsername(e.target.value)} disabled={isLoggedIn}/>
            <Button className="ml-2"  onClick={handleToggleRoom} variant={room === "blue" ? "primary" : "danger"} disabled={isLoggedIn} >
              Room
            </Button>
          </Form>
          {/* MIDDLE SECTION: CHAT HISTORY */}
          <ListGroup>
         { chatHistory && chatHistory.map((msg) => (
          <ListGroup.Item key={msg.timeStamp} className="d-flex">
            <strong className="d-inline-block" style={{ minWidth: 80 }}>
            {msg.sender}
            </strong>
            {msg.text}
            <span className="ml-auto text-muted">{new Date(msg.timeStamp).toLocaleTimeString()}</span>
          </ListGroup.Item>
            ))}
          </ListGroup>
          {/* BOTTOM SECTION: NEW MESSAGE INPUT FIELD */}
          <Form onSubmit={handleMessageSubmit}>
            <Form.Control type="text" placeholder="Enter your message" value={message} onChange={(e)=>setMessage(e.target.value)}  />
          </Form>
        </Col>
        <Col md={2}>
          {/* ONLINE USERS COL */}
          <div className="mb-3">Connected users:</div>
          
        </Col>
      </Row>
    </Container>
  )
}

export default Home



