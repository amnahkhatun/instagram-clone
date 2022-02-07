import React, { useState, useEffect } from 'react'


import './App.css';

import instagram from './images/Instagram-Logo.png';
import avatar from './images/logo.jpeg';
import Posts from './components/Posts';
import miles from './images/miles.jpeg';

import { db } from './firebase'
import { Modal } from '@material-ui/core';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Input } from '@mui/material';
import { sendSignInLinkToEmail } from '@firebase/auth';


const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function App() {
  const [posts, setPosts] = useState([])
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')



  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map((doc) => (
        doc.data()
      )))
    })
  }, [])

  const signup = () => {
    console.log("hi")
  }

  return (
    <div className="App">
      <Modal
        open={open} onClose={() => setOpen(false)}>
        <Box sx={modalStyle}>
          <form>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
          </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Input
                placeholder="username"
                type="text"
                value={username}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button onClick={signup}>Sign Up</Button>
            </Typography>
          </form>
        </Box>
      </Modal>
      <header className="app__header" >
        <img className="app__headerImage" alt="logo" src={instagram} width="120px"></img>
        <img className="app__headerAvatar" alt="logo" src={avatar} width="100px"></img>
      </header>
      <Button onClick={() => setOpen(true)}>Sign up</Button>
      {posts.map(({ imageUrl, username, caption }) => (
        <Posts imageUrl={imageUrl} caption={caption} username={username} />
      ))}

    </div>
  );
}

export default App;
