import React from 'react';
import avatar from '../images/logo.jpeg';
import Avatar from '@material-ui/core/Avatar';

import './posts.css'


export default function Posts({ imageUrl, username, caption }) {
  return (
    <div className="post">
      <section className="post__header">

        <Avatar alt="avatar" src={avatar} />
        <h3>{username}</h3>
      </section>

      <img className="post__image" src={imageUrl}></img>
      <label className="post__text"><strong>{username}</strong> {caption}</label>
    </div>
  )
}
