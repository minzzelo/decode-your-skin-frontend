import React, {useEffect, useState} from "react";
import axios from "axios";

import DeleteIcon from '@material-ui/icons/Delete';

import {List, ListItem, ListItemText, IconButton} from '@material-ui/core';

export function Thread(props) {

  const id = props.match.params.threadId;
  const user = props.user;

  const [thread, setThread] = useState({title: '', comment: '', date: '', user: '', threadPosts: []});
  const [addComment, updateAddComment] = useState('');

  function getThread(threadId) {

    console.log("GET THREAD", threadId);

    axios.post("http://localhost:5000/thread/getThread", {id: threadId})
         .then((res) => {

          console.log(res.data.threadPosts);
           setThread({title: res.data.title, comment: res.data.comment, date: res.data.date, user: res.data.user, threadPosts: res.data.threadPosts});
         })
         .catch((err) => console.log(err.response.data));

  }

  useEffect(() => {
    console.log(id);
    getThread(id);
  }, [user])

  
  const Comments = () => {
    if (thread.threadPosts) {
      if (thread.threadPosts.length > 0) {
        return (
          <>
            <List className='list'>
              {thread.threadPosts.map((post) => 
                <ListItem key={post._id} className='listItem'>
                  <p >Posted by: {post.user}</p>
                  <div className='listHeader'>
                    <h4>{post.comment}</h4>
                    {post.user == user &&
                        <IconButton >
                          <DeleteIcon onClick={() => deleteComment(post._id)}/>
                        </IconButton>
                    } 
                  </div>
                  <ListItemText
                    
                    secondary={post.date}
                  />
                </ListItem>
                
              )}
            </List>

          </>
        )
      } else {
        return  (
          <>  
            <div style={{alignSelf:"center"}}>
              <h3>No Comments</h3>
            </div>
            
          </> 
        )
      }
    } else {
      return null;
    }
  };




  function handleSubmit(event) {
    event.preventDefault();
  
    axios.post("http://localhost:5000/threadpost/createThreadPost", {user, comment:addComment, threadId:id})
          .then((res) => {
            console.log(res);
          })
          .catch((err) => console.log(err.response.data));

    window.location.reload();
  }

  function deletePost(id) {
    axios
      .post("http://localhost:5000/thread/deleteThread", { id })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err.response.data));

    // return to forum
    window.location.pathname = '/forum'
  }

  function deleteComment(id) {
      axios
      .post("http://localhost:5000/threadpost/deleteThreadPost", { id: id })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err.response.data));

    
    window.location.reload();
  }

  return (
    <>
      <div className="threadPost">
        <div className='mainThread'>

          <div className='listHeader'>
            <h2>{thread.title}</h2>
            {/* delete button only appears if you are the one that created the post*/}
            {thread.user == user &&
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon onClick={() => deletePost(thread.id)}/>
              </IconButton>
            } 
          </div>
          <h5>{thread.comment}</h5>
          <h6>{thread.date}</h6>

        </div>

        <form>
          <textarea name="Comment" placeholder="Add Comment" onChange={(event) => updateAddComment(event.target.value)}></textarea>
          <button className='create-thread-btn' type="submit" onClick={handleSubmit}>Submit</button>
        </form>
        
        <Comments />
      </div>
        
    </>
  );
}
