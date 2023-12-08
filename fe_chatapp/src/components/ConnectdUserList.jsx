import ListGroup from 'react-bootstrap/ListGroup';

function DefaultExample({onlineUsersList}) {
    console.log(typeof onlineUsersList)
    console.log(onlineUsersList)
  return (
    <ListGroup className=" rounded-5 text-left text-light ">
        
        { onlineUsersList && onlineUsersList.map((list) => (
     <div className=" d-flex justify-content-between ">    
         <stong key={list.id} className="  bg-transparent " >{list.username}</stong>
         <stong class="bi bi-dot font-weight-bold  text-success"></stong>
         </div>
 
    
      ))}
    </ListGroup>
  );
}

export default DefaultExample;