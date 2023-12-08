import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';


function ChatListFiled({chatHistory}) {
//     history?.chatHistory.map((list) => (
// console.log(list)
//     ))

  return (
    
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        { chatHistory && chatHistory.map((list) => (
            <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={`https://ui-avatars.com/api/?name=${list.sender}&length=1`} />
        </ListItemAvatar>
        <ListItemText
          
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="[p]"
                color="text.primary"
              >
                {list.text}
              </Typography>
           
            </React.Fragment>
          }
          primary={list.sender}
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      
  
  
      </>
       ))}
    </List>
   

      )}
export default ChatListFiled;
