import React, { useState } from 'react'
import { Button } from '@material-ui/core';
import { storage, db } from '../firebase';
import firebase from "firebase/compat/app";
import './ImageUpload.css';
import upload from '../images/icons8-upload-24.png';
import browse from '../images/icons8-browser-windows-48.png'


export default function ImageUpload({ username }) {
  const [caption, setCaption] = useState('')
  const [image, setImage] = useState(null)
  const [progress, setProgress] = useState(0)

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }
  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image)
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        )
        setProgress(progress)
      },
      (error) => {
        console.log(error)
        alert(error.message)
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username
            });
            setProgress(0);
            setCaption("");
            setImage(null)
          })
      }
    )
  }

  return (
    <div className="imageupload">
    <div>
        <progress value={progress} max="100" />

    </div>
    <div>
        <input type="text" placeholder="Enter a caption.."
          onChange={e => setCaption(e.target.value)}
          value={caption}></input>
        <label>
          <img src={browse} alt="upload" for="upload_file" onClick={handleUpload}></img>
        </label>
          <img src={upload} alt="upload" onClick={handleUpload}></img>
          
          <input type="file" id="upload_file" onChange={handleChange} className="caption"></input>
         
         
        </div>
        
      

    </div>
  )
}
