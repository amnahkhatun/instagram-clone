import React, { useState } from 'react'


import './App.css';

import instagram from './images/Instagram-Logo.png';
import avatar from './images/logo.jpeg';
import Posts from './components/Posts';
import miles from './images/miles.jpeg';

import { db } from './firebase.js'

function App() {
  const [posts, setPosts] = useState([
    {
      imageUrl: miles,
      caption: "Hello",
      username: "amnah"
    }
  ])

  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot)
  }, [input])

  return (
    <div className="App">
      <header className="app__header" >
        <img className="app__headerImage" alt="logo" src={instagram} width="120px"></img>
        <img className="app__headerAvatar" alt="logo" src={avatar} width="100px"></img>
      </header>
      {posts.map(({ imageUrl, username, caption }) => (
        <Posts imageUrl={imageUrl} caption={caption} username={username} />
      ))}

    </div>
  );
}

export default App;
