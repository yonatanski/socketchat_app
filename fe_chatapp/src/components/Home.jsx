import "bootstrap/dist/css/bootstrap.min.css"
import { Socket, io } from "socket.io-client"
import { Container, Row, Col, Form, ListGroup, Button } from "react-bootstrap"
// import { io } from "socket.io-client"
import { FormEvent, KeyboardEventHandler, useEffect, useState } from "react"

const ADDRESS = "http://localhost:3030"
const socket = io(ADDRESS, { transports: ["websocket"] })

const Home = () => {
    
    const [username, setUsername ] = useState("")
    const [message, setMessage] = useState("")
    const [room, setRoom] = useState("blue")
 
 
 
    useEffect(() =>{
        socket.on('connect', ()=>{
            console.log("connection established!")
        })
    },[])


    console.log(username)
    console.log(message)

    
  const handleToggleRoom = () => {
    setRoom((room) => (room === "blue" ? "red" : "blue"))
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


  return (
    <Container fluid className="px-4 mt-4">
      <Row style={{ height: "95vh" }}>
        <Col md={10} className="d-flex flex-column justify-content-between">
          {/* MAIN VIEW COL */}
          {/* TOP SECTION: USERNAME INPUT FIELD */}
          <Form onSubmit={handleUsernameSubmit}  className="d-flex">
            <Form.Control type="text" placeholder="Enter your username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
            <Button className="ml-2"  onClick={handleToggleRoom} variant={room === "blue" ? "primary" : "danger"}  >
              Room
            </Button>
          </Form>
          {/* MIDDLE SECTION: CHAT HISTORY */}
          <ListGroup>
        
          </ListGroup>
          {/* BOTTOM SECTION: NEW MESSAGE INPUT FIELD */}
          <Form >
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



