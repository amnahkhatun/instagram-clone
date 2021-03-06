import React, { useState, useEffect } from 'react'


import './App.css';

import instagram from './images/Instagram-Logo.png';
import avatar from './images/logo.jpeg';
import Posts from './components/Posts';
import miles from './images/miles.jpeg';

import { db, auth } from './firebase'
import { Modal } from '@material-ui/core';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Input } from '@mui/material';
import { sendSignInLinkToEmail } from '@firebase/auth';
import ImageUpload from './components/ImageUpload';


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
  const [user, setUser] = useState(null)
  const [openSignIn, setOpenSignIn] = useState(false)




  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log({authUser});
        setUser(authUser)
      }
      else {
        setUser(null)
      }

    })
    return () => {
      unsubscribe()
    }
  }, [user, username])

  useEffect(() => {
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map((doc) => (
        doc.data()
      )))
    })
  }, [])

  const signup = (event) => {
    event.preventDefault();
    auth.createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username
        })
      })
      .catch((err) => (err.message))
  }
  const signIn = (event) => {
    event.preventDefault()
    auth.signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message))

    setOpenSignIn(false)
  }

  return (
    <div className="App">
     

      <Modal
        open={open} onClose={() => setOpen(false)}>
        <Box sx={modalStyle}>
          <form className="app__signup">
            <img className="app__headerImage" alt="logo" src={instagram} width="120px"></img>
            <Input
              placeholder="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
            <Button type="submit" onClick={signup}>Sign Up</Button>
          </form>
        </Box>
      </Modal>
      <Modal
        open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <Box sx={modalStyle}>
          <form className="app__signup">
            <img className="app__headerImage" alt="logo" src={instagram} width="120px"></img>
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
            <Button type="submit" onClick={signIn}>Sign Up</Button>
          </form>
        </Box>
      </Modal>

      <header className="app__header" >
        <img className="app__headerImage" alt="logo" src={instagram} width="120px"></img>
        {user ?
          <Button onClick={() => auth.signOut()}>Log out</Button> :

          (<div className="app__loginContainer">
            <img className="app__headerAvatar" alt="logo" src={avatar} width="100px"></img>
            <div>
              <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
              <Button onClick={() => setOpen(true)}>Sign up</Button>
            </div>
          </div>)
        }
      </header>

      {user ? <ImageUpload username={user.displayName} /> :
        <h3>You need to login again</h3>}
      {posts.map(({ imageUrl, username, caption }) => (
        <Posts imageUrl={imageUrl} caption={caption} username={username} />
      ))}
    </div>
  );
}

export default App;
